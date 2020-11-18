import { connect } from 'react-redux';
import EditAddress from '../../components/Profile/EditAddress';

const mapStateToProps = (state) => {
  const {
    updateAddress,
    updateAddressError,
    addressData,
    addAddress,
    addAddressError,
    addressDeleteStatus,
    addressDeleteError,
  } = state.userReducer;
  const { user } = state.session;
  return {
    updateAddress,
    updateAddressError,
    addressData,
    user,
    addAddress,
    addAddressError,
    addressDeleteStatus,
    addressDeleteError,
  };
};

export default connect(mapStateToProps)(EditAddress);
