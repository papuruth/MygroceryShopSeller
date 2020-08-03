import { all } from 'redux-saga/effects';
import { userRegisterWatcherSaga, getLocationWatcherSaga, loginWatcherSaga, getUserDataWatcherSaga } from '../user/UserSaga';
import { loaderStartWatcherSaga, loaderStopWatcherSaga } from '../loaderService/LoaderSaga';

export default function* rootSaga() {
  yield all([
    loginWatcherSaga(),
    loaderStopWatcherSaga(),
    loaderStartWatcherSaga(),
    getLocationWatcherSaga(),
    getUserDataWatcherSaga(),
    userRegisterWatcherSaga(),
  ]);
}
