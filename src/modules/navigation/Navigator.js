import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import * as React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
} from 'react-native';
import { Button } from '../../components';
import NavigatorView from './RootNavigation';

const iconHome = require('../../../assets/images/drawer/home.png');
const iconArchitect = require('../../../assets/icons/architect.png');
const iconCivil = require('../../../assets/icons/engineer.png');
const iconMason = require('../../../assets/icons/mason.png');
const iconCarpenter = require('../../../assets/icons/carpenter.png');
const iconElectrician = require('../../../assets/icons/electrician.png');
const iconPlumber = require('../../../assets/icons/plumber.png');
const iconPainter = require('../../../assets/icons/painter.png');
const iconWelder = require('../../../assets/icons/welder.png');
const iconTiles = require('../../../assets/icons/tiles.png');
const iconHomeDecor = require('../../../assets/icons/homeDecor.png');

const iconSettings = require('../../../assets/images/drawer/settings.png');

const iconLogin = require('../../../assets/icons/login.png');
const iconSignup = require('../../../assets/icons/signup.png');

const drawerData = [
  {
    name: 'Home',
    path: 'home',
    icon: iconHome,
  },
//   {
//     name: 'Architecture',
//     path: 'arch',
//     icon: iconArchitect,
//   },
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

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props} style={{ padding: 0 }}>
      <View style={styles.drawerHeader}>
        <View style={styles.avatarContainer}>
          <TouchableHighlight
            onPress={() => props.navigation.navigate('profile')}
          >
            <Image
              style={styles.avatar}
              source={require('../../../assets/images/drawer/user.png')}
            />
          </TouchableHighlight>
          <View style={{ paddingLeft: 15 }}>
            <Text style={styles.userName}>John Doe</Text>
            <Text style={{ color: '#4BC1FD' }}>Johndoe@gmail.com</Text>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <Button bordered rounded caption="Login" icon={iconLogin} />
          <Button bordered rounded caption="Signup" icon={iconSignup} onPress={() => props.navigation.navigate('register')} />
        </View>
      </View>
      <View style={styles.divider} />
      {drawerData.map((item, idx) => (
        <DrawerItem
          key={`drawer_item-${idx + 1}`}
          label={() => (
            <View style={styles.menuLabelFlex}>
              <Image style={{ width: 20, height: 20 }} source={item.icon} />
              <Text style={styles.menuTitle}>{item.name}</Text>
            </View>
          )}
          onPress={() => props.navigation.navigate(item.path)}
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
        onPress={() => props.navigation.navigate('setting')}
      />
    </DrawerContentScrollView>
  );
}

export default function App() {
  return (
    <Drawer.Navigator
      drawerStyle={{
        backgroundColor: '#3C38B1',
        width: '85%',
      }}
      drawerContent={props => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="Homes" component={NavigatorView} />
    </Drawer.Navigator>
  );
}

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
