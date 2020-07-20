import { combineReducers } from 'redux';
import { sessionReducer } from 'redux-react-native-session';
import userReducer from '../user/UserReducer';
import loaderReducer from '../loaderService/LoaderReducer'

export default combineReducers({
  session: sessionReducer,
  userReducer,
  loaderReducer,
});
