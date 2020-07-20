import { USER_CONSTANTS } from './UserConstants';

export const userSignupAction = (data) => ({
  type: USER_CONSTANTS.USER_REGISTER_REQUEST,
  payload: { data },
});

export const getLocationAction = () => ({
  type: USER_CONSTANTS.GET_LOCATION_REQUEST,
});
