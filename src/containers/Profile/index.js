import { connect } from 'react-redux';
import Profile from '../../components/Profile';

const mapStateToProps = (state) => {
  const { user } = state.session;
  return {
    user,
  };
};

export default connect(mapStateToProps)(Profile);
