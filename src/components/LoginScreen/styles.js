import { colors } from '@/styles';
import { TextInput } from 'react-native-paper';
import styled from 'styled-components/native';

export const StyledContainer = styled.ImageBackground`
  align-items: center;
  background-color: ${colors.white};
  width: 100%;
  flex: 1;
  height: 100%;
  padding-top: 0;
`;

export const StyledTitle = styled.Text`
  color: ${(props) => props.color || colors.black};
  font-size: ${(props) => props.fontSize || 24}px;
  text-decoration: ${(props) => (props.decoration ? props.decoration : 'none')};
`;

export const AuthLogoView = styled.View`
  align-items: center;
`;

export const AuthLogo = styled.Image`
  height: 150px;
  width: 200px;
`;

export const AuthFormView = styled.View`
  padding: 20px;
  flex: 1;
  margin-top: 50px;
  width: 100%;
`;

export const AuthFormFields = styled(TextInput)`
  background-color: transparent;
`;

export const AuthPrivacyView = styled.View`
  position: absolute;
  bottom: 20px;
  margin: auto;
  justify-content: center;
  align-items: center;
`;

export const AuthPrivacyLink = styled.View`
  align-items: center;
  flex-direction: row;
  padding: 0px 20px;
  width: 90%;
  justify-content: space-between;
`;

export const ResendOTPView = styled.View`
  width: 100%;
  margin-top: 20px;
  align-items: center;
`;
