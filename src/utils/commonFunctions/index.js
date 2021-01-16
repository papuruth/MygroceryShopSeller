import { userLogout } from '@/redux/user/userAction';
import auth from '@react-native-firebase/auth';
import cc from 'currency-formatter';
import _ from 'lodash';
import moment from 'moment';
import { Alert } from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import { sessionService } from 'redux-react-native-session';
import Storage from '../Storage';

export const checkEmpty = (data) => {
  return _.isEmpty(data);
};

export const equalityChecker = (param1, param2) => _.isEqual(param1, param2);

export const dateTimeFormater = (date, format) => moment(date).format(format);

const options = {
  mediaType: 'photo',
  maxWidth: 300,
  maxHeight: 300,
  quality: 1,
};

/**
 * The first arg is the options object for customization (it can also be null or omitted for default options),
 * The second arg is the callback which sends object: response (more info in the API Reference)
 */
export const imageSelector = () => {
  return new Promise((resolve, reject) => {
    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        resolve(false);
      } else if (response.error) {
        reject(response.error);
      } else {
        resolve(response?.uri);
      }
      reject(new Error('Error picking photo'));
    });
  });
};

export const handleLogout = async (props) => {
  try {
    const { dispatch, navigation } = props;
    dispatch(userLogout());
    await sessionService.deleteSession();
    await sessionService.deleteUser();
    await Storage.clearStorage();
    await auth().signOut();
    Alert.alert(
      'Success',
      'You have logged out successfully!',
      [{ text: 'OK', onPress: () => navigation.navigate('login') }],
      { cancelable: false },
    );
  } catch (e) {
    console.log(e?.message);
  }
};

export const currencyFormatter = (price) => cc.format(price, { code: 'INR' });
