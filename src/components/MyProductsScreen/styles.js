import { colors } from '@/styles';
import { ImageBackground, FlatList } from 'react-native';
import styled from 'styled-components/native';

export const StyledContainer = styled(ImageBackground)`
  align-items: center;
  color: ${colors.white};
  height: 100%;
  padding: 10px;
  width: 100%;
`;

export const StyledTitle = styled.Text`
  color: ${colors.white};
  font-size: 18px;
`;

export const CategoriesContainer = styled.View`
  width: 100%;
`;

export const ProductsContainer = styled.View`
  width: 100%;
`;

export const StyledFlatList = styled(FlatList)``;
