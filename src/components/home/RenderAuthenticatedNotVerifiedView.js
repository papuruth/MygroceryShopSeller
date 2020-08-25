import PropTypes from 'prop-types';
import React from 'react';
import { ImageBackground, Text, View } from 'react-native';
import { Icon } from 'react-native-elements';
import APP_CONSTANTS from '../../utils/appConstants/AppConstants';
import { Button } from '../../utils/reusableComponents';
import { styles } from './styles';

export default function RenderAuthenticatedNotVerifiedView({navigation}) {
  const {
    IMAGES: { background },
  } = APP_CONSTANTS;
  return (
    <ImageBackground source={background} style={styles.container}>
      <Icon name="gears" type="font-awesome" size={150} color="#00000666" />

      <View style={styles.textContainer}>
        <Text style={styles.availableText}>Please</Text>
        <Text style={styles.availableText}>Complete your profile to activate your account</Text>
      </View>

      <View style={styles.buttonsContainer}>
        <Button
          large
          bordered
          rounded
          style={styles.button}
          caption="Go to Profile"
          onPress={() => navigation.navigate('profile')}
        />
      </View>
    </ImageBackground>
  );
}

RenderAuthenticatedNotVerifiedView.propTypes = {
  navigation: PropTypes.oneOfType([PropTypes.object]).isRequired
}