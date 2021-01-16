import { USER_CONSTANTS } from './userConstants';

const initialState = {
  otpSentStatus: false,
  otpConfirm: {},
  otpSentError: {},
  myOrders: [],
  myOrdersError: {},
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case USER_CONSTANTS.SEND_OTP_REQUEST:
      return {
        otpSentStatus: false,
        otpConfirm: {},
        otpSentError: {},
      };
    case USER_CONSTANTS.SEND_OTP_SUCCESS:
      return {
        ...state,
        otpSentStatus: Boolean(action.payload),
        otpConfirm: action.payload,
      };
    case USER_CONSTANTS.SEND_OTP_FAILURE:
      return {
        ...state,
        otpSentError: action.error,
      };
    case USER_CONSTANTS.USER_LOGOUT_SUCCESS:
      return {
        ...state,
        otpSentStatus: false,
        otpConfirm: {},
        otpSentError: {},
      };
    case USER_CONSTANTS.GET_MY_ORDERS_REQUEST:
      return {
        ...state,
        myOrdersError: {},
      };
    case USER_CONSTANTS.GET_MY_ORDERS_SUCCESS:
      return {
        ...state,
        myOrders: action.payload.data,
        myOrdersError: {},
      };
    case USER_CONSTANTS.GET_MY_ORDERS_FAILURE:
      return {
        ...state,
        myOrdersError: action.error,
      };
    default:
      return { ...state };
  }
}
