/* eslint-disable no-underscore-dangle */
import NavigatorView from '@/containers/NavigatorView';
import { loaderStartAction, loaderStopAction } from '@/redux/loaderService/LoaderAction';
import { checkEmpty, handleLogout } from '@/utils/commonFunctions';
import Storage from '@/utils/Storage';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import messaging from '@react-native-firebase/messaging';
import { createDrawerNavigator } from '@react-navigation/drawer';
import PropTypes from 'prop-types';
import React from 'react';
import RNBootSplash from 'react-native-bootsplash';
import { Alert } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import * as Progress from 'react-native-progress';
import { sessionService } from 'redux-react-native-session';
import RenderDrawer from './DrawerNavigation';

const Drawer = createDrawerNavigator();

export default class App extends React.PureComponent {
  async componentDidMount() {
    this.unsubscribe = auth().onAuthStateChanged(this.onAuthStateChanged);
    await RNBootSplash.hide({ fade: true });
  }

  componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
    if (this.fcmUnsubscribe) {
      this.fcmUnsubscribe();
    }
  }

  saveTokenToDatabase = async (token) => {
    const userId = auth()?.currentUser?.uid;
    if (userId) {
      await firestore()
        .collection('distributors')
        .doc(userId)
        .update({
          tokens: firestore.FieldValue.arrayUnion(token),
        });
    }
  };

  saveFcmToken = () => {
    messaging()
      .getToken()
      .then((token) => {
        return this.saveTokenToDatabase(token);
      });
    this.fcmUnsubscribe = messaging().onTokenRefresh((token) => {
      this.saveTokenToDatabase(token);
    });
  };

  onAuthStateChanged = async (user) => {
    if (!checkEmpty(user) && !checkEmpty(user._user)) {
      const accessToken = await auth().currentUser.getIdToken();
      await Storage.setToken(accessToken);
      const { dispatch } = this.props;
      dispatch(loaderStartAction());
      const storedUser = await firestore()
        .collection('distributors')
        .doc(user?._user?.uid)
        .get();
      if (storedUser?.data() && storedUser?.data()?.user_type) {
        if (storedUser?.data()?.user_type !== 1 || !storedUser?.data()?.status) {
          Alert.alert('Info', 'Sorry you are not allowed to use this app. Please contact support.');
          await handleLogout(this.props);
          dispatch(loaderStopAction());
          return;
        }
        await sessionService.saveSession(storedUser?.data());
        await sessionService.saveUser(storedUser?.data());
        this.saveFcmToken();
      } else {
        await firestore()
          .collection('distributors')
          .doc(user?._user.uid)
          .set({ ...user?._user, user_type: 1, status: 1 });
        await sessionService.saveSession({ ...user?._user, user_type: 1, status: 1 });
        await sessionService.saveUser({ ...user?._user, user_type: 1, status: 1 });
      }
      dispatch(loaderStopAction());
    }
  };

  render() {
    const { loaderService, authenticated, user, dispatch } = this.props;
    return (
      <>
        <Spinner
          visible={loaderService}
          cancelable
          customIndicator={(
            <Progress.CircleSnail
              size={70}
              thickness={5}
              progress={1}
              color={['red', 'green', 'blue']}
            />
          )}
          overlayColor="rgba(0,0,0,0.4)"
          animation="fade"
        />
        <Drawer.Navigator
          drawerStyle={{
            backgroundColor: '#3C38B1',
            width: '85%',
          }}
          screenOptions={{
            swipeEnabled: authenticated,
          }}
          drawerContent={(props) => (
            <RenderDrawer
              {...props}
              authenticated={authenticated}
              user={user}
              dispatch={dispatch}
            />
          )}
        >
          <Drawer.Screen name="root" component={NavigatorView} />
        </Drawer.Navigator>
      </>
    );
  }
}

App.propTypes = {
  loaderService: PropTypes.bool.isRequired,
  authenticated: PropTypes.bool.isRequired,
  user: PropTypes.oneOfType([PropTypes.object]).isRequired,
  dispatch: PropTypes.func.isRequired,
};
