import _ from 'lodash';
import moment from 'moment';

export const checkEmpty = (data) => {
  return _.isEmpty(data);
}

export const equalityChecker = (param1, param2) => _.isEqual(param1, param2);

export const dateTimeFormater = (date, format) => moment(date).format(format);