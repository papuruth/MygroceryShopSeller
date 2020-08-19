import { connect } from 'react-redux';
import Booking from './employeeBooking';
import CompleteBooking from './completedBooking';

const mapStateToProps = state => {
   const { bookingDetails } = state.userReducer
   console.log("wqrdyfuf",bookingDetails)
   return{
      bookingDetails
   }
};

const connectedBooking = connect(mapStateToProps)(Booking);
const connectedCompletedBooking = connect(mapStateToProps)(CompleteBooking);


export {
   connectedBooking as Booking,
   connectedCompletedBooking  as CompleteBooking
}