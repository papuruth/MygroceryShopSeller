import { connect } from 'react-redux';
import HomeScreen from './HomeView';

const mapStateToProps = state => {
    const { user,authenticated } = state.session
   return{
     user,
     authenticated
   }
};

export default connect(mapStateToProps)(HomeScreen);
