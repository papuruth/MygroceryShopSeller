import { all } from 'redux-saga/effects';
import { loaderStartWatcherSaga, loaderStopWatcherSaga } from '../loaderService/LoaderSaga';
import {
  sendOrderUpdateNotificationWatcherSaga,
  wakeNotificationServerWatcherSaga,
} from '../notifications/NotificationSagas';
import {
  fetchAllCategoriesWatcherSaga,
  fetchProductDetailsWatcherSaga,
  fetchProductsWatcherSaga,
} from '../products/ProductSaga';
import {
  addAddressWatcherSaga,
  deleteAddressByIdWatcherSaga,
  getAllAddressWatcherSaga,
  getAllMyOrdersWatcherSaga,
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
    fetchProductsWatcherSaga(),
    getAllMyOrdersWatcherSaga(),
    updateAddressByIdWatcherSaga(),
    deleteAddressByIdWatcherSaga(),
    fetchAllCategoriesWatcherSaga(),
    fetchProductDetailsWatcherSaga(),
    wakeNotificationServerWatcherSaga(),
    sendOrderUpdateNotificationWatcherSaga(),
  ]);
}
