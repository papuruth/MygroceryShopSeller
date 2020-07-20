import { USER_CONSTANTS } from './UserConstants';

const initialState = {
  isLoggedIn: false,
  signUpData: {},
  signUpStatus: false,
  signUpError: {},
  locations: [],
  locationError: {}
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
          signUpError: {},
        };
      case USER_CONSTANTS.USER_REGISTER_SUCCESS:
        console.log(action)
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
    default:
      return { ...state };
  }
}
