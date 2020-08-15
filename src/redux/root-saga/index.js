import { all } from 'redux-saga/effects';
import { userRegisterWatcherSaga, getLocationWatcherSaga, loginWatcherSaga, getUserDataWatcherSaga,bookingDetailsWatcherSaga,checkAuthWatcherSaga } from '../user/UserSaga';
import { loaderStartWatcherSaga, loaderStopWatcherSaga } from '../loaderService/LoaderSaga';

export default function* rootSaga() {
  yield all([
    loginWatcherSaga(),
    checkAuthWatcherSaga(),
    loaderStopWatcherSaga(),
    loaderStartWatcherSaga(),
    getLocationWatcherSaga(),
    getUserDataWatcherSaga(),
    userRegisterWatcherSaga(),
    bookingDetailsWatcherSaga()
  ]);
}
