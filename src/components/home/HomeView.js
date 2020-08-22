/* eslint-disable no-nested-ternary */
import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { Icon } from 'react-native-elements';
import PropTypes from 'prop-types';

import { Button } from '../../utils/reusableComponents';
import  {Booking}  from '../booking/bookingContainer';
import { Text } from '../../utils/reusableComponents/StyledText';
import { colors, fonts } from '../../styles';
import ArchitectureIcon from '../../assets/icons/construction.svg';
import CivilIcon from '../../assets/icons/worker.svg';
import CarpenterIcon from '../../assets/icons/toolbox.svg';
import MasonIcon from '../../assets/icons/mason.svg';
import ElectricianIcon from '../../assets/icons/electrician.svg';
import WelderIcon from '../../assets/icons/welder.svg';
import PlumberIcon from '../../assets/icons/pipeline.svg';
import TilesStoneIcon from '../../assets/icons/floor.svg';
import HomeDecorIcon from '../../assets/icons/furniture.svg';
import APP_CONSTANTS from '../../utils/appConstants/AppConstants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingTop: 0,
  },
  bgImage: {
    flex: 1,
    marginHorizontal: -20,
  },
  row: {
    flexDirection: 'row',
    paddingHorizontal: 25,
    marginTop: 10,
  },
  item: {
    flex: 1,
    height: 'auto',
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'space-around',
    marginHorizontal: 5,
  },
  itemText: {
    color: colors.white,
    fontFamily: fonts.primary,
    textAlign: 'center',
    height: 40,
  },
  itemImage: {
    height: 35,
  },
  availableText: {
    color: colors.white,
    fontFamily: fonts.primaryRegular,
    fontSize: 20,
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
  }

});

export default class HomeScreen extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      more: false,
    };
  }

  toggleMore = () => {
    this.setState(state => ({
      more: !state.more,
    }));
   };

   render() {
    const { more } = this.state;
    const { navigation, user, authenticated } = this.props;
    const { IMAGES: { background } } = APP_CONSTANTS
    return(
      <>
        {!authenticated   ?(
          <View style={styles.container}>
            <ImageBackground
              source={background}
              style={styles.bgImage}
              resizeMode="cover"
            >
              <View>
                <View style={styles.row}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('arch')}
                    style={styles.item}
                  >
                    <ArchitectureIcon />
                    <Text style={styles.itemText}>Architecture</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('civil')}
                    style={styles.item}
                  >
                    <CivilIcon />
                    <Text style={styles.itemText}>Civil Engineer</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('mason')}
                    style={styles.item}
                  >
                    <MasonIcon />
                    <Text style={styles.itemText}>Mason (with Labour)</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.row}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('carpenter')}
                    style={styles.item}
                  >
                    <CarpenterIcon />
                    <Text style={styles.itemText}>Carpenter</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('electrician')}
                    style={styles.item}
                  >
                    <ElectricianIcon />
                    <Text style={styles.itemText}>Electrician</Text>
                  </TouchableOpacity>
                  {!more ? (
                    <TouchableOpacity onPress={this.toggleMore} style={styles.item}>
                      <Icon
                        name="grid"
                        type="simple-line-icon"
                        color="white"
                        size={30}
                      />
                      <Text style={styles.itemText}>More</Text>
                    </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => navigation.navigate('plumber')}
                  style={styles.item}
                >
                  <PlumberIcon />
                  <Text style={styles.itemText}>Plumber</Text>
                </TouchableOpacity>
                )}
                </View>
                {more && (
                <View style={styles.row}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('painter')}
                    style={styles.item}
                  >
                    <Icon name="format-paint" color="white" size={30} />
                    <Text style={styles.itemText}>Painter</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('welder')}
                    style={styles.item}
                  >
                    <WelderIcon />
                    <Text style={styles.itemText}>Welder</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('tiles')}
                    style={styles.item}
                  >
                    <TilesStoneIcon />
                    <Text style={styles.itemText}>Tiles / Stone / Flooring</Text>
                  </TouchableOpacity>
                </View>
            )}
                {more && (
                <View style={styles.row}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('home-decor')}
                    style={styles.item}
                  >
                    <HomeDecorIcon />
                    <Text style={styles.itemText}>Home Decoration</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.item} />
                  <TouchableOpacity onPress={this.toggleMore} style={styles.item}>
                    <Icon
                      name="arrow-up"
                      type="simple-line-icon"
                      color="white"
                      size={28}
                    />
                    <Text style={styles.itemText}>Less</Text>
                  </TouchableOpacity>
                </View>
            )}
              </View>
            </ImageBackground>
          </View>
        ): 
         authenticated && !user.isVerified ? (
           <ImageBackground source={background} style={styles.container}>
             <Icon name="gears" type="font-awesome" size={150} color="#00000666" />

             <View style={styles.textContainer}>
               <Text style={styles.availableText}>Please</Text>
               <Text style={styles.availableText}>Complete your profile to activate your account</Text>
             </View>

             <View style={styles.buttonsContainer}>
               <Button large bordered rounded style={styles.button} caption="Go to Profile" onPress={() => navigation.navigate('profile')} />
             </View>
           </ImageBackground>
      ): (
        <ImageBackground source={background} style={styles.container}>
          <Booking />
        </ImageBackground>
        )}
      </>
    )
  }
}

HomeScreen.propTypes = {
  navigation: PropTypes.oneOfType([PropTypes.object]).isRequired,
   user: PropTypes.oneOfType([PropTypes.object]).isRequired
};
