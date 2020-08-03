import { USER_CONSTANTS } from './userConstants';

export const userSignupAction = (data) => ({
  type: USER_CONSTANTS.USER_REGISTER_REQUEST,
  payload: { data },
});

export const loginAction = (data) => ({
  type: USER_CONSTANTS.USER_AUTH_REQUEST,
  payload: { data },
});

export const getLocationAction = () => ({
  type: USER_CONSTANTS.GET_LOCATION_REQUEST,
});

export const getUserDataAction = () => ({
  type: USER_CONSTANTS.GET_USER_DATA_REQUEST,
});
