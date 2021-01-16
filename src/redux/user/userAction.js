import { USER_CONSTANTS } from './userConstants';

export const sendOTPAction = (phone) => ({
  type: USER_CONSTANTS.SEND_OTP_REQUEST,
  payload: { phone },
});

export const userLogout = () => ({
  type: USER_CONSTANTS.USER_LOGOUT_REQUEST,
});

export const fetchAllOrdersAction = (userId) => ({
  type: USER_CONSTANTS.GET_MY_ORDERS_REQUEST,
  payload: { userId },
});
