import { connect } from 'react-redux';
import HomeScreen from '@/components/HomeScreen';

const mapStateToProps = (state) => {
  const { user, authenticated } = state.session;
  return {
    user,
    authenticated,
  };
};

export default connect(mapStateToProps)(HomeScreen);
