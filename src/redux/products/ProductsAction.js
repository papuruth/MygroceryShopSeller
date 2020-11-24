import { PRODUCTS_CONSTANTS } from './ProductConstants';

export const fetchAllCategoriesAction = (userId) => ({
  type: PRODUCTS_CONSTANTS.FETCH_CATEGORIES_REQUEST,
  payload: userId,
});

export const addNewProductAction = (productData, userId) => ({
  type: PRODUCTS_CONSTANTS.ADD_NEW_PRODUCT_REQUEST,
  payload: { productData, userId },
});
