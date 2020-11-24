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

const addAddressService = async ({ data, userId }) => {
  try {
    const response = await firestore()
      .collection('Address')
      .doc(`${userId}/user_address/${data?.addressId}`)
      .set(data);
    if (response === null) {
      return { response: { message: 'success', status: true } };
    }
    return { response: { message: 'failed', status: false } };
  } catch (error) {
    return { error };
  }
};

function* addAddressSaga(action) {
  const { response, error } = yield call(addAddressService, action.payload);
  if (response && response.status) {
    yield put(yield call(success, USER_CONSTANTS.ADD_ADDRESS_SUCCESS, response));
    yield put({ type: LOADER_CONSTANTS.LOADER_STOP_REQUEST });
  } else {
    yield put(yield call(failure, USER_CONSTANTS.ADD_ADDRESS_FAILURE, error));
    yield put({ type: LOADER_CONSTANTS.LOADER_STOP_REQUEST });
  }
}

export function* addAddressWatcherSaga() {
  yield takeEvery(USER_CONSTANTS.ADD_ADDRESS_REQUEST, addAddressSaga);
}

const getAllAddressService = async (id) => {
  try {
    const responseSnapshot = await firestore()
      .collection('Address')
      .doc(id)
      .collection('user_address')
      .get();
    const docsSnapShot = responseSnapshot.docs;
    const data = docsSnapShot.map((item) => item._data);
    return { response: data };
  } catch (error) {
    console.log(error);
    return { error };
  }
};

function* getAllAddressSaga(action) {
  const { response, error } = yield call(getAllAddressService, action.payload);
  if (!checkEmpty(response)) {
    yield put(yield call(success, USER_CONSTANTS.GET_ALL_ADDRESS_SUCCESS, response));
    yield put({ type: LOADER_CONSTANTS.LOADER_STOP_REQUEST });
  } else {
    yield put(yield call(failure, USER_CONSTANTS.GET_ALL_ADDRESS_FAILURE, error));
    yield put({ type: LOADER_CONSTANTS.LOADER_STOP_REQUEST });
  }
}

export function* getAllAddressWatcherSaga() {
  yield takeEvery(USER_CONSTANTS.GET_ALL_ADDRESS_REQUEST, getAllAddressSaga);
}

const updateAddressByIdService = async ({ docId, userId, data }) => {
  try {
    const response = await firestore()
      .collection('Address')
      .doc(userId)
      .collection('user_address')
      .doc(docId.toString())
      .update(data);
    if (response === null) {
      return { response: { status: true, message: 'success' } };
    }
    return { response };
  } catch (error) {
    return { error };
  }
};

function* updateAddressByIdSaga(action) {
  const { response, error } = yield call(updateAddressByIdService, action.payload);
  if (response && response.status) {
    yield put(yield call(success, USER_CONSTANTS.UPDATE_ADDRESS_SUCCESS, response));
    yield put({ type: LOADER_CONSTANTS.LOADER_STOP_REQUEST });
  } else {
    yield put(yield call(failure, USER_CONSTANTS.UPDATE_ADDRESS_FAILURE, error));
    yield put({ type: LOADER_CONSTANTS.LOADER_STOP_REQUEST });
  }
}

export function* updateAddressByIdWatcherSaga() {
  yield takeEvery(USER_CONSTANTS.UPDATE_ADDRESS_REQUEST, updateAddressByIdSaga);
}

const deleteAddressByIdService = async ({ docId, userId }) => {
  try {
    const response = await firestore()
      .collection('Address')
      .doc(userId)
      .collection('user_address')
      .doc(docId.toString())
      .delete();
    if (response === null) {
      return { response: { status: true, message: 'success' } };
    }
    return { response };
  } catch (error) {
    return { error };
  }
};

function* deleteAddressByIdSaga(action) {
  const { response, error } = yield call(deleteAddressByIdService, action.payload);
  if (response && response.status) {
    yield put(yield call(success, USER_CONSTANTS.DELETE_ADDRESS_SUCCESS, response));
    yield put({ type: LOADER_CONSTANTS.LOADER_STOP_REQUEST });
  } else {
    yield put(yield call(failure, USER_CONSTANTS.DELETE_ADDRESS_FAILURE, error));
    yield put({ type: LOADER_CONSTANTS.LOADER_STOP_REQUEST });
  }
}

export function* deleteAddressByIdWatcherSaga() {
  yield takeEvery(USER_CONSTANTS.DELETE_ADDRESS_REQUEST, deleteAddressByIdSaga);
}
