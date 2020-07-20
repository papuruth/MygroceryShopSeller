import { connect } from 'react-redux';
import App from '../../routes/Navigator';

const mapStateToProps = (state) => {
  const { loaderService } = state.loaderReducer;
  return {
    loaderService,
  };
};

export default connect(mapStateToProps)(App);
