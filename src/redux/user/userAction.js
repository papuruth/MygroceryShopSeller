import { USER_CONSTANTS } from './userConstants';

export const userSignupAction = (data) => ({
  type: USER_CONSTANTS.USER_REGISTER_REQUEST,
  payload: { data },
});

export const loginAction = (data) => ({
  type: USER_CONSTANTS.USER_AUTH_REQUEST,
  payload: { data },
});

export const userLogout = () => ({
  type: USER_CONSTANTS.USER_LOGOUT_REQUEST,
});

export const getLocationAction = () => ({
  type: USER_CONSTANTS.GET_LOCATION_REQUEST,
});

export const getUserDataAction = () => ({
  type: USER_CONSTANTS.GET_USER_DATA_REQUEST,
});

export const getBookingDetails = () => ({
  type: USER_CONSTANTS.BOOKING_DETAIL_REQUEST,
});
export const checkAuthAction = () => ({
  type: USER_CONSTANTS.CHECK_AUTH_REQUEST,
});

export const updateUserProfile = (data) => ({
  type: USER_CONSTANTS.UPDATE_USER_PROFILE_REQUEST,
  payload: { data },
});

export const updateAddressById = (id, data) => ({
  type: USER_CONSTANTS.UPDATE_ADDRESS_REQUEST,
  payload: { id, data },
});

export const addAddressByUsername = (data) => ({
  type: USER_CONSTANTS.ADD_ADDRESS_REQUEST,
  payload: data,
});

export const updateProfessionalDetails = (data) => ({
  type: USER_CONSTANTS.UPDATE_PROFESSIONAL_DETAIL_REQUEST,
  payload: data,
});

export const getAllAddressAction = () => ({
  type: USER_CONSTANTS.GET_ALL_ADDRESS_REQUEST,
});

export const getOccupationAction = () => ({
  type: USER_CONSTANTS.GET_OCCUPATION_REQUEST,
});
