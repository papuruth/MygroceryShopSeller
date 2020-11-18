import { connect } from 'react-redux';
import VerifyOTP from '@/components/LoginScreen/VerifyOTP';

const mapStateToProps = (state) => {
  const { otpSentStatus, otpConfirm, otpSentError } = state.userReducer;
  return {
    otpSentStatus,
    otpConfirm,
    otpSentError,
  };
};

export default connect(mapStateToProps)(VerifyOTP);
