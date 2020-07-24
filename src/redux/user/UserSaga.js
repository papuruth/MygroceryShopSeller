import { call, put, takeEvery } from 'redux-saga/effects';
import { USER_CONSTANTS } from './userConstants';
import { LOADER_CONSTANTS } from '../loaderService/LoaderConstants';
import { postAPIData, getAPIData } from '../../utils/webServiceHandler/Backend';
import APP_CONSTANTS from '../../utils/appConstants/AppConstants';
import { sessionService } from 'redux-react-native-session';
import Storage from '../../utils/Storage';

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
    console.log(response)
    return { response };
  } catch (error) {
    return { error };
  }
};

function* userRegisterSaga(action) {
  const { response, error } = yield call(userRegisterService, action.payload);
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
    console.log("respone123", response)
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
  console.log("xvcbvnv", error, response)
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
    console.log(response);
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
