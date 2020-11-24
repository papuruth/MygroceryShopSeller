/* eslint-disable no-underscore-dangle */
import NavigatorView from '@/containers/NavigatorView';
import { checkEmpty } from '@/utils/commonFunctions';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import PropTypes from 'prop-types';
import Spinner from 'react-native-loading-spinner-overlay';
import * as Progress from 'react-native-progress';
import { sessionService } from 'redux-react-native-session';
import RenderDrawer from './DrawerNavigation';

const Drawer = createDrawerNavigator();

export default class App extends React.PureComponent {
  componentDidMount() {
    this.unsubscribe = auth().onAuthStateChanged(this.onAuthStateChanged);
  }

  componentWillUnmount() {
    if (this.subscriber) {
      this.unsubscribe();
    }
  }

  onAuthStateChanged = async (user) => {
    if (!checkEmpty(user) && !checkEmpty(user._user)) {
      const storedUser = await firestore()
        .collection('users')
        .doc(user?._user?.uid)
        .get();
      if (storedUser?.data() && storedUser?.data()?.user_type) {
        await sessionService.saveSession(storedUser?.data());
        await sessionService.saveUser(storedUser?.data());
      } else {
        await firestore()
          .collection('users')
          .doc(user?._user.uid)
          .set({ ...user?._user, user_type: 1 });
        await sessionService.saveSession({ ...user?._user, user_type: 1 });
        await sessionService.saveUser({ ...user?._user, user_type: 1 });
      }
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
