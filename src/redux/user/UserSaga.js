import { sessionService } from 'redux-react-native-session';
import { call, put, takeEvery } from 'redux-saga/effects';
import APP_CONSTANTS from '../../utils/appConstants/AppConstants';
import Storage from '../../utils/Storage';
import { getAPIData, postAPIData } from '../../utils/webServiceHandler/Backend';
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

const userRegisterService = async ({ data }) => {
  try {
    const {
      URLS: { signUp },
    } = APP_CONSTANTS;
    const response = await postAPIData(signUp, data);
    console.log(response);
    return { response };
  } catch (error) {
    console.log(error);
    return { error };
  }
};

function* userRegisterSaga(action) {
  const { response, error } = yield call(userRegisterService, action.payload);
  console.log(response);
  if (response && response.status) {
    yield put(yield call(success, USER_CONSTANTS.USER_REGISTER_SUCCESS, response));
    yield put({ type: LOADER_CONSTANTS.LOADER_STOP_REQUEST });
  } else {
    yield put(yield call(failure, USER_CONSTANTS.USER_REGISTER_FAILURE, response || error));
    yield put({ type: LOADER_CONSTANTS.LOADER_STOP_REQUEST });
  }
}

export function* userRegisterWatcherSaga() {
  yield takeEvery(USER_CONSTANTS.USER_REGISTER_REQUEST, userRegisterSaga);
}

const loginService = async ({ data }) => {
  try {
    const {
      URLS: { login },
    } = APP_CONSTANTS;
    const response = await postAPIData(login, data);
    console.log('respone123', response);
    if (response && response.status) {
      await sessionService.saveSession(response.data);
      await sessionService.saveUser(response.data);
      await Storage.setToken(response.data.accessToken);
      return { response };
    }
    return { response };
  } catch (error) {
    return { error };
  }
};

function* loginSaga(action) {
  const { response, error } = yield call(loginService, action.payload);
  console.log('xvcbvnv', error, response);
  if (response && response.status) {
    yield put(yield call(success, USER_CONSTANTS.USER_AUTH_SUCCESS, response));
    yield put({ type: LOADER_CONSTANTS.LOADER_STOP_REQUEST });
  } else {
    yield put(yield call(failure, USER_CONSTANTS.USER_AUTH_FAILURE, response || error));
    yield put({ type: LOADER_CONSTANTS.LOADER_STOP_REQUEST });
  }
}

export function* loginWatcherSaga() {
  yield takeEvery(USER_CONSTANTS.USER_AUTH_REQUEST, loginSaga);
}

const getLocationService = async () => {
  try {
    const {
      URLS: { location },
    } = APP_CONSTANTS;
    const response = await getAPIData(location);
    console.log('response>>>>>>>>>>>>>>>>>>', response);
    return { response };
  } catch (error) {
    return { error };
  }
};

function* getLocationSaga(action) {
  const { response, error } = yield call(getLocationService, action.payload);
  if (response && response.status) {
    yield put(yield call(success, USER_CONSTANTS.GET_LOCATION_SUCCESS, response));
    yield put({ type: LOADER_CONSTANTS.LOADER_STOP_REQUEST });
  } else {
    yield put(yield call(failure, USER_CONSTANTS.GET_LOCATION_FAILURE, error));
    yield put({ type: LOADER_CONSTANTS.LOADER_STOP_REQUEST });
  }
}

export function* getLocationWatcherSaga() {
  yield takeEvery(USER_CONSTANTS.GET_LOCATION_REQUEST, getLocationSaga);
}

const getUserDataService = async () => {
  try {
    const {
      URLS: { userDetails },
    } = APP_CONSTANTS;
    const response = await getAPIData(userDetails);
    console.log(response);
    return { response };
  } catch (error) {
    return { error };
  }
};

function* getUserDataSaga() {
  const { response, error } = yield call(getUserDataService);
  if (response && response.status) {
    yield put(yield call(success, USER_CONSTANTS.GET_USER_DATA_SUCCESS, response));
    yield put({ type: LOADER_CONSTANTS.LOADER_STOP_REQUEST });
  } else {
    yield put(yield call(failure, USER_CONSTANTS.GET_USER_DATA_FAILURE, error));
    yield put({ type: LOADER_CONSTANTS.LOADER_STOP_REQUEST });
  }
}

export function* getUserDataWatcherSaga() {
  yield takeEvery(USER_CONSTANTS.GET_USER_DATA_REQUEST, getUserDataSaga);
}
const bookingDetailsService = async () =>{
  try{
    const { 
      URLS:{ bookingDetails} 
    } = APP_CONSTANTS;
    const response = await getAPIData(bookingDetails)
    console.log("zxcxvbcnv",response)
    return { response }
  }catch (error){
    return error;
  }
}

function* bookingDetailsSaga(action) {
  const { response,error} = yield call(bookingDetailsService,action.payload);
  if(response && response.status) {
    yield put(yield call(success,USER_CONSTANTS.BOOKING_DETAIL_SUCCESS,response));
  }else{
    yield put (yield call(failure,USER_CONSTANTS.BOOKING_DETAIL_FAILURE,error))
  }
}

export function* bookingDetailsWatcherSaga() {
  yield takeEvery(USER_CONSTANTS.BOOKING_DETAIL_REQUEST,bookingDetailsSaga);
} 
const checkAuthService = async () => {
  try {
    const {
      URLS: { userDetails },
    } = APP_CONSTANTS;
    const response = await getAPIData(userDetails);
    console.log('check auth', response);
    if (response?.type === 'error') {
      await sessionService.deleteUser();
      await sessionService.deleteSession();
      await Storage.clearStorage();
      return { response };
    }
    return { response };
  } catch (error) {
    return { error };
  }
};

function* checkAuthSaga() {
  const { response, error } = yield call(checkAuthService);
  if (response && response.status) {
    yield put(yield call(success, USER_CONSTANTS.CHECK_AUTH_SUCCESS, response));
    yield put({ type: LOADER_CONSTANTS.LOADER_STOP_REQUEST });
  } else {
    yield put(yield call(failure, USER_CONSTANTS.CHECK_AUTH_FAILURE, error));
    yield put({ type: LOADER_CONSTANTS.LOADER_STOP_REQUEST });
  }
}

export function* checkAuthWatcherSaga() {
  yield takeEvery(USER_CONSTANTS.CHECK_AUTH_REQUEST, checkAuthSaga);
}
