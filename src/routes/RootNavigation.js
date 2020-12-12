import messaging from '@react-native-firebase/messaging';
import { createStackNavigator } from '@react-navigation/stack';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import StackNavigationData from './StackNavigationData';

const Stack = createStackNavigator();

const styles = StyleSheet.create({
  headerImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: `100%`,
    height: 57,
  },
  headerLeftContainer: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
  },
  menuIcon: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingLeft: 10,
  },
});

export default class NavigatorView extends PureComponent {
  constructor() {
    super();
    this.state = {
      initialRoute: '',
    };
  }

  componentDidMount() {
    const { navigation, authenticated } = this.props;
    if (authenticated) {
      messaging().onNotificationOpenedApp((remoteMessage) => {
        navigation.navigate(remoteMessage?.data?.route);
      });

      // Check whether an initial notification is available
      messaging()
        .getInitialNotification()
        .then((remoteMessage) => {
          if (remoteMessage) {
            this.setState(
              {
                initialRoute: remoteMessage?.data?.route,
              },
              () => navigation.navigate(remoteMessage?.data?.route),
            );
          }
        });
    }
  }

  headerLeftComponentMenu = () => {
    const { navigation } = this.props;
    return (
      <SafeAreaView style={styles.headerLeftContainer}>
        <TouchableOpacity onPress={() => navigation.toggleDrawer()} style={styles.menuIcon}>
          <Icon name="menu" type="material-community" color="white" size={30} />
        </TouchableOpacity>
      </SafeAreaView>
    );
  };

  render() {
    const { authenticated } = this.props;
    const { initialRoute } = this.state;
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: authenticated,
        }}
        initialRouteName={initialRoute}
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
                  headerRight: null,
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
                  headerRight: null,
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
