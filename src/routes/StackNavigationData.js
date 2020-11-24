import VerifyOTP from '@/containers/VerifyOTP';
import HomeScreen from '@/containers/HomeScreen';
import LoginScreen from '@/containers/LoginScreen';
import PropTypes from 'prop-types';
import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import MapScreen from '@/components/HomeScreen/MapScreen';
import AvailableInFullVersion from '../components/availableInFullVersion/AvailableInFullVersionViewContainer';
import EditAddress from '../containers/Address';
import Profile from '../containers/Profile';
import { colors, fonts } from '../styles';
import APP_CONSTANTS from '../utils/appConstants/AppConstants';

const {
  IMAGES: { headerBackground, arrowBack },
} = APP_CONSTANTS;
const HeaderLeftComponent = ({ onPress }) => (
  <TouchableOpacity
    onPress={onPress}
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

HeaderLeftComponent.propTypes = {
  onPress: PropTypes.func.isRequired,
};

const StackNavigationData = [
  {
    name: 'MyGroceryShop',
    path: 'home',
    component: HomeScreen,
    headerLeft: null,
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
    headerLeft: HeaderLeftComponent,
    headerBackground: { source: headerBackground },
    headerTitleStyle: {
      fontFamily: fonts.primaryRegular,
      color: colors.white,
      fontSize: 18,
    },
  },
  {
    name: 'Edit Address',
    path: 'edit-address',
    component: EditAddress,
    headerLeft: HeaderLeftComponent,
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
    headerLeft: HeaderLeftComponent,
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
    headerLeft: HeaderLeftComponent,
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
    headerLeft: HeaderLeftComponent,
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
    headerLeft: HeaderLeftComponent,
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
    component: LoginScreen,
    headerLeft: HeaderLeftComponent,
    headerBackground: { source: headerBackground },
    headerTitleStyle: {
      fontFamily: fonts.primaryRegular,
      color: colors.white,
      fontSize: 18,
    },
  },
  {
    name: 'Verify OTP',
    path: 'verify-otp',
    component: VerifyOTP,
    headerLeft: HeaderLeftComponent,
    headerBackground: { source: headerBackground },
    headerTitleStyle: {
      fontFamily: fonts.primaryRegular,
      color: colors.white,
      fontSize: 18,
    },
  },
  {
    name: 'My Orders',
    path: 'orders',
    component: AvailableInFullVersion,
    headerLeft: HeaderLeftComponent,
    headerBackground: { source: headerBackground },
    headerTitleStyle: {
      fontFamily: fonts.primaryRegular,
      color: colors.white,
      fontSize: 18,
    },
  },
  {
    name: 'Choose Location',
    path: 'map-screen',
    component: MapScreen,
    headerLeft: HeaderLeftComponent,
    headerBackground: { source: headerBackground },
    headerTitleStyle: {
      fontFamily: fonts.primaryRegular,
      color: colors.white,
      fontSize: 18,
    },
  },
];

export default StackNavigationData;
