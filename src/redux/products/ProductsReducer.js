import { PRODUCTS_CONSTANTS } from './ProductConstants';

const initialState = {
  categories: [],
  categoriesError: {},
  products: [],
  productsError: {},
  productDetails: {},
};

export default function productReducer(state = initialState, action) {
  switch (action.type) {
    case PRODUCTS_CONSTANTS.FETCH_CATEGORIES_REQUEST:
      return {
        ...state,
        categories: [],
        categoriesError: {},
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
    case PRODUCTS_CONSTANTS.FETCH_PRODUCTS_REQUEST:
      return {
        ...state,
        products: [],
        productsError: {},
      };
    case PRODUCTS_CONSTANTS.FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: action.payload.data,
      };
    case PRODUCTS_CONSTANTS.FETCH_PRODUCTS_FAILURE:
      return {
        ...state,
        products: [],
        productsError: action.error,
      };
    case PRODUCTS_CONSTANTS.FETCH_PRODUCT_DETAILS_SUCCESS:
      return {
        ...state,
        productDetails: action.payload.data,
      };
    case PRODUCTS_CONSTANTS.FETCH_PRODUCT_DETAILS_FAILURE:
      return {
        ...state,
        productDetails: {},
      };
    default:
      return { ...state };
  }
}
