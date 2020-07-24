import HomeScreen from '../components/home/HomeViewContainer';
import BookingScreen from '../components/availableInFullVersion/AvailableInFullVersionViewContainer'
import APP_CONSTANTS from '../utils/appConstants/AppConstants';

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
    component: BookingScreen,
    icon: iconBooking 
  }
];

export default tabNavigationData;
