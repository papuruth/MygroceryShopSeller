import { NOTIFICATION_CONSTANTS } from './NotificationConstants';

export const sendOrderUpdateNotificationAction = (data, orderId, userId, hostId) => ({
  type: NOTIFICATION_CONSTANTS.SEND_ORDER_UPDATE_NOTIFICATION_REQUEST,
  payload: { data, orderId, userId, hostId },
});

export const wakeNotificationServerAction = () => ({
  type: NOTIFICATION_CONSTANTS.WAKE_NOTIFICATION_SERVER_REQUEST,
});
