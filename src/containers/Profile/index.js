import { connect } from 'react-redux';
import Profile from '../../components/Profile';

const mapStateToProps = (state) => {
  const { user } = state.session;
  const {
    userDetails,
    locations,
    userProfileUpdateStatus,
    userProfileUpdateError,
    updateAddress,
    addAddress,
    updateAddressError,
    addAddressError,
    occupations,
  } = state.userReducer;
  return {
    user,
    userDetails,
    locations,
    userProfileUpdateStatus,
    userProfileUpdateError,
    updateAddress,
    addAddress,
    updateAddressError,
    addAddressError,
    occupations
  };
};

export default connect(mapStateToProps)(Profile);
