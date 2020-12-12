import HomeScreen from '@/containers/HomeScreen';
import LoginScreen from '@/containers/LoginScreen';
import MyProductsScreen from '@/containers/MyProductsScreen';
import OrderDetailsScreen from '@/containers/OrderDetailsScreen';
import OrdersScreen from '@/containers/OrdersScreen';
import ProductDetailsScreen from '@/containers/ProductDetailsScreen';
import VerifyOTP from '@/containers/VerifyOTP';
import FeatureInDevelopment from '@/utils/reusableComponents/FeatureInDevelopment';
import PropTypes from 'prop-types';
import React from 'react';
import { SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import Profile from '../containers/Profile';
import { colors, fonts } from '../styles';
import APP_CONSTANTS from '../utils/appConstants/AppConstants';

const {
  IMAGES: { headerBackground },
} = APP_CONSTANTS;

const styles = StyleSheet.create({
  headerLeftContainer: {
    alignContent: 'center',
    paddingLeft: 10,
    justifyContent: 'center',
  },
  menuIcon: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});
const HeaderLeftComponent = ({ onPress }) => (
  <SafeAreaView style={styles.headerLeftContainer}>
    <TouchableOpacity onPress={onPress} style={styles.menuIcon}>
      <Icon name="chevron-left" color="white" size={30} />
    </TouchableOpacity>
  </SafeAreaView>
);

HeaderLeftComponent.propTypes = {
  onPress: PropTypes.func.isRequired,
};

const StackNavigationData = [
  {
    name: 'Add - Category & Products',
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
    name: 'Notifications',
    path: 'notification',
    component: FeatureInDevelopment,
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
    component: FeatureInDevelopment,
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
    name: 'My Products',
    path: 'products',
    component: MyProductsScreen,
    headerLeft: HeaderLeftComponent,
    headerBackground: { source: headerBackground },
    headerTitleStyle: {
      fontFamily: fonts.primaryRegular,
      color: colors.white,
      fontSize: 18,
    },
  },
  {
    name: 'Product Details',
    path: 'product-details',
    component: ProductDetailsScreen,
    headerLeft: HeaderLeftComponent,
    headerBackground: { source: headerBackground },
    headerTitleStyle: {
      fontFamily: fonts.primaryRegular,
      color: colors.white,
      fontSize: 18,
    },
  },
  {
    name: 'Users Orders',
    path: 'orders',
    component: OrdersScreen,
    headerLeft: HeaderLeftComponent,
    headerBackground: { source: headerBackground },
    headerTitleStyle: {
      fontFamily: fonts.primaryRegular,
      color: colors.white,
      fontSize: 18,
    },
  },
  {
    name: 'Orders Details',
    path: 'order-details',
    component: OrderDetailsScreen,
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
