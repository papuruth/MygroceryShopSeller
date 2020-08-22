import api from './API';

/**
 * @author Papu Kumar
 * @param {string} url - API Endpoint
 * @async
 * @description function for GET type API
 */
export const getAPIData = async (url) => {
  try {
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
  try {
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
 * @description function for PUT type API
 */
export const putAPIData = async (url, data) => {
  try {
    const response = await api.put(url, { ...data });
    return response.data;
  } catch (err) {
    return {
      type: 'error',
      status: false,
      response: err.response ? err.response.data : {},
    };
  }
};
