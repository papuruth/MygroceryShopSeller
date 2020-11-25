import AddProductScreen from '@/containers/AddProductScreen';
import PropTypes from 'prop-types';
import React from 'react';
import { ImageBackground } from 'react-native';
import { ButtonGroup } from 'react-native-elements';
import APP_CONSTANTS from '../../utils/appConstants/AppConstants';
import CategoriesScreen from '../CategoriesScreen';
import { ComponentContainer, HomeContainer, styles, TabsContainer } from './styles';

export default class HomeScreen extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      selectedIndex: 0,
    };
  }

  render() {
    const { user } = this.props;
    const {
      IMAGES: { background },
    } = APP_CONSTANTS;
    const { selectedIndex } = this.state;
    const components = ['Add New Categories', 'Add New Products'];
    return (
      <ImageBackground source={background} style={styles.container}>
        <HomeContainer>
          <TabsContainer>
            <ButtonGroup
              buttons={components}
              selectedIndex={selectedIndex}
              onPress={(index) => this.setState({ selectedIndex: index })}
              containerStyle={{ height: 50 }}
            />
          </TabsContainer>
          <ComponentContainer style={styles.textContainer}>
            {selectedIndex === 0 ? (
              <CategoriesScreen user={user} />
            ) : (
              <AddProductScreen user={user} />
            )}
          </ComponentContainer>
        </HomeContainer>
      </ImageBackground>
    );
  }
}

HomeScreen.propTypes = {
  user: PropTypes.oneOfType([PropTypes.object]).isRequired,
};
