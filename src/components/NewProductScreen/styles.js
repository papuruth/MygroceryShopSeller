import { colors } from '@/styles';
import styled from 'styled-components/native';
import { Avatar, TextInput } from 'react-native-paper';

export const StyledContainer = styled.View`
  align-items: center;
  color: ${colors.primary};
  justify-content: center;
  height: auto;
  width: 100%;
`;

export const StyledTitle = styled.Text`
  color: ${colors.primaryLight};
  font-size: 20px;
  background: #000;
  text-align: center;
  margin-bottom: 10px;
`;

export const ProductForm = styled.View`
  width: 100%;
`;

export const StyledTextInput = styled(TextInput)`
  margin: 10px 0px;
  background: transparent;
`;

export const ProductImageContainer = styled.View`
  align-items: center;
`;
export const StyledProductAvatar = styled(Avatar.Icon)``;

export const ProgressBarContainer = styled.View`
  margin: 10px 0px;
`;
