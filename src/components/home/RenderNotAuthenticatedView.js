import PropTypes from 'prop-types';
import React from 'react';
import { ImageBackground, Text, TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-elements';
import ArchitectureIcon from '../../assets/icons/construction.svg';
import ElectricianIcon from '../../assets/icons/electrician.svg';
import TilesStoneIcon from '../../assets/icons/floor.svg';
import HomeDecorIcon from '../../assets/icons/furniture.svg';
import MasonIcon from '../../assets/icons/mason.svg';
import PlumberIcon from '../../assets/icons/pipeline.svg';
import CarpenterIcon from '../../assets/icons/toolbox.svg';
import WelderIcon from '../../assets/icons/welder.svg';
import CivilIcon from '../../assets/icons/worker.svg';
import { styles } from './styles';
import APP_CONSTANTS from '../../utils/appConstants/AppConstants';

export default function RenderNotAuthenticatedView({more, navigation, toggleMore}) {
  const {
    IMAGES: { background },
  } = APP_CONSTANTS;
  return (
    <View style={styles.container}>
      <ImageBackground source={background} style={styles.bgImage} resizeMode="cover">
        <View>
          <View style={styles.row}>
            <TouchableOpacity onPress={() => navigation.navigate('arch')} style={styles.item}>
              <ArchitectureIcon />
              <Text style={styles.itemText}>Architecture</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('civil')} style={styles.item}>
              <CivilIcon />
              <Text style={styles.itemText}>Civil Engineer</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('mason')} style={styles.item}>
              <MasonIcon />
              <Text style={styles.itemText}>Mason (with Labour)</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <TouchableOpacity onPress={() => navigation.navigate('carpenter')} style={styles.item}>
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
              <TouchableOpacity onPress={toggleMore} style={styles.item}>
                <Icon name="grid" type="simple-line-icon" color="white" size={30} />
                <Text style={styles.itemText}>More</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => navigation.navigate('plumber')} style={styles.item}>
                <PlumberIcon />
                <Text style={styles.itemText}>Plumber</Text>
              </TouchableOpacity>
            )}
          </View>
          {more && (
            <View style={styles.row}>
              <TouchableOpacity onPress={() => navigation.navigate('painter')} style={styles.item}>
                <Icon name="format-paint" color="white" size={30} />
                <Text style={styles.itemText}>Painter</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('welder')} style={styles.item}>
                <WelderIcon />
                <Text style={styles.itemText}>Welder</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('tiles')} style={styles.item}>
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
              <TouchableOpacity onPress={toggleMore} style={styles.item}>
                <Icon name="arrow-up" type="simple-line-icon" color="white" size={28} />
                <Text style={styles.itemText}>Less</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ImageBackground>
    </View>
  );
}

RenderNotAuthenticatedView.propTypes = {
  more: PropTypes.bool.isRequired,
  navigation: PropTypes.oneOfType([PropTypes.object]).isRequired,
  toggleMore: PropTypes.func.isRequired
}