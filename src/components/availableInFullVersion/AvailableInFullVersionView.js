import React from 'react';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import { Icon } from 'react-native-elements';
import PropTypes from 'prop-types';
import { colors, fonts } from '../../styles';
import APP_CONSTANTS from '../../utils/appConstants/AppConstants';
import { Button } from '../../utils/reusableComponents';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingVertical: 50,
    justifyContent: 'space-around',
  },
  availableText: {
    color: colors.white,
    fontFamily: fonts.primaryRegular,
    fontSize: 40,
    marginVertical: 3,
  },
  textContainer: {
    alignItems: 'center',
  },
  buttonsContainer: {
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  button: {
    alignSelf: 'stretch',
    marginBottom: 20,
  },
});

export default function AvailableInFullVersionScreen({ navigation }) {
  const {
    IMAGES: { background },
  } = APP_CONSTANTS;

  return (
    <ImageBackground source={background} style={styles.container}>
      <Icon name="gears" type="font-awesome" size={150} color="#00000666" />

      <View style={styles.textContainer}>
        <Text style={styles.availableText}>Currently</Text>
        <Text style={styles.availableText}>in</Text>
        <Text style={styles.availableText}>Development</Text>
      </View>

      <View style={styles.buttonsContainer}>
        <Button
          large
          bordered
          rounded
          style={styles.button}
          caption="Home"
          onPress={() => navigation.goBack()}
        />
      </View>
    </ImageBackground>
  );
}

AvailableInFullVersionScreen.propTypes = {
  navigation: PropTypes.oneOfType([PropTypes.object]).isRequired,
};
