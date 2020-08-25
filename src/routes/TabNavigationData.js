import HomeScreen from '../components/home/HomeViewContainer';
import APP_CONSTANTS from '../utils/appConstants/AppConstants';
import {CompleteBooking} from '../components/booking/bookingContainer';

const {
  IMAGES: { iconTabHome,iconTabBooking },
} = APP_CONSTANTS;
const tabNavigationData = [
  {
    name: 'Home',
    component: HomeScreen,
    icon: iconTabHome,
  },
  {
    name: 'Bookings',
    component: CompleteBooking,
    icon: iconTabBooking 
  }
];

export default tabNavigationData;
