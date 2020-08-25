import PropTypes from 'prop-types';
import React from 'react';
import { ImageBackground, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import { Card, Divider } from 'react-native-paper';
import { getBookingDetails } from '../../redux/user/userAction';
import { colors, fonts } from '../../styles';
import APP_CONSTANTS from '../../utils/appConstants/AppConstants';
import { checkEmpty } from '../../utils/commonFunctions';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '100%',
    flex: 1,
    flexDirection: "column"
  },
  scrollContainer: {
    padding: 10,
    alignItems: 'center',
    width: '100%',
    flex: 1,
    flexDirection: "column"
  },
  bgStyle: {
    flex: 1,
    height: '100%',
    width: '100%',
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
  bookingCard: {
    maxHeight: 200,
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    backgroundColor: colors.WHITE,
    marginBottom: 15,
  },
  contentContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dividerStyle: {
    height: 1,
    backgroundColor: colors.grey,
  },
  bookingInfo: {
    margin: 5,
    display: 'flex',
    flexDirection: 'row',
  },
  label: {
    marginRight: 5,
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default class CompleteBooking extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
    this.fetchBookings();
  }

  fetchBookings = () => {
    const { dispatch } = this.props;
    dispatch(getBookingDetails());
  };

  render() {
    const { bookingDetails } = this.props;
    const {
      IMAGES: { background },
    } = APP_CONSTANTS;
    console.log('bookingDetails123', bookingDetails);

    return (
      <SafeAreaView style={styles.container}>
        <ImageBackground source={background} resizeMode="cover" style={styles.bgStyle}>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            {checkEmpty(bookingDetails) ? (
              <SafeAreaView>
                <Icon name="gears" type="font-awesome" size={150} color="#00000666" />

                <View style={styles.textContainer}>
                  <Text style={styles.availableText}>No Booking Completed</Text>
                </View>
              </SafeAreaView>
            ) : (
              bookingDetails.map(
                (ele) =>
                  ele.status === 'Completed' && (
                    <Card style={styles.bookingCard} key={ele?.bookingId}>
                      <Card.Title title="Requirement" />
                      <Divider style={styles.dividerStyle} />
                      <View style={styles.contentContainer}>
                        <Card.Content style={styles.cardContent}>
                          <View style={styles.bookingInfo}>
                            <Text style={styles.label}>Booking From:</Text>
                            <Text style={styles.textContent}>{ele?.bookingFrom}</Text>
                          </View>
                          <View style={styles.bookingInfo}>
                            <Text style={styles.label}>Booking To:</Text>
                            <Text style={styles.textContent}>{ele?.bookingTo}</Text>
                          </View>
                          <View style={styles.bookingInfo}>
                            <Text style={styles.label}>Days Worked:</Text>
                            <Text style={styles.textContent}>{ele?.daysWorked}</Text>
                          </View>
                          <View style={styles.bookingInfo}>
                            <Text style={styles.label}>Status:</Text>
                            <Text style={styles.textContent}>{ele?.status}</Text>
                          </View>
                        </Card.Content>
                        <Card.Content style={styles.cardContent}>
                          <View style={styles.bookingUserInfo}>
                            <Text style={styles.label}>Order By:</Text>
                            <Text style={styles.textContent}>{ele?.user.name}</Text>
                          </View>
                          <View style={styles.bookingUserInfo}>
                            <Text style={styles.label}>Contact no.</Text>
                            <Text style={styles.textContent}>{ele?.user.phone}</Text>
                          </View>
                          <View style={styles.bookingUserInfo}>
                            <Text style={styles.label}>Address:</Text>
                            <Text style={styles.textContent}>{ele?.user.address}</Text>
                          </View>
                        </Card.Content>
                      </View>
                    </Card>
                  ),
              )
            )}
          </ScrollView>
        </ImageBackground>
      </SafeAreaView>
    );
  }
}

CompleteBooking.propTypes = {
  dispatch: PropTypes.func.isRequired,
  bookingDetails: PropTypes.oneOfType([PropTypes.array]).isRequired,
};
