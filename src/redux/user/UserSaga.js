/* eslint-disable no-underscore-dangle */
import { checkEmpty } from '@/utils/commonFunctions';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { call, put, takeEvery } from 'redux-saga/effects';
import { LOADER_CONSTANTS } from '../loaderService/LoaderConstants';
import { USER_CONSTANTS } from './userConstants';

const success = (type, payload) => ({
  type,
  payload,
});

const failure = (type, error) => ({
  type,
  error,
});

const sendOTPService = async ({ phone }) => {
  try {
    const response = await auth().signInWithPhoneNumber(phone);
    return { response };
  } catch (error) {
    return { error };
  }
};

function* sendOTPSaga(action) {
  const { response, error } = yield call(sendOTPService, action.payload);
  if (!checkEmpty(response)) {
    yield put(yield call(success, USER_CONSTANTS.SEND_OTP_SUCCESS, response));
    yield put({ type: LOADER_CONSTANTS.LOADER_STOP_REQUEST });
  } else {
    yield put(yield call(failure, USER_CONSTANTS.SEND_OTP_FAILURE, response || error));
    yield put({ type: LOADER_CONSTANTS.LOADER_STOP_REQUEST });
  }
}

export function* sendOTPWatcherSaga() {
  yield takeEvery(USER_CONSTANTS.SEND_OTP_REQUEST, sendOTPSaga);
}

function* userLogoutSaga() {
  yield put(yield call(success, USER_CONSTANTS.USER_LOGOUT_SUCCESS, null));
}

export function* userLogoutWatcherSaga() {
  yield takeEvery(USER_CONSTANTS.USER_LOGOUT_REQUEST, userLogoutSaga);
}

const getAllMyOrdersService = async ({ userId }) => {
  try {
    const docSnap = await firestore()
      .collection('orders')
      .get();
    const { docs } = docSnap;
    const data = docs.map((item) => item.data()).filter((item) => item?.distributorId === userId);

    if (!checkEmpty(data)) {
      return { response: { data, status: true, message: 'success' } };
    }
    return { response: { data: [], status: true, message: 'success' } };
  } catch (error) {
    return { error };
  }
};

function* getAllMyOrdersSaga(action) {
  const { response, error } = yield call(getAllMyOrdersService, action.payload);
  if (response && response?.status) {
    yield put(yield call(success, USER_CONSTANTS.GET_MY_ORDERS_SUCCESS, response));
    yield put({ type: LOADER_CONSTANTS.LOADER_STOP_REQUEST });
  } else {
    yield put(yield call(failure, USER_CONSTANTS.GET_MY_ORDERS_FAILURE, error));
    yield put({ type: LOADER_CONSTANTS.LOADER_STOP_REQUEST });
  }
}

export function* getAllMyOrdersWatcherSaga() {
  yield takeEvery(USER_CONSTANTS.GET_MY_ORDERS_REQUEST, getAllMyOrdersSaga);
}
