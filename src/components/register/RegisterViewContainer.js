import { connect } from 'react-redux';
import RegisterScreen from './index';

const mapStateToProps = (state) => {
  const { locations, signUpError, signUpStatus } = state.userReducer;
  return {
    locations,
    signUpError,
    signUpStatus,
  };
};

export default connect(mapStateToProps)(RegisterScreen);
