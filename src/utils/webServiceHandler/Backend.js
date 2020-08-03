/**
 * API handler
 * @author Papu Kumar
 * @description Wrapper for easy API handling
 */

import APP_CONSTANTS from '../appConstants/AppConstants';
import api from './API';

/**
 * @author Papu Kumar
 * @description check network connectivity for web
 */
const checkConnectivity = () => navigator.onLine;

/**
 * @author Papu Kumar
 * @param {string} url - API Endpoint
 * @async
 * @description function for GET type API
 */
export const getAPIData = async (url) => {
  const {
    APP_MESSAGES: { NOINTERNET },
  } = APP_CONSTANTS;
  const internet = checkConnectivity();
  try {
    if (!internet) {
      throw NOINTERNET;
    }
    const response = await api.get(url);
    return response.data;
  } catch (err) {
    return {
      type: 'error',
      message: err.message,
    };
  }
};

/**
 * @author Papu Kumar
 * @description function for POST type API
 */
export const postAPIData = async (url, data) => {
  const {
    APP_MESSAGES: { NOINTERNET },
  } = APP_CONSTANTS;
  const internet = checkConnectivity();
  try {
    if (!internet) {
      throw NOINTERNET;
    }
    const response = await api.post(url, { ...data });
    return response.data;
  } catch (err) {
    return {
      type: 'error',
      status: false,
      response: err.response ? err.response.data : {},
    };
  }
};
/**
 * @author Papu Kumar
 * @description function called if there is a failure in API call
 */
export const onFailure = async (response) => {
  const { DELEGATEINACTIVE } = GLOBALCONSTANTS;
  if (!response.status) {
    if (response.message === DELEGATEINACTIVE) {
      // Todo globalLogout
      return false;
    }
    // Todo showALert
    return false;
  }
  if (!response.response.status) {
    // Todo showAlert
    return false;
  }
  return true;
};
