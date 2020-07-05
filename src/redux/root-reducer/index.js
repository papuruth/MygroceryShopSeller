import { combineReducers } from 'redux';
import userReducer from '../user/userReducer';
import gallery from '../../modules/gallery/GalleryState';

export default combineReducers({
  userReducer,
  gallery,
});
