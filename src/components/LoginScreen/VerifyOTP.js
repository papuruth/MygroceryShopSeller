/* eslint-disable no-underscore-dangle */
import { loaderStartAction, loaderStopAction } from '@/redux/loaderService/LoaderAction';
import { sendOTPAction } from '@/redux/user/userAction';
import { colors } from '@/styles';
import APP_CONSTANTS from '@/utils/appConstants/AppConstants';
import { checkEmpty, equalityChecker } from '@/utils/commonFunctions';
import { Button } from '@/utils/reusableComponents';
import React from 'react';
import { Pressable } from 'react-native';
import PropTypes from 'prop-types';
import { sessionService } from 'redux-react-native-session';
import auth from '@react-native-firebase/auth';
import {
  AuthFormFields,
  AuthFormView,
  AuthLogo,
  AuthLogoView,
  AuthPrivacyLink,
  AuthPrivacyView,
  ResendOTPView,
  StyledContainer,
  StyledTitle,
} from './styles';

export default class VerifyOTP extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      otp: null,
      resendOTP: false,
      timer: 30,
      showTimer: true,
    };
  }

  componentDidMount() {
    this.unsubscribe = auth().onAuthStateChanged(this.onAuthStateChanged);
    this.startResendOtpTimer();
  }

  componentDidUpdate(prevProps) {
    const { otpSentStatus } = this.props;
    if (!equalityChecker(otpSentStatus, prevProps.otpSentStatus) && otpSentStatus) {
      this.updateState();
    }
  }

  componentWillUnmount() {
    if (this.subscriber) {
      this.unsubscribe();
    }
  }

  updateState = () => {
    this.setState(
      {
        timer: 30,
        showTimer: true,
        resendOTP: false,
        otp: '',
      },
      this.startResendOtpTimer,
    );
  };

  onAuthStateChanged = async (user) => {
    const { dispatch } = this.props;
    if (!checkEmpty(user) && !checkEmpty(user._user)) {
      dispatch(loaderStartAction());
      await sessionService.saveSession(user._user);
      await sessionService.saveUser(user._user);
      dispatch(loaderStopAction());
    }
  };

  startResendOtpTimer = () => {
    const { timer } = this.state;
    if (timer <= 0) {
      this.setState({ resendOTP: true, showTimer: false });
    } else {
      this.setState((state) => {
        return { timer: state.timer - 1 };
      });
      setTimeout(this.startResendOtpTimer, 1500);
    }
  };

  resendOTP = () => {
    const { dispatch } = this.props;
    const { route } = this.props;
    if (!checkEmpty(route) && route?.params?.phone) {
      const { phone } = route.params;
      dispatch(loaderStartAction());
      dispatch(sendOTPAction(phone));
    }
  };

  verifyOTP = async () => {
    const { dispatch, otpConfirm } = this.props;
    try {
      const { otp } = this.state;
      dispatch(loaderStartAction());
      await otpConfirm.confirm(otp);
      dispatch(loaderStopAction());
    } catch (e) {
      console.log(e);
      dispatch(loaderStopAction());
    }
  };

  render() {
    const {
      IMAGES: { background, parisoLogo },
    } = APP_CONSTANTS;
    const { otp, resendOTP, timer, showTimer } = this.state;
    const { otpSentStatus, route } = this.props;
    return (
      <StyledContainer source={background}>
        <AuthLogoView>
          <AuthLogo source={parisoLogo} />
          <StyledTitle fontSize={13} color={colors.grey}>
            OTP has been sent to {route?.params?.phone}.
          </StyledTitle>
        </AuthLogoView>
        <AuthFormView>
          <AuthFormFields
            label="OTP"
            mode="flat"
            autoFocus
            blurOnSubmit
            onSubmitEditing={this.verifyOTP}
            keyboardType="number-pad"
            value={otp}
            onChangeText={(text) => this.setState({ otp: text })}
          />
          {otpSentStatus ? (
            <ResendOTPView>
              {otpSentStatus && resendOTP && !showTimer ? (
                <Pressable onPress={this.resendOTP} android_ripple={{ color: '#000', radius: 360 }}>
                  <StyledTitle
                    fontSize={14}
                    style={{ fontWeight: 'bold' }}
                    color={colors.yellow}
                    accessibilityRole="link"
                    decoration="underline"
                    dataDetectorType="link"
                  >
                    Resend OTP
                  </StyledTitle>
                </Pressable>
              ) : (
                <StyledTitle
                  fontSize={14}
                  style={{ fontWeight: 'bold' }}
                  color={colors.black}
                  accessibilityRole="link"
                  decoration="none"
                  dataDetectorType="link"
                >
                  Resend OTP in {timer}s
                </StyledTitle>
              )}
            </ResendOTPView>
          ) : null}
          <Button
            style={{ marginVertical: 20 }}
            bordered
            caption="Verify OTP"
            onPress={this.verifyOTP}
          />
        </AuthFormView>
        <AuthPrivacyView>
          <StyledTitle fontSize={14} color={colors.white}>
            By continuing, you agree to our
          </StyledTitle>
          <AuthPrivacyLink>
            <StyledTitle
              fontSize={14}
              color={colors.darkGray}
              accessibilityRole="link"
              decoration="underline"
              dataDetectorType="link"
            >
              Terms of Service
            </StyledTitle>
            <StyledTitle
              fontSize={14}
              color={colors.darkGray}
              accessibilityRole="link"
              decoration="underline"
              dataDetectorType="link"
            >
              Privacy Policy
            </StyledTitle>
            <StyledTitle
              fontSize={14}
              color={colors.darkGray}
              accessibilityRole="link"
              decoration="underline"
              dataDetectorType="link"
            >
              Content Policy
            </StyledTitle>
          </AuthPrivacyLink>
        </AuthPrivacyView>
      </StyledContainer>
    );
  }
}

VerifyOTP.propTypes = {
  otpSentStatus: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
  route: PropTypes.oneOfType([PropTypes.object]).isRequired,
  otpConfirm: PropTypes.oneOfType([PropTypes.object]).isRequired,
};
