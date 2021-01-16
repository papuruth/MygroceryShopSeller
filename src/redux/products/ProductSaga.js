import firestore from '@react-native-firebase/firestore';

const { checkEmpty } = require('@/utils/commonFunctions');
const { call, put, takeEvery } = require('redux-saga/effects');
const { LOADER_CONSTANTS } = require('../loaderService/LoaderConstants');
const { PRODUCTS_CONSTANTS } = require('./ProductConstants');

const success = (type, payload) => ({
  type,
  payload,
});

const failure = (type, error) => ({
  type,
  error,
});

const fetchAllCategoriesService = async (userId) => {
  try {
    const response = await firestore()
      .collection('categories')
      .get();
    const docSnapShot = response.docs;
    const allCategories = docSnapShot.map((doc) => doc.data());
    const myCategories = !checkEmpty(allCategories)
      ? allCategories.filter((item) => item.userId === userId)
      : [];
    return {
      response: {
        data: myCategories,
        status: true,
        message: 'success',
      },
    };
  } catch (error) {
    console.log(error);
    return {
      response: {
        data: {},
        status: false,
        message: error?.message,
      },
    };
  }
};

function* fetchAllCategoriesSaga(action) {
  const { response, error } = yield call(fetchAllCategoriesService, action.payload);
  if (!checkEmpty(response) && response?.status) {
    yield put(yield call(success, PRODUCTS_CONSTANTS.FETCH_CATEGORIES_SUCCESS, response));
    yield put({ type: LOADER_CONSTANTS.LOADER_STOP_REQUEST });
  } else {
    yield put(yield call(failure, PRODUCTS_CONSTANTS.FETCH_CATEGORIES_FAILURE, error));
    yield put({ type: LOADER_CONSTANTS.LOADER_STOP_REQUEST });
  }
}

export function* fetchAllCategoriesWatcherSaga() {
  yield takeEvery(PRODUCTS_CONSTANTS.FETCH_CATEGORIES_REQUEST, fetchAllCategoriesSaga);
}

const fetchProductsService = async ({ userId, category, lastVisible }) => {
  try {
    if (!lastVisible) {
      const first = firestore()
        .collection('products')
        .limit(10);
      const docSnapShot = await first.get();
      const last = docSnapShot.docs[docSnapShot.docs.length - 1];
      const allProducts = docSnapShot.docs.map((doc) => doc.data());
      const filteredProducts = !checkEmpty(allProducts)
        ? allProducts.filter((item) => item?.category === category && item.userId === userId)
        : [];
      return {
        response: {
          data: { products: filteredProducts, lastVisible: last },
          status: true,
          message: 'success',
        },
      };
    }
    const next = firestore()
      .collection('products')
      .startAfter(lastVisible)
      .limit(10);
    const docSnapShot = await next.get();
    const last = docSnapShot.docs[docSnapShot.docs.length - 1];
    const allProducts = docSnapShot.docs.map((doc) => doc.data());
    const filteredProducts = !checkEmpty(allProducts)
      ? allProducts.filter((item) => item?.category === category && item.userId === userId)
      : [];
    return {
      response: {
        data: { products: filteredProducts, lastVisible: last },
        status: true,
        message: 'success',
      },
    };
  } catch (error) {
    console.log(error);
    return {
      response: {
        data: {},
        status: false,
        message: error?.message,
      },
    };
  }
};

function* fetchProductsSaga(action) {
  const { response, error } = yield call(fetchProductsService, action.payload);
  if (!checkEmpty(response) && response?.status) {
    yield put(yield call(success, PRODUCTS_CONSTANTS.FETCH_PRODUCTS_SUCCESS, response));
    yield put({ type: LOADER_CONSTANTS.LOADER_STOP_REQUEST });
  } else {
    yield put(yield call(failure, PRODUCTS_CONSTANTS.FETCH_PRODUCTS_FAILURE, error));
    yield put({ type: LOADER_CONSTANTS.LOADER_STOP_REQUEST });
  }
}

export function* fetchProductsWatcherSaga() {
  yield takeEvery(PRODUCTS_CONSTANTS.FETCH_PRODUCTS_REQUEST, fetchProductsSaga);
}

const fetchProductDetailsService = async ({ productId }) => {
  try {
    const response = await firestore()
      .collection('products')
      .doc(productId.trim())
      .get({ source: 'server' });
    return {
      response: {
        data: response.data(),
        status: true,
        message: 'success',
      },
    };
  } catch (error) {
    return {
      response: {
        data: [],
        status: false,
        message: error?.message,
      },
    };
  }
};

function* fetchProductDetailsSaga(action) {
  const { response, error } = yield call(fetchProductDetailsService, action.payload);
  if (!checkEmpty(response) && response?.status) {
    yield put(yield call(success, PRODUCTS_CONSTANTS.FETCH_PRODUCT_DETAILS_SUCCESS, response));
    yield put({ type: LOADER_CONSTANTS.LOADER_STOP_REQUEST });
  } else {
    yield put(yield call(failure, PRODUCTS_CONSTANTS.FETCH_PRODUCT_DETAILS_FAILURE, error));
    yield put({ type: LOADER_CONSTANTS.LOADER_STOP_REQUEST });
  }
}

export function* fetchProductDetailsWatcherSaga() {
  yield takeEvery(PRODUCTS_CONSTANTS.FETCH_PRODUCT_DETAILS_REQUEST, fetchProductDetailsSaga);
}
