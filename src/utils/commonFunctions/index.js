import _ from 'lodash';

export const checkEmpty = (data) => {
  return _.isEmpty(data);
}

export const equalityChecker = (param1, param2) => _.isEqual(param1, param2);