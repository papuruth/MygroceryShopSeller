import { PRODUCTS_CONSTANTS } from './ProductConstants';

export const fetchAllCategoriesAction = (userId) => ({
  type: PRODUCTS_CONSTANTS.FETCH_CATEGORIES_REQUEST,
  payload: userId,
});

export const fetchProductsAction = (userId, category) => ({
  type: PRODUCTS_CONSTANTS.FETCH_PRODUCTS_REQUEST,
  payload: { userId, category },
});

export const fetchProductDetailsAction = (userId, productId) => ({
  type: PRODUCTS_CONSTANTS.FETCH_PRODUCT_DETAILS_REQUEST,
  payload: { userId, productId },
});
