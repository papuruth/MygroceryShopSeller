import React from 'react';
import { StyleSheet, Text, View, SafeAreaView,ImageBackground } from 'react-native';
import { Card, Divider, IconButton } from 'react-native-paper';
import { Icon } from 'react-native-elements';
import PropTypes, { element } from 'prop-types';
import { ScrollView } from 'react-native-gesture-handler';
import { colors, fonts } from '../../styles';
import APP_CONSTANTS from '../../utils/appConstants/AppConstants';
import { getBookingDetails } from '../../redux/user/userAction';
import { checkEmpty } from '../../utils/commonFunctions';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 10,
  },
  containers: {
    flex: 1,
    backgroundColor: colors.white,
    paddingTop: 0,
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
    // padding: 5,
    flexDirection: 'column',
    width: '100%',
    marginBottom: 15,
  },
  contentContainer: {
    display: 'flex',
    padding: 5,
    flexDirection: 'row',
    justifyContent: 'space-between'
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
    this.state = {
    };
     this.fetchBookings()
  }

  fetchBookings = () => {
    const { dispatch } = this.props;
    dispatch(getBookingDetails())
  }

  render() {
    const { bookingDetails } = this.props
    const { IMAGES: { background } } = APP_CONSTANTS
     console.log("bookingDetails123", bookingDetails)

    return (
      <ImageBackground source={background} style={styles.containers}>
        <SafeAreaView style={styles.container}>
          <ScrollView>
            {checkEmpty(bookingDetails) ? (
              <SafeAreaView>
                <Icon name="gears" type="font-awesome" size={150} color="#00000666" />

                <View style={styles.textContainer}>
                  <Text style={styles.availableText}>No Booking Completed</Text>
                </View>
              </SafeAreaView>
        )
          : (
            bookingDetails.map((ele) => (
                ele.status === "Completed" && 
             (
               <Card style={styles.bookingCard}>
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
)
            )
            )
          )}
          </ScrollView>
        </SafeAreaView>
      </ImageBackground>

    )
  }
}

CompleteBooking.propTypes = {
  dispatch: PropTypes.func.isRequired,
  bookingDetails: PropTypes.oneOfType([PropTypes.object]).isRequired
};
