import ProductDetailsScreen from '@/components/ProductDetailsScreen';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  const { user } = state.session;
  const { productDetails } = state.productReducer;
  return { user, productDetails };
};

export default connect(mapStateToProps)(ProductDetailsScreen);
