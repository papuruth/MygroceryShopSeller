import { all } from 'redux-saga/effects';
import { userRegisterWatcherSaga, getLocationWatcherSaga, loginWatcherSaga } from '../user/UserSaga';
import { loaderStartWatcherSaga, loaderStopWatcherSaga } from '../loaderService/LoaderSaga';

export default function* rootSaga() {
  yield all([
    loaderStopWatcherSaga(),
    loaderStartWatcherSaga(),
    getLocationWatcherSaga(),
    userRegisterWatcherSaga(),
    loginWatcherSaga(),
  ]);
}
