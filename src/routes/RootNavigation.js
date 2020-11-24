import { createStackNavigator } from '@react-navigation/stack';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome5';
import APP_CONSTANTS from '../utils/appConstants/AppConstants';
import WithBadge from '../utils/reusableComponents/WithBadge';
import StackNavigationData from './StackNavigationData';

const Stack = createStackNavigator();
const NotifIcon = WithBadge(4)(Icon);

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
    marginRight: 12,
  },
  headerRightContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
    margin: 10,
  },
});

const {
  IMAGES: { iconMenu },
} = APP_CONSTANTS;

export default class NavigatorView extends PureComponent {
  headerLeftComponentMenu = () => {
    const { navigation } = this.props;
    return (
      <SafeAreaView>
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
      </SafeAreaView>
    );
  };

  headerRightComponent = () => {
    const { navigation } = this.props;
    return (
      <SafeAreaView style={styles.headerRightContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate('search')}
          style={{
            paddingLeft: 10,
            marginRight: 10,
          }}
        >
          <Icon name="search" color="white" size={20} containerStyle={styles.padRight} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('notification')}
          style={{
            paddingLeft: 10,
            marginRight: 10,
          }}
        >
          <NotifIcon name="bell" color="white" size={20} containerStyle={styles.padRight} />
        </TouchableOpacity>
      </SafeAreaView>
    );
  };

  render() {
    const { authenticated } = this.props;
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: authenticated,
        }}
      >
        {StackNavigationData.map((item) => {
          if (authenticated && item.path !== 'login' && item.path !== 'verify-otp') {
            return (
              <Stack.Screen
                key={`stack_item-${item.path}`}
                name={item.path}
                component={item.component}
                options={{
                  headerLeft: item.headerLeft || this.headerLeftComponentMenu,
                  headerRight: this.headerRightComponent,
                  headerBackground: () => (
                    <Image style={styles.headerImage} source={item.headerBackground.source} />
                  ),
                  headerTitleStyle: item.headerTitleStyle,
                  headerTitle: item.name,
                }}
              />
            );
          }
          if (!authenticated && (item.path === 'login' || item.path === 'verify-otp')) {
            return (
              <Stack.Screen
                key={`stack_item-${item.path}`}
                name={item.path}
                component={item.component}
                options={{
                  headerLeft: item.headerLeft || this.headerLeftComponentMenu,
                  headerRight: this.headerRightComponent,
                  headerBackground: () => (
                    <Image style={styles.headerImage} source={item.headerBackground.source} />
                  ),
                  headerTitleStyle: item.headerTitleStyle,
                  headerTitle: item.name,
                }}
              />
            );
          }
          return null;
        })}
      </Stack.Navigator>
    );
  }
}

NavigatorView.propTypes = {
  navigation: PropTypes.oneOfType([PropTypes.object]).isRequired,
  authenticated: PropTypes.bool.isRequired,
};
