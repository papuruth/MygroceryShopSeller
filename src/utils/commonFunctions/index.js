import _ from 'lodash';
import moment from 'moment';
import ImagePicker from 'react-native-image-picker';


export const checkEmpty = (data) => {
  return _.isEmpty(data);
}

export const equalityChecker = (param1, param2) => _.isEqual(param1, param2);

export const dateTimeFormater = (date, format) => moment(date).format(format);

const options = {
  noData: true,
  maxWidth: 300,
  maxHeight: 200,
};

/**
 * The first arg is the options object for customization (it can also be null or omitted for default options),
 * The second arg is the callback which sends object: response (more info in the API Reference)
 */
export const imageSelector = () => {
  return new Promise((resolve, reject) => {
    ImagePicker.launchImageLibrary(options, (response) => {  
      if (response.didCancel) {
        resolve('User cancelled image picker');
      } else if (response.error) {
        reject(response.error);
      } else {
        resolve(response?.uri);
      }
      reject(new Error('Error picking photo'));
    });
  })
} 
