import { connect } from 'react-redux';
import Profile from '../../components/Profile';

const mapStateToProps = (state) => {
  console.log(state)
  const { user } = state.session;
  const { userDetails } = state.userReducer;
  return { user, userDetails };
};

export default connect(mapStateToProps)(Profile);
