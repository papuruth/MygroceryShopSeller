import { connect } from 'react-redux';
import Profile from '../../components/Profile';

const mapStateToProps = (state) => {
  const { user } = state.session;
  const { userDetails, locations } = state.userReducer;
  return { user, userDetails, locations };
};

export default connect(mapStateToProps)(Profile);
