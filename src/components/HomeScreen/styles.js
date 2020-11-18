import { StyleSheet } from 'react-native';
import { colors, fonts } from '../../styles';

export const styles = StyleSheet.create({
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
  },
  maps: {
    ...StyleSheet.absoluteFillObject,
  },
  mapContainer: {
    flex: 1,
    height: 500,
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  mapAction: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  gpsIcon: {
    backgroundColor: colors.LIGHTERGRAY,
  },
  locationAction: {
    marginTop: 20,
    flex: 1,
    padding: 10,
  },
});
