import { connect } from 'react-redux';
import EditAddress from '../../components/Profile/EditAddress';

const mapStateToProps = (state) => {
  const { updateAddress, updateAddressError, addressData } = state.userReducer;
  return {
    updateAddress,
    updateAddressError,
    addressData,
  };
};

export default connect(mapStateToProps)(EditAddress);
