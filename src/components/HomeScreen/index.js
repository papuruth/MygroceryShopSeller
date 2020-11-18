import React from 'react';
import { ImageBackground, Text, View } from 'react-native';
import { Icon } from 'react-native-elements';
import APP_CONSTANTS from '../../utils/appConstants/AppConstants';
import { styles } from './styles';

export default class HomeScreen extends React.PureComponent {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const {
      IMAGES: { background },
    } = APP_CONSTANTS;
    return (
      <ImageBackground source={background} style={styles.container}>
        <Icon
          name="gears"
          type="font-awesome"
          size={150}
          color="#00000666"
          style={{ marginTop: 50 }}
        />
        <View style={styles.textContainer}>
          <Text style={styles.availableText}>Home Screen</Text>
        </View>
      </ImageBackground>
    );
  }
}
