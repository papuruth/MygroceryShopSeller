import { colors, metrics } from '@/styles';
import { Caption } from '@/utils/reusableComponents/StyledText';
import { ImageBackground, StyleSheet } from 'react-native';
import styled from 'styled-components/native';

export const styles = StyleSheet.create({
  editBasicProfileContainer: {
    flexDirection: 'column',
    height: metrics.screenWidth > 400 ? 'auto' : 350,
  },
  editImageContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  inputFiledsContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  inputFields: {
    marginVertical: 5,
    backgroundColor: 'transparent',
  },
  progressBarContainer: {
    marginTop: 20,
  },
  editProductButton: {
    marginLeft: 5,
    marginRight: 5,
  },
});
const CommonContainer = styled.View`
  width: 100%;
`;
export const StyledContainer = styled(ImageBackground)`
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 10px;
`;

export const ProductDetailsContainer = styled.SafeAreaView`
  width: 100%;
`;

export const ScrollContainer = styled.ScrollView``;

export const StyledTitle = styled.Text`
  color: ${colors.white};
  font-size: ${(props) => (props.size ? props.size : 20)}px;
  font-weight: 600;
`;

export const StyledSubtitle = styled(Caption)`
  font-size: 16px;
`;

export const ProductImageContainer = styled(CommonContainer)`
  margin: 5px;
  height: 250px;
  align-items: center;
  justify-content: center;
`;

export const StyledImage = styled.Image`
  height: 200px;
  width: 200px;
`;

export const ProductDetailsContent = styled(CommonContainer)`
  flex-direction: row;
  align-items: flex-end;
  margin-bottom: 10px;
  padding: 10px 0px;
  width: 100%;
  justify-content: space-between;
`;

export const ProductDetailsRight = styled.View`
  align-items: flex-start;
  justify-content: flex-end;
`;
export const ProductDetailsLeft = styled.View`
  justify-content: space-evenly;
  align-items: flex-start;
`;

export const ProductExtraDetails = styled(CommonContainer)`
  align-items: center;
  border-color: #000;
`;

export const ProductDetailsAction = styled(CommonContainer)`
  align-items: center;
  justify-content: flex-end;
  flex-direction: row;
`;
