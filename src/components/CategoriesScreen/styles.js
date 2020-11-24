import { colors } from '@/styles';
import styled from 'styled-components/native';
import { TextInput } from 'react-native-paper';

export const StyledContainer = styled.View`
  align-items: center;
  color: ${colors.primary};
  justify-content: center;
  margin-top: 10px;
  height: auto;
  width: 100%;
`;

export const StyledTitle = styled.Text`
  color: ${colors.primaryLight};
  font-size: 24px;
`;

export const StyledTextInput = styled(TextInput)`
  margin: 25px 0px;
`;

export const CategoryForm = styled.View`
  width: 100%;
`;
