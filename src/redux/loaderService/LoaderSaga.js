import { call, put, takeEvery } from 'redux-saga/effects';
import { LOADER_CONSTANTS } from './LoaderConstants';

const success = (type) => ({
  type,
});

function* loaderStartSaga() {
  yield put(yield call(success, LOADER_CONSTANTS.LOADER_START_SUCCESS));
}

export function* loaderStartWatcherSaga() {
  yield takeEvery(LOADER_CONSTANTS.LOADER_START_REQUEST, loaderStartSaga);
}

function* loaderStopSaga() {
  yield put(yield call(success, LOADER_CONSTANTS.LOADER_STOP_SUCCESS));
}

export function* loaderStopWatcherSaga() {
  yield takeEvery(LOADER_CONSTANTS.LOADER_STOP_REQUEST, loaderStopSaga);
}
