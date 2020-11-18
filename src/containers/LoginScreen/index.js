import LoginScreen from '@/components/LoginScreen';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  const { otpSentStatus, otpConfirm, otpSentError } = state.userReducer;
  return {
    otpSentStatus,
    otpConfirm,
    otpSentError,
  };
};

export default connect(mapStateToProps)(LoginScreen);
