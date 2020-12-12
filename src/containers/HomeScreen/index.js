import { connect } from 'react-redux';
import HomeScreen from '@/components/HomeScreen';

const mapStateToProps = (state) => {
  const { user, authenticated } = state.session;
  const { serverIsWake } = state.notificationReducer;
  return {
    user,
    serverIsWake,
    authenticated,
  };
};

export default connect(mapStateToProps)(HomeScreen);
