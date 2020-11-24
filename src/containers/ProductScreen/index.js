import NewProductScreen from '@/components/NewProductScreen';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  const { categories, categoriesError } = state.productReducer;
  return { categories, categoriesError };
};

export default connect(mapStateToProps)(NewProductScreen);
