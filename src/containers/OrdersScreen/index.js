import OrdersScreen from '@/components/OrdersScreen';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  const { myOrders } = state.userReducer;
  const { user } = state.session;
  return {
    myOrders,
    user,
  };
};

export default connect(mapStateToProps)(OrdersScreen);
