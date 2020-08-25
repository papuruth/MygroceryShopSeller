/* eslint-disable no-nested-ternary */
import PropTypes from 'prop-types';
import React from 'react';
import { Booking } from '../booking/bookingContainer';
import RenderAuthenticatedNotVerifiedView from './RenderAuthenticatedNotVerifiedView';
import RenderNotAuthenticatedView from './RenderNotAuthenticatedView';

export default class HomeScreen extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      more: false,
    };
  }

  toggleMore = () => {
    this.setState((state) => ({
      more: !state.more,
    }));
  };

  render() {
    const { more } = this.state;
    const { navigation, user, authenticated } = this.props;
    console.log(this.props);
    return (
      <>
        {!authenticated && (
          <RenderNotAuthenticatedView
            more={more}
            navigation={navigation}
            toggleMore={this.toggleMore}
          />
        )}
        {authenticated && !user?.isVerified && (
          <RenderAuthenticatedNotVerifiedView navigation={navigation} />
        )}
        {authenticated && user.isVerified && <Booking />}
      </>
    );
  }
}

HomeScreen.propTypes = {
  navigation: PropTypes.oneOfType([PropTypes.object]).isRequired,
  user: PropTypes.oneOfType([PropTypes.object]).isRequired,
  authenticated: PropTypes.bool.isRequired,
};
