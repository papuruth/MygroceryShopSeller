import React from 'react';
import { ImageBackground, StyleSheet, Text, View,SafeAreaView } from 'react-native';
import { Icon } from 'react-native-elements';
import PropTypes from 'prop-types';
import { colors, fonts } from '../../styles';
import APP_CONSTANTS from '../../utils/appConstants/AppConstants';

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
      fontSize: 20,
      marginVertical: 3,
    },
    textContainer: {
      alignItems: 'center',
    }
  });

export default class Booking extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

   render() {
    return(
      <SafeAreaView>
        <Icon name="gears" type="font-awesome" size={150} color="#00000666" />

        <View style={styles.textContainer}>
          <Text style={styles.availableText}>Currently, No Booking Available</Text>
        </View>
      </SafeAreaView>
    )
  }
}

Booking.propTypes = {
  // user: PropTypes.oneOfType([PropTypes.object]).isRequired
};
