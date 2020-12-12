import APP_CONSTANTS from '@/utils/appConstants/AppConstants';
import ENV from '@/utils/appConstants/Environment';
import { getAPIData, postAPIData } from '@/utils/webServiceHandler/Backend';
import firestore from '@react-native-firebase/firestore';
import { USER_CONSTANTS } from '../user/userConstants';
import { NOTIFICATION_CONSTANTS } from './NotificationConstants';

const { checkEmpty } = require('@/utils/commonFunctions');
const { call, put, takeEvery, delay, takeLatest } = require('redux-saga/effects');

const success = (type, payload) => ({
  type,
  payload,
});

const failure = (type, error) => ({
  type,
  error,
});

const sendOrderUpdateNotificationService = async ({ data, orderId, userId }) => {
  try {
    const {
      URLS: { sendNotification },
    } = APP_CONSTANTS;
    const res = await postAPIData(sendNotification, data);
    if (!checkEmpty(res) && res?.status) {
      if (!checkEmpty(res.payload) && !checkEmpty(res?.payload?.failedTokens)) {
        const { failedTokens } = res?.payload;
        const userRef = await firestore()
          .collection('users')
          .doc(userId)
          .get();
        const userDetails = userRef.data();
        const tokenIndex =
          !checkEmpty(userDetails) && !checkEmpty(userDetails?.tokens)
            ? failedTokens
                .map((item) => userDetails?.tokens.indexOf(item))
                .filter((ele) => ele > -1)
            : [];
        if (!checkEmpty(tokenIndex) && !checkEmpty(userDetails?.tokens))
          tokenIndex.forEach((item) => userDetails?.tokens.splice(item, 1));
        if (!checkEmpty(tokenIndex)) {
          await firestore()
            .collection('orders')
            .doc(orderId)
            .update({ 'userDetails.tokens': userDetails?.tokens });
          await firestore()
            .collection('users')
            .doc(userId)
            .update({ tokens: userDetails?.tokens });
        }
      }
      return {
        response: {
          status: true,
          data: res.payload,
          message: 'success',
        },
      };
    }
    throw new Error(JSON.stringify(res?.payload));
  } catch (error) {
    console.log(error);
    return {
      error: {
        data: {},
        status: false,
        error: JSON.parse(error?.message),
      },
    };
  }
};

function* sendOrderUpdateNotificationSaga(action) {
  const { response, error } = yield call(sendOrderUpdateNotificationService, action.payload);
  if (!checkEmpty(response) && response?.status) {
    yield put(
      yield call(success, NOTIFICATION_CONSTANTS.SEND_ORDER_UPDATE_NOTIFICATION_SUCCESS, response),
    );
    const { hostId } = action?.payload || {};
    yield put({ type: USER_CONSTANTS.GET_MY_ORDERS_REQUEST, payload: { userId: hostId } });
  } else {
    yield put(
      yield call(failure, NOTIFICATION_CONSTANTS.SEND_ORDER_UPDATE_NOTIFICATION_FAILURE, error),
    );
    if (error?.error?.status === 503) {
      yield delay(60000);
      yield sendOrderUpdateNotificationSaga(action);
    }
  }
}

export function* sendOrderUpdateNotificationWatcherSaga() {
  yield takeEvery(
    NOTIFICATION_CONSTANTS.SEND_ORDER_UPDATE_NOTIFICATION_REQUEST,
    sendOrderUpdateNotificationSaga,
  );
}

const wakeNotificationServerService = async () => {
  try {
    const { API_HOST } = ENV;
    const res = await getAPIData(API_HOST);
    if (!checkEmpty(res) && res?.status) {
      return {
        response: {
          status: true,
        },
      };
    }
    throw Error(JSON.stringify(res?.payload));
  } catch (error) {
    return {
      error,
    };
  }
};

function* wakeNotificationServerSaga() {
  const { response, error } = yield call(wakeNotificationServerService);
  if (!checkEmpty(response) && response?.status) {
    yield put(
      yield call(
        success,
        NOTIFICATION_CONSTANTS.WAKE_NOTIFICATION_SERVER_SUCCESS,
        response?.status,
      ),
    );
  } else {
    yield put(yield call(failure, NOTIFICATION_CONSTANTS.WAKE_NOTIFICATION_SERVER_FAILURE, error));
  }
}

export function* wakeNotificationServerWatcherSaga() {
  yield takeLatest(
    NOTIFICATION_CONSTANTS.WAKE_NOTIFICATION_SERVER_REQUEST,
    wakeNotificationServerSaga,
  );
}
