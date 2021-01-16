import { colors } from '@/styles';
import styled from 'styled-components/native';
import { TextInput } from 'react-native-paper';

export const StyledContainer = styled.View`
  align-items: center;
  width: 100%;
  height: 100%;
`;

export const StyledTitle = styled.Text`
  color: ${colors.primaryLight};
  font-size: 24px;
`;

export const CategoryImageContainer = styled.View`
  align-items: center;
`;

export const StyledTextInput = styled(TextInput)`
  margin: 25px 0px;
  background-color: transparent;
`;

export const CategoryForm = styled.View`
  width: 100%;
  margin-top: 20px;
  height: 100%;
`;

export const ProgressBarContainer = styled.View`
  margin: 10px 0px;
`;
