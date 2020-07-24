import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import RenderDrawer from './DrawerNavigation';
import NavigatorView from './RootNavigation';

const Drawer = createDrawerNavigator();

const styles = StyleSheet.create({
  loaderContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    opacity: 0.5,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default class App extends React.PureComponent {
  render() {
    const { loaderService, authenticated, user } = this.props;
    return (
      <>
        <Drawer.Navigator
          drawerStyle={{
            backgroundColor: '#3C38B1',
            width: '85%',
          }}
          drawerContent={(props) => <RenderDrawer {...props} authenticated={authenticated} user={user} />}
        >
          <Drawer.Screen name="Homes" component={NavigatorView} />
        </Drawer.Navigator>
        {loaderService && (
          <View style={styles.loaderContainer}>
            <ActivityIndicator />
          </View>
        )}
      </>
    );
  }
}

App.propTypes = {
  loaderService: PropTypes.bool.isRequired,
};
