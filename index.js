import messaging from '@react-native-firebase/messaging';
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

GLOBAL.XMLHttpRequest = GLOBAL.originalXMLHttpRequest || GLOBAL.XMLHttpRequest;

messaging().setBackgroundMessageHandler(async () => {
  console.log('FCM Background Handler');
});

AppRegistry.registerComponent(appName, () => App);
