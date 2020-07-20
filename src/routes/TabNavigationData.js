import HomeScreen from '../components/home/HomeViewContainer';
import APP_CONSTANTS from '../utils/appConstants/AppConstants';

const {
  IMAGES: { iconHome },
} = APP_CONSTANTS;
const tabNavigationData = [
  {
    name: 'Home',
    component: HomeScreen,
    icon: iconHome,
  },
];

export default tabNavigationData;
