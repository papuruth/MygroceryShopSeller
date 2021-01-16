import { colors } from '@/styles';
import { Avatar, TextInput } from 'react-native-paper';
import styled from 'styled-components/native';

export const StyledContainer = styled.View`
  align-items: center;
  width: 100%;
  height: 100%;
`;

export const StyledTitle = styled.Text`
  color: ${(props) => (props?.color ? props?.color : colors.white)};
  font-size: 20px;
  background: ${(props) => (props?.bgColor ? props?.bgColor : '#000')};
  text-align: center;
  margin-bottom: 10px;
`;

export const ProductForm = styled.View`
  width: 100%;
  height: 100%;
`;

export const StyledTextInput = styled(TextInput)`
  margin: 10px 0px;
  background: transparent;
`;

export const ProductImageContainer = styled.View`
  align-items: center;
  margin-top: 20px;
`;
export const StyledProductAvatar = styled(Avatar.Icon)``;

export const ProgressBarContainer = styled.View`
  margin: 10px 0px;
`;
