import NavigatorView from '@/routes/RootNavigation';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  const { authenticated } = state.session;
  return {
    authenticated,
  };
};

export default connect(mapStateToProps)(NavigatorView);
