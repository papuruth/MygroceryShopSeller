import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import React from 'react';
import { Image, Text, TouchableHighlight, View, StyleSheet, Alert } from 'react-native';
import PropTypes from 'prop-types';
import { sessionService } from 'redux-react-native-session';
import APP_CONSTANTS from '../utils/appConstants/AppConstants';
import { Button } from '../utils/reusableComponents';
import Storage from '../utils/Storage';

const {
  IMAGES: { iconHome,iconBooking },
} = APP_CONSTANTS;

const styles = StyleSheet.create({
  drwerHeader: {
    display: 'flex',
    flexDirection: 'column',
  },
  menuTitle: {
    marginLeft: 10,
    color: '#fff',
  },
  menuLabelFlex: {
    display: 'flex',
    flexDirection: 'row',
  },
  userName: {
    color: '#fff',
    fontSize: 18,
  },
  divider: {
    borderBottomColor: 'white',
    opacity: 0.2,
    borderBottomWidth: 1,
    margin: 15,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 20,
  },
  avatarContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    margin: 20,
    marginBottom: 10,
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    margin: 10,
    marginBottom: 10,
  },
});

drawerData = [
  {
    name: 'Home',
    path: 'home',
    icon: iconHome,
  },
  {
    name: 'Bookings',
    path: 'bookings',
    icon: iconBooking,
  }
  //   {
  //     name: 'Civil Engineer',
  //     path: 'civil',
  //     icon: iconCivil,
  //   },
  //   {
  //     name: 'Mason',
  //     path: 'mason',
  //     icon: iconMason,
  //   },
  //   {
  //     name: 'Carpenter',
  //     path: 'carpenter',
  //     icon: iconCarpenter,
  //   },
  //   {
  //     name: 'Electrician',
  //     path: 'electrician',
  //     icon: iconElectrician,
  //   },
  //   {
  //     name: 'Plumber',
  //     path: 'plumber',
  //     icon: iconPlumber,
  //   },
  //   {
  //     name: 'Painter',
  //     path: 'painter',
  //     icon: iconPainter,
  //   },
  //   {
  //     name: 'Welder',
  //     path: 'welder',
  //     icon: iconWelder,
  //   },
  //   {
  //     name: 'Tiles / Stones / Flooring',
  //     path: 'tiles',
  //     icon: iconTiles,
  //   },
  //   {
  //     name: 'Home Decoration',
  //     path: 'home-decor',
  //     icon: iconHomeDecor,
  //   },
];

export default function RenderDrawer(props) {
  const {
    IMAGES: { iconUser, iconLogin, iconLogout, iconSignup, iconSettings },
  } = APP_CONSTANTS;
  const { navigation, authenticated, user } = props;
  console.log("sdfghj",user)
  const handleLogout = async () => {
    await sessionService.deleteSession();
    await sessionService.deleteUser();
    await Storage.clearStorage();
    Alert.alert(
      'Success',
      'You have logged out successfully!',
      [
        { text: 'OK', onPress: () => navigation.navigate('home') }
      ],
      { cancelable: false }
    );
  }
  return (
    <DrawerContentScrollView {...props} style={{ padding: 0 }}>
      <View style={styles.drawerHeader}>
        <View style={styles.avatarContainer}>
          <TouchableHighlight onPress={() => navigation.navigate('profile')}>
            <Image style={styles.avatar} source={iconUser} />
          </TouchableHighlight>
          <View style={{ paddingLeft: 15 }}>
            <Text style={styles.userName}>{user.name?user.name:"Construct"}</Text>
            <Text style={{ color: '#4BC1FD' }}>{user.username}</Text>
          </View>
        </View>
        {!authenticated ? (
          <View style={styles.buttonContainer}>
            <Button
              bordered
              rounded
              caption="Login"
              icon={iconLogin}
              onPress={() => {
                navigation.navigate('login');
              }}
            />
            <Button
              bordered
              rounded
              caption="Signup"
              icon={iconSignup}
              onPress={() => {
                navigation.navigate('register');
              }}
            />
          </View>
        ) : (
          <View style={styles.buttonContainer}>
            <Button
              bordered
              rounded
              caption="Logout"
              icon={iconLogout}
              onPress={handleLogout}
            />
          </View>
        )}
      </View>
      <View style={styles.divider} />
      {console.log("rtyuiop",drawerData)}
      {drawerData.map((item, idx) => (
        <DrawerItem
          key={`drawer_item-${idx + 1}`}
          label={() => (
            <View style={styles.menuLabelFlex}>
              <Image style={{ width: 20, height: 20 }} source={item.icon} />
              <Text style={styles.menuTitle}>{item.name}</Text>
            </View>
          )}
          onPress={() => navigation.navigate(item.path)}
        />
      ))}
      <View style={styles.divider} />
      <DrawerItem
        label={() => (
          <View style={styles.menuLabelFlex}>
            <Image style={{ width: 20, height: 20 }} source={iconSettings} />
            <Text style={styles.menuTitle}>Settings</Text>
          </View>
        )}
        onPress={() => navigation.navigate('setting')}
      />
    </DrawerContentScrollView>
  );
}

RenderDrawer.propTypes = {
  navigation: PropTypes.oneOfType([PropTypes.object]).isRequired,
  authenticated: PropTypes.oneOfType([PropTypes.object]).isRequired,
  user: PropTypes.oneOfType([PropTypes.object]).isRequired
}