import { createDrawerNavigator } from '@react-navigation/drawer';
import PropTypes from 'prop-types';
import React from 'react';
import Spinner from 'react-native-loading-spinner-overlay';
import * as Progress from 'react-native-progress';
import RenderDrawer from './DrawerNavigation';
import NavigatorView from './RootNavigation';
import { checkAuthAction } from '../redux/user/userAction';
import { loaderStartAction } from '../redux/loaderService/LoaderAction';

const Drawer = createDrawerNavigator();

export default class App extends React.PureComponent {
  componentDidMount() {
    const { dispatch, authenticated } = this.props;
    if (authenticated) {
      dispatch(loaderStartAction());
      dispatch(checkAuthAction());
    }
  }

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
          drawerContent={(props) => (
            <RenderDrawer
              {...props}
              authenticated={authenticated}
              user={user}
              dispatch={dispatch}
            />
          )}
        >
          <Drawer.Screen name="Homes" component={NavigatorView} />
        </Drawer.Navigator>
      </>
    );
  }
}

App.propTypes = {
  loaderService: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
  authenticated: PropTypes.bool.isRequired,
  user: PropTypes.oneOfType([PropTypes.object]).isRequired,
};
