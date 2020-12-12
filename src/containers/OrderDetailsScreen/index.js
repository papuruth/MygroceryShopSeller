import OrderDetailsScreen from '@/components/OrderDetailsScreen';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  const { user } = state.session;
  return {
    user,
  };
};

export default connect(mapStateToProps)(OrderDetailsScreen);
