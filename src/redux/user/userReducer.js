import { userConstants } from './userConstants';

const initialState = {
  isLoggedIn: false,
  loading: false,
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case userConstants.USER_AUTH_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case userConstants.USER_AUTH_SUCCESS:
      return {
        ...state,
        loading: false,
        isLoggedIn: true,
      };
    case userConstants.USER_AUTH_FAILURE:
      return {
        ...state,
        loading: false,
        loginError: action.error,
      };
    default:
      return { ...state };
  }
}
