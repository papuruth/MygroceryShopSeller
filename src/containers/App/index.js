import { connect } from 'react-redux';
// eslint-disable-next-line import/no-cycle
import App from '../../routes/Navigator';

const mapStateToProps = (state) => {
  const { loaderService } = state.loaderReducer;
  const { authenticated, user } = state.session;
  return {
    loaderService,
    authenticated,
    user,
  };
};

export default connect(mapStateToProps)(App);
