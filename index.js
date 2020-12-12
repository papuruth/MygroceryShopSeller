import AsyncStorage from '@react-native-community/async-storage';
import messaging from '@react-native-firebase/messaging';
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

GLOBAL.XMLHttpRequest = GLOBAL.originalXMLHttpRequest || GLOBAL.XMLHttpRequest;
navigator.geolocation = require('react-native-geolocation-service');

messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  // Update a users messages list using AsyncStorage
  const currentMessages = await AsyncStorage.getItem('messages');
  if (currentMessages) {
    const messageArray = JSON.parse(currentMessages);
    messageArray.push(remoteMessage);
    await AsyncStorage.setItem('messages', JSON.stringify(messageArray));
  } else {
    const messageArray = [];
    messageArray.push(remoteMessage);
    await AsyncStorage.setItem('messages', JSON.stringify(messageArray));
  }
});

AppRegistry.registerComponent(appName, () => App);
