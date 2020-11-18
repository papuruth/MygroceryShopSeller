import { checkEmpty } from '@/utils/commonFunctions';
import { Text } from '@/utils/reusableComponents/StyledText';
import React from 'react';
import { Alert, ImageBackground, Pressable, View } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Animated, AnimatedRegion, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { IconButton } from 'react-native-paper';
import { openSettings, PERMISSIONS, request } from 'react-native-permissions';
import APP_CONSTANTS from '../../utils/appConstants/AppConstants';
import { styles } from './styles';

export default class MapScreen extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      mapRegion: {},
      markerCoordinate: null,
      myLocation: {},
      searchText: '',
    };
  }

  componentDidMount() {
    Geolocation.getCurrentPosition(
      (position) => {
        const { coords } = position;
        this.setState({
          myLocation: {
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
            latitude: coords.latitude,
            longitude: coords.longitude,
          },
          mapRegion: {
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
            latitude: coords.latitude,
            longitude: coords.longitude,
          },
          markerCoordinate: new AnimatedRegion({
            latitude: coords.latitude,
            longitude: coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }),
        });
      },
      (error) => {
        if (error?.code === 1) {
          request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION).then((result) => {
            console.log(result);
            if (result === 'blocked') {
              Alert.alert(
                'Pario Foods',
                'Location permission denied. Would you like to open settings to grant the permission?',
                [
                  {
                    text: 'Cancel',
                    onPress: () => {},
                    style: 'cancel',
                  },
                  {
                    text: 'OK',
                    onPress: () => openSettings().catch((err) => console.log(err)),
                  },
                ],
              );
            }
          });
        }
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
    );
  }

  resetLocation = () => {
    const { myLocation } = this.state;
    this.mapRef.fitToCoordinates([{ ...myLocation }], {
      animated: true,
    });
  };

  render() {
    const {
      IMAGES: { background },
    } = APP_CONSTANTS;
    const { mapRegion, markerCoordinate, searchText } = this.state;
    return (
      <ImageBackground source={background} style={styles.container}>
        <View style={styles.mapContainer}>
          {!checkEmpty(mapRegion) && markerCoordinate && (
            <>
              <Animated
                provider={PROVIDER_GOOGLE}
                style={styles.maps}
                ref={(map) => {
                  this.mapRef = map;
                }}
                initialRegion={mapRegion}
              >
                <Marker.Animated coordinate={markerCoordinate} title="You" />
              </Animated>
              <View style={styles.mapAction}>
                <Pressable
                  onPress={this.resetLocation}
                  android_ripple={{ color: '#dbdbdb', radius: 360 }}
                >
                  <IconButton icon="crosshairs-gps" style={styles.gpsIcon} color="#000" size={40} />
                </Pressable>
              </View>
            </>
          )}
        </View>
        <View style={styles.locationAction}>
          {/* <TextInput
            placeholder="Search places"
            mode="outlined"
            onChangeText={(text) => {
              this.setState({ searchText: text });
            }}
          /> */}
          <GooglePlacesAutocomplete
            placeholder="Search"
            onPress={(data, details = null) => {
              console.log(data, details);
            }}
            returnKeyType="Search"
            fetchDetails
            GooglePlacesSearchQuery={{
              rankby: 'distance',
            }}
            GooglePlacesDetailsQuery={{
              fields: 'formatted_address',
            }}
            query={{
              key: 'AIzaSyCS2Kb9yKqUCSXkFnQR2Kwdz0FWANTvTBE',
              type: 'address',
              origin: null,
              language: 'en',
            }}
            currentLocation
            currentLocationLabel="Current location"
          />
          <Text>{searchText}</Text>
        </View>
      </ImageBackground>
    );
  }
}
