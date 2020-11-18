import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

GLOBAL.XMLHttpRequest = GLOBAL.originalXMLHttpRequest || GLOBAL.XMLHttpRequest;
navigator.geolocation = require('react-native-geolocation-service');

AppRegistry.registerComponent(appName, () => App);
