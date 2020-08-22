import { USER_CONSTANTS } from './userConstants';

const initialState = {
  isLoggedIn: false,
  loginError: {},
  signUpData: {},
  signUpStatus: false,
  signUpError: {},
  locations: [],
  locationError: {},
  userDetails: {},
  bookingDetails: [],
  bookingDetailsError: {},
  userDetailsError: {},
  userProfileUpdateStatus: {},
  userProfileUpdateError: {},
  updateAddress: {},
  addAddress: {},
  updateAddressError: {},
  addAddressError: {},
};

export default function userReducer(state = initialState, action) {

  switch (action.type) {
    case USER_CONSTANTS.USER_AUTH_SUCCESS:
      return {
        ...state,
        isLoggedIn: action.payload.status,
      };
    case USER_CONSTANTS.USER_AUTH_FAILURE:
      return {
        ...state,
        loginError: action.error,
      };
    case USER_CONSTANTS.USER_REGISTER_REQUEST:
      return {
        ...state,
        signUpStatus: false,
        signUpError: {},
      };
    case USER_CONSTANTS.USER_REGISTER_SUCCESS:
      return {
        ...state,
        signUpStatus: action.payload.status,
      };
    case USER_CONSTANTS.USER_REGISTER_FAILURE:
      return {
        ...state,
        signUpError: action.error,
      };
    case USER_CONSTANTS.GET_LOCATION_SUCCESS:
      return {
        ...state,
        locations: action.payload.data,
      };
    case USER_CONSTANTS.GET_LOCATION_FAILURE:
      return {
        ...state,
        locationError: action.error,
      };
    case USER_CONSTANTS.GET_USER_DATA_SUCCESS:
      return {
        ...state,
        userDetails: action.payload.data,
      };
    case USER_CONSTANTS.GET_USER_DATA_FAILURE:
      return {
        ...state,
        userDetailsError: action.error,
      };
    case USER_CONSTANTS.UPDATE_USER_PROFILE_REQUEST:
      return {
        ...state,
        userProfileUpdateStatus: {},
        userProfileUpdateError: {},
      };
    case USER_CONSTANTS.UPDATE_USER_PROFILE_SUCCESS:
      return {
        ...state,
        userProfileUpdateStatus: action.payload.data,
      };
    case USER_CONSTANTS.UPDATE_USER_PROFILE_FAILURE:
      return {
        ...state,
        userProfileUpdateError: action.error || {},
      };
    case USER_CONSTANTS.ADD_ADDRESS_REQUEST:
      return {
        ...state,
        addAddressError: {},
        addAddress: {},
      };
    case USER_CONSTANTS.ADD_ADDRESS_SUCCESS:
      return {
        ...state,
        addAddress: action.payload,
      };
    case USER_CONSTANTS.ADD_ADDRESS_FAILURE:
      return {
        ...state,
        addAddressError: action.error || {},
      };
    case USER_CONSTANTS.UPDATE_ADDRESS_REQUEST:
      return {
        ...state,
        updateAddress: {},
        updateAddressError: {},
      };
    case USER_CONSTANTS.UPDATE_ADDRESS_SUCCESS:
      return {
        ...state,
        updateAddress: action.payload,
      };
    case USER_CONSTANTS.UPDATE_ADDRESS_FAILURE:
      return {
        ...state,
        updateAddressError: action.error || {},
      };
    case USER_CONSTANTS.BOOKING_DETAIL_SUCCESS:
      return {
        ...state,
        bookingDetails: action.payload.data
      };
    case USER_CONSTANTS.BOOKING_DETAIL_FAILURE:
      return{
        ...state,
        bookingDetailsError: action.error
      }
    default:
      return { ...state };
  }
}
