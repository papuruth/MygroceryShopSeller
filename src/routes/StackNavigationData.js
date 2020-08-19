import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { colors, fonts } from '../styles';
import AvailableInFullVersion from '../components/availableInFullVersion/AvailableInFullVersionViewContainer';
import LoginView from '../components/login/LoginViewContainer';
import RegisterScreen from '../components/register/RegisterViewContainer';
import APP_CONSTANTS from '../utils/appConstants/AppConstants';
import TabNavigator from './MainTabNavigator';
import Profile from '../containers/Profile';
import {CompleteBooking} from '../components/booking/bookingContainer';

const {
  IMAGES: { headerBackground, arrowBack },
} = APP_CONSTANTS;
const headerLeftComponent = (props) => (
  <TouchableOpacity
    onPress={props.onPress}
    style={{
      paddingLeft: 10,
    }}
  >
    <Image
      source={arrowBack}
      resizeMode="contain"
      style={{
        height: 20,
      }}
    />
  </TouchableOpacity>
);

const StackNavigationData = [
  {
    name: 'Real Estate',
    path: 'home',
    component: TabNavigator,
    headerLeft: null,
    headerBackground: { source: headerBackground },
    headerTitleStyle: {
      fontFamily: fonts.primaryRegular,
      color: colors.white,
      fontSize: 18,
    },
  },
  {
    name: 'Architecture',
    path: 'arch',
    component: AvailableInFullVersion,
    headerLeft: headerLeftComponent,
    headerBackground: { source: headerBackground },
    headerTitleStyle: {
      fontFamily: fonts.primaryRegular,
      color: colors.white,
      fontSize: 18,
    },
  },
  {
    name: 'Civil',
    path: 'civil',
    component: AvailableInFullVersion,
    headerLeft: headerLeftComponent,
    headerBackground: { source: headerBackground },
    headerTitleStyle: {
      fontFamily: fonts.primaryRegular,
      color: colors.white,
      fontSize: 18,
    },
  },
  {
    name: 'Mason (with Labour)',
    path: 'mason',
    component: AvailableInFullVersion,
    headerLeft: headerLeftComponent,
    headerBackground: { source: headerBackground },
    headerTitleStyle: {
      fontFamily: fonts.primaryRegular,
      color: colors.white,
      fontSize: 18,
    },
  },
  {
    name: 'Carpenter',
    path: 'carpenter',
    component: AvailableInFullVersion,
    headerLeft: headerLeftComponent,
    headerBackground: { source: headerBackground },
    headerTitleStyle: {
      fontFamily: fonts.primaryRegular,
      color: colors.white,
      fontSize: 18,
    },
  },
  {
    name: 'Electrician',
    path: 'electrician',
    component: AvailableInFullVersion,
    headerLeft: headerLeftComponent,
    headerBackground: { source: headerBackground },
    headerTitleStyle: {
      fontFamily: fonts.primaryRegular,
      color: colors.white,
      fontSize: 18,
    },
  },
  {
    name: 'Plumber',
    path: 'plumber',
    component: AvailableInFullVersion,
    headerLeft: headerLeftComponent,
    headerBackground: { source: headerBackground },
    headerTitleStyle: {
      fontFamily: fonts.primaryRegular,
      color: colors.white,
      fontSize: 18,
    },
  },
  {
    name: 'Painter',
    path: 'painter',
    component: AvailableInFullVersion,
    headerLeft: headerLeftComponent,
    headerBackground: { source: headerBackground },
    headerTitleStyle: {
      fontFamily: fonts.primaryRegular,
      color: colors.white,
      fontSize: 18,
    },
  },
  {
    name: 'Welder',
    path: 'welder',
    component: AvailableInFullVersion,
    headerLeft: headerLeftComponent,
    headerBackground: { source: headerBackground },
    headerTitleStyle: {
      fontFamily: fonts.primaryRegular,
      color: colors.white,
      fontSize: 18,
    },
  },
  {
    name: 'Tiles / Stones / Flooring',
    path: 'tiles',
    component: AvailableInFullVersion,
    headerLeft: headerLeftComponent,
    headerBackground: { source: headerBackground },
    headerTitleStyle: {
      fontFamily: fonts.primaryRegular,
      color: colors.white,
      fontSize: 18,
    },
  },
  {
    name: 'Home Decoration',
    path: 'home-decor',
    component: AvailableInFullVersion,
    headerLeft: headerLeftComponent,
    headerBackground: { source: headerBackground },
    headerTitleStyle: {
      fontFamily: fonts.primaryRegular,
      color: colors.white,
      fontSize: 18,
    },
  },
  {
    name: 'Profile',
    path: 'profile',
    component: Profile,
    headerLeft: headerLeftComponent,
    headerBackground: { source: headerBackground },
    headerTitleStyle: {
      fontFamily: fonts.primaryRegular,
      color: colors.white,
      fontSize: 18,
    },
  },
  {
    name: 'Search',
    path: 'search',
    component: AvailableInFullVersion,
    headerLeft: headerLeftComponent,
    headerBackground: { source: headerBackground },
    headerTitleStyle: {
      fontFamily: fonts.primaryRegular,
      color: colors.white,
      fontSize: 18,
    },
  },
  {
    name: 'Notifications',
    path: 'notification',
    component: AvailableInFullVersion,
    headerLeft: headerLeftComponent,
    headerBackground: { source: headerBackground },
    headerTitleStyle: {
      fontFamily: fonts.primaryRegular,
      color: colors.white,
      fontSize: 18,
    },
  },
  {
    name: 'Cart Items',
    path: 'cart',
    component: AvailableInFullVersion,
    headerLeft: headerLeftComponent,
    headerBackground: { source: headerBackground },
    headerTitleStyle: {
      fontFamily: fonts.primaryRegular,
      color: colors.white,
      fontSize: 18,
    },
  },
  {
    name: 'Settings',
    path: 'setting',
    component: AvailableInFullVersion,
    headerLeft: headerLeftComponent,
    headerBackground: { source: headerBackground },
    headerTitleStyle: {
      fontFamily: fonts.primaryRegular,
      color: colors.white,
      fontSize: 18,
    },
  },
  {
    name: 'Login',
    path: 'login',
    component: LoginView,
    headerLeft: headerLeftComponent,
    headerBackground: { source: headerBackground },
    headerTitleStyle: {
      fontFamily: fonts.primaryRegular,
      color: colors.white,
      fontSize: 18,
    },
  },
  {
    name: 'Register',
    path: 'register',
    component: RegisterScreen,
    headerLeft: headerLeftComponent,
    headerBackground: { source: headerBackground },
    headerTitleStyle: {
      fontFamily: fonts.primaryRegular,
      color: colors.white,
      fontSize: 18,
    },
  },
  {
    name: 'Bookings',
    path: 'bookings',
    component: CompleteBooking,
    headerLeft: headerLeftComponent,
    headerBackground: { source: headerBackground },
    headerTitleStyle: {
      fontFamily: fonts.primaryRegular,
      color: colors.white,
      fontSize: 18,
    },
  },

];

export default StackNavigationData;
