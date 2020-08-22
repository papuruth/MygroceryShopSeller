import AsyncStorage from '@react-native-community/async-storage';

const prefix = 'api_token:';

const storageKeys = {
  token: `${prefix}`,
};

export default {
  // Token
  setToken: async (token) => {
    try {
      await AsyncStorage.setItem(storageKeys.token, token);
    } catch (e) {
      console.log('Token saving error', e);
    }
  },
  getToken: async () => {
    try {
      const value = await AsyncStorage.getItem(storageKeys.token);
      return value;
    } catch (e) {
      return null;
    }
  },
  removeToken: async () => {
    try {
      await AsyncStorage.removeItem(storageKeys.token);
    } catch (e) {
      console.log('Error removing token', e);
    }
  },
  clearStorage: async () => {
    try {
      await AsyncStorage.clear();
    } catch (e) {
      console.log('Error clearing storage');
    }
  },
};
