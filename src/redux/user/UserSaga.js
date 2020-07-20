import { call, put, takeEvery } from 'redux-saga/effects';
import { USER_CONSTANTS } from './UserConstants';
import { LOADER_CONSTANTS } from '../loaderService/LoaderConstants';
import { postAPIData, getAPIData } from '../../utils/webServiceHandler/Backend';
import APP_CONSTANTS from '../../utils/appConstants/AppConstants';

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
