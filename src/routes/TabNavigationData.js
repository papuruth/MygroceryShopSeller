import HomeScreen from '../components/home/HomeViewContainer';
import APP_CONSTANTS from '../utils/appConstants/AppConstants';
import {CompleteBooking} from '../components/booking/bookingContainer';

const {
  IMAGES: { iconHome,iconBooking },
} = APP_CONSTANTS;
const tabNavigationData = [
  {
    name: 'Home',
    component: HomeScreen,
    icon: iconHome,
  },
  {
    name: 'Bookings',
    component: CompleteBooking,
    icon: iconBooking 
  }
];

export default tabNavigationData;
