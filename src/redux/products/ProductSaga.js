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
      .doc(userId)
      .collection('category')
      .get();
    const docSnapShot = response.docs;
    return {
      response: {
        data: docSnapShot.map((doc) => doc.data()) || [],
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
