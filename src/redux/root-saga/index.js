import { all } from 'redux-saga/effects';
import {
  userRegisterWatcherSaga,
  getLocationWatcherSaga,
  loginWatcherSaga,
  bookingDetailsWatcherSaga,
  getUserDataWatcherSaga,
  checkAuthWatcherSaga,
  updateUserProfileWatcherSaga,
  updateAddressByIdWatcherSaga,
  addAddressWatcherSaga,
} from '../user/UserSaga';
import { loaderStartWatcherSaga, loaderStopWatcherSaga } from '../loaderService/LoaderSaga';

export default function* rootSaga() {
  yield all([
    loginWatcherSaga(),
    checkAuthWatcherSaga(),
    addAddressWatcherSaga(),
    loaderStopWatcherSaga(),
    loaderStartWatcherSaga(),
    getLocationWatcherSaga(),
    getUserDataWatcherSaga(),
    userRegisterWatcherSaga(),
    updateUserProfileWatcherSaga(),
    updateAddressByIdWatcherSaga(),
    bookingDetailsWatcherSaga(),
  ]);
}
