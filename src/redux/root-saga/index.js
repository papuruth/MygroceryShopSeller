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
  updateProfessionalDetailsWatcherSaga,
  getAllAddressWatcherSaga,
  getOccupationWatcherSaga,
  userLogoutWatcherSaga,
} from '../user/UserSaga';
import { loaderStartWatcherSaga, loaderStopWatcherSaga } from '../loaderService/LoaderSaga';

export default function* rootSaga() {
  yield all([
    loginWatcherSaga(),
    checkAuthWatcherSaga(),
    addAddressWatcherSaga(),
    loaderStopWatcherSaga(),
    userLogoutWatcherSaga(),
    loaderStartWatcherSaga(),
    getLocationWatcherSaga(),
    getUserDataWatcherSaga(),
    userRegisterWatcherSaga(),
    getAllAddressWatcherSaga(),
    getOccupationWatcherSaga(),
    bookingDetailsWatcherSaga(),
    updateUserProfileWatcherSaga(),
    updateAddressByIdWatcherSaga(),
    updateProfessionalDetailsWatcherSaga()
  ]);
}
