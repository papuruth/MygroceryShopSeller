import MyProductsScreen from '@/components/MyProductsScreen';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  const { categories, categoriesError, products, productsError } = state.productReducer;
  const { user } = state.session;
  return { categories, categoriesError, products, productsError, user };
};

export default connect(mapStateToProps)(MyProductsScreen);
