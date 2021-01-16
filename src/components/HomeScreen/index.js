import AddProductScreen from '@/containers/AddProductScreen';
import { wakeNotificationServerAction } from '@/redux/notifications/NotificationActions';
import PropTypes from 'prop-types';
import React from 'react';
import { ScrollView } from 'react-native';
import { ButtonGroup } from 'react-native-elements';
import APP_CONSTANTS from '../../utils/appConstants/AppConstants';
import CategoriesScreen from '../CategoriesScreen';
import { ComponentContainer, HomeContainer, TabsContainer } from './styles';

export default class HomeScreen extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      selectedIndex: 0,
    };
  }

  componentDidMount() {
    const { dispatch, serverIsWake } = this.props;
    if (!serverIsWake) dispatch(wakeNotificationServerAction());
  }

  render() {
    const { user } = this.props;
    const {
      IMAGES: { background },
    } = APP_CONSTANTS;
    const { selectedIndex } = this.state;
    const components = ['Add New Categories', 'Add New Products'];
    return (
      <HomeContainer source={background}>
        <TabsContainer>
          <ButtonGroup
            buttons={components}
            selectedIndex={selectedIndex}
            onPress={(index) => this.setState({ selectedIndex: index })}
            containerStyle={{ height: 50 }}
          />
        </TabsContainer>
        <ScrollView style={{ height: '100%', width: '100%', marginBottom: 10 }}>
          <ComponentContainer>
            {selectedIndex === 0 ? (
              <CategoriesScreen user={user} />
            ) : (
              <AddProductScreen user={user} />
            )}
          </ComponentContainer>
        </ScrollView>
      </HomeContainer>
    );
  }
}

HomeScreen.propTypes = {
  user: PropTypes.oneOfType([PropTypes.object]).isRequired,
  dispatch: PropTypes.func.isRequired,
  serverIsWake: PropTypes.bool.isRequired,
};
