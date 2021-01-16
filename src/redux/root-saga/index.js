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
  getAllMyOrdersWatcherSaga,
  sendOTPWatcherSaga,
  userLogoutWatcherSaga,
} from '../user/UserSaga';

export default function* rootSaga() {
  yield all([
    sendOTPWatcherSaga(),
    loaderStopWatcherSaga(),
    userLogoutWatcherSaga(),
    loaderStartWatcherSaga(),
    fetchProductsWatcherSaga(),
    getAllMyOrdersWatcherSaga(),
    fetchAllCategoriesWatcherSaga(),
    fetchProductDetailsWatcherSaga(),
    wakeNotificationServerWatcherSaga(),
    sendOrderUpdateNotificationWatcherSaga(),
  ]);
}
