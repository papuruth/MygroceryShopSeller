import { connect } from 'react-redux';
import Booking from './employeeBooking';

const mapStateToProps = state => {
   const { bookingDetails } = state.userReducer
   return{
      bookingDetails
   }
};

export default connect(mapStateToProps)(Booking);