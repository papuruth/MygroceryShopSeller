import { loaderStartAction } from '@/redux/loaderService/LoaderAction';
import { sendOTPAction } from '@/redux/user/userAction';
import { colors } from '@/styles';
import PropTypes from 'prop-types';
import APP_CONSTANTS from '@/utils/appConstants/AppConstants';
import { equalityChecker } from '@/utils/commonFunctions';
import { Button } from '@/utils/reusableComponents';
import React from 'react';
import {
  AuthFormFields,
  AuthFormView,
  AuthLogo,
  AuthLogoView,
  AuthPrivacyLink,
  AuthPrivacyView,
  StyledContainer,
  StyledTitle,
} from './styles';

export default class LoginScreen extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      phone: '+91',
      formError: false,
    };
  }

  componentDidUpdate(prevProps) {
    const { otpSentStatus, navigation } = this.props;
    const { phone } = this.state;
    if (!equalityChecker(otpSentStatus, prevProps.otpSentStatus) && otpSentStatus) {
      navigation.navigate('verify-otp', { phone });
    }
  }

  sendOTP = () => {
    const { phone } = this.state;
    const { dispatch } = this.props;
    if (phone && phone.length === 13) {
      dispatch(loaderStartAction());
      dispatch(sendOTPAction(phone));
      this.setState({
        formError: false,
      });
    } else {
      this.setState({
        formError: true,
      });
    }
  };

  render() {
    const {
      IMAGES: { background, parisoLogo },
    } = APP_CONSTANTS;
    const { phone, formError } = this.state;
    return (
      <StyledContainer source={background}>
        <AuthLogoView>
          <AuthLogo source={parisoLogo} />
          <StyledTitle fontSize={24} color={colors.black}>
            Get started
          </StyledTitle>
          <StyledTitle fontSize={13} color={colors.grey}>
            Enter your phone number and we will send an &quot;OTP&quot; to continue
          </StyledTitle>
        </AuthLogoView>
        <AuthFormView>
          <AuthFormFields
            label="Mobile no."
            mode="flat"
            blurOnSubmit
            error={formError}
            autoCompleteType="tel"
            keyboardType="phone-pad"
            onSubmitEditing={this.sendOTP}
            value={phone}
            onChangeText={(text) => this.setState({ phone: text })}
          />
          <Button
            style={{ marginVertical: 20 }}
            bordered
            caption="Send OTP"
            onPress={this.sendOTP}
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

LoginScreen.propTypes = {
  otpSentStatus: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
  navigation: PropTypes.oneOfType([PropTypes.object]).isRequired,
};
