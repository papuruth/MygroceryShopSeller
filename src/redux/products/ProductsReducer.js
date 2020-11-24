import { PRODUCTS_CONSTANTS } from './ProductConstants';

const initialState = {
  categories: [],
  categoriesError: {},
};

export default function productReducer(state = initialState, action) {
  switch (action.type) {
    case PRODUCTS_CONSTANTS.FETCH_CATEGORIES_REQUEST:
      return {
        ...state,
        categories: [],
      };
    case PRODUCTS_CONSTANTS.FETCH_CATEGORIES_SUCCESS:
      return {
        ...state,
        categories: action.payload.data,
      };
    case PRODUCTS_CONSTANTS.FETCH_CATEGORIES_FAILURE:
      return {
        ...state,
        categories: [],
        categoriesError: action.error,
      };
    default:
      return { ...state };
  }
}
