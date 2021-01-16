import MyProductsScreen from '@/components/MyProductsScreen';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  const {
    categories,
    categoriesError,
    products,
    productsError,
    lastVisible,
  } = state.productReducer;
  const { user } = state.session;
  return { categories, categoriesError, products, productsError, user, lastVisible };
};

export default connect(mapStateToProps)(MyProductsScreen);
