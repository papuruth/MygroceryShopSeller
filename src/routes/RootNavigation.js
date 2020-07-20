import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import PropTypes from 'prop-types';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome5';
import WithBadge from '../utils/reusableComponents/WithBadge';
import StackNavigationData from './StackNavigationData';
import APP_CONSTANTS from '../utils/appConstants/AppConstants';

const Stack = createStackNavigator();
const NotifIcon = WithBadge(4)(Icon);
const CartIcon = WithBadge(1)(Icon);

const styles = StyleSheet.create({
  headerImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: `${100}%`,
    height: 57,
  },
  padRight: {
    paddingRight: 16,
  },
  headerRightContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'center',
    margin: 10,
  },
});


export default function NavigatorView({ navigation }) {
  // if (authState.isLoggedIn || authState.hasSkippedLogin) {
  //     return <AppNavigator />;
  // }
  // return <AuthScreen />;
  const { IMAGES: { iconMenu } } = APP_CONSTANTS;
  const headerLeftComponentMenu = () => (
    <TouchableOpacity
      onPress={() => navigation.toggleDrawer()}
      style={{
        paddingLeft: 10,
      }}
    >
      <Image
        source={iconMenu}
        resizeMode="contain"
        style={{
          height: 20,
        }}
      />
    </TouchableOpacity>
  );

  const headerRightComponent = () => (
    <SafeAreaView style={styles.headerRightContainer}>
      <TouchableOpacity
        onPress={() => navigation.navigate('search')}
        style={{
          paddingLeft: 10,
          marginRight: 10,
        }}
      >
        <Icon
          name="search"
          color="white"
          size={20}
          containerStyle={styles.padRight}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('notification')}
        style={{
          paddingLeft: 10,
          marginRight: 10,
        }}
      >
        <NotifIcon
          name="bell"
          color="white"
          size={20}
          containerStyle={styles.padRight}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('cart')}
        style={{
          paddingLeft: 10,
          marginRight: 10,
        }}
      >
        <CartIcon
          name="shopping-cart"
          color="white"
          size={20}
          containerStyle={styles.padRight}
        />
      </TouchableOpacity>
    </SafeAreaView>
  );

  return (
    <Stack.Navigator>
      {StackNavigationData.map(item => (
        <Stack.Screen
          key={`stack_item-${item.path}`}
          name={item.path}
          component={item.component}
          options={{
            headerLeft: item.headerLeft || headerLeftComponentMenu,
            headerRight: headerRightComponent,
            headerBackground: () => (
              <Image
                style={styles.headerImage}
                source={item.headerBackground.source}
              />
            ),
            headerTitleStyle: item.headerTitleStyle,
            headerTitle: item.name,
          }}
        />
      ))}
    </Stack.Navigator>
  );
}

NavigatorView.propTypes = {
  navigation: PropTypes.oneOfType([PropTypes.object]).isRequired,
};
