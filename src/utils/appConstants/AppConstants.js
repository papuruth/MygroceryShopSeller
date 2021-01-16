import { Dimensions } from 'react-native';
import ENV from './Environment';

const APP_CONSTANTS = {
  REGEX: {
    EMAIL: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  },
  URLS: {
    sendNotification: `${ENV.API_HOST}/notification/send`,
    tos: 'http://mygrocerymarket.in/termsofservice.html',
    privacyPolicy: 'http://mygrocerymarket.in/privacypolicy.html',
  },
  APP_MESSAGES: {
    NOINTERNET: 'You are disconnected! Please connect to Internet',
    EDITPROFILE: 'To edit, please go to the My Profile screen',
    NODATA: 'No data found',
    EMP_WELCOME: 'Welcome to your dashboard. No recent bookings found!',
    WEB_SERVICE_ERR_MESSAGE: 'No network connection could be found',
    NODOCUMENTSMESSAGE: 'No Documents Found',
    PRODUCT_DISCLAIMER:
      'Image shown is a representation and may slightly vary from the actual product. Every effort is made to maintain accuracy of all information displayed.',
  },
  IMAGES: {
    appLogo: require('../../assets/images/logo_orange.png'),
    parisoCover: require('../../assets/images/cover_parsio.jpg'),
    iconDrawerHome: require('../../assets/images/drawer/home.png'),
    iconTabHome: require('../../assets/images/tabbar/home.png'),
    iconWallet: require('../../assets/images/drawer/wallet-outline.png'),
    iconSettings: require('../../assets/images/drawer/settings.png'),
    iconLogin: require('../../assets/icons/login.png'),
    iconLogout: require('../../assets/icons/iconLogout.png'),
    iconSignup: require('../../assets/icons/signup.png'),
    iconUser: require('../../assets/images/drawer/user.png'),
    avatar: require('../../assets/images/RNS_nerd.png'),
    iconMenu: require('../../assets/images/drawer/menu.png'),
    background: require('../../assets/images/background.png'),
    headerBackground: require('../../assets/images/topBarBg.png'),
    arrowBack: require('../../assets/images/icons/arrow-back.png'),
    loginIcon: require('../../assets/icons/loginIcon.jpeg'),
    cameraIcon: require('../../assets/icons/camera.png'),
    iconDrawerBooking: require('../../assets/images/drawer/bookings.png'),
    iconTabBooking: require('../../assets/images/tabbar/bookings.png'),
  },
  DEVICE_DIMENSIONS: {
    SCREENHEIGHT: Dimensions.get('window').height,
    SCREENWIDTH: Dimensions.get('window').width,
  },
};

export default APP_CONSTANTS;
