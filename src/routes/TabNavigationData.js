import HomeScreen from '@/containers/HomeScreen';
import APP_CONSTANTS from '../utils/appConstants/AppConstants';

const {
  IMAGES: { iconTabHome },
} = APP_CONSTANTS;
const tabNavigationData = [
  {
    name: 'Home',
    component: HomeScreen,
    icon: iconTabHome,
  },
];

export default tabNavigationData;
