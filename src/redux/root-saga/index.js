import { all } from 'redux-saga/effects';
import { loaderStartWatcherSaga, loaderStopWatcherSaga } from '../loaderService/LoaderSaga';
import { fetchAllCategoriesWatcherSaga } from '../products/ProductSaga';
import {
  addAddressWatcherSaga,
  deleteAddressByIdWatcherSaga,
  getAllAddressWatcherSaga,
  sendOTPWatcherSaga,
  updateAddressByIdWatcherSaga,
  userLogoutWatcherSaga,
} from '../user/UserSaga';

export default function* rootSaga() {
  yield all([
    sendOTPWatcherSaga(),
    loaderStopWatcherSaga(),
    userLogoutWatcherSaga(),
    loaderStartWatcherSaga(),
    addAddressWatcherSaga(),
    getAllAddressWatcherSaga(),
    updateAddressByIdWatcherSaga(),
    deleteAddressByIdWatcherSaga(),
    fetchAllCategoriesWatcherSaga(),
  ]);
}
