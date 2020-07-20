import { applyMiddleware, compose, createStore } from 'redux';
import { sessionService } from 'redux-react-native-session';
import createSagaMiddleware from 'redux-saga';
import thunkMiddleware from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import rootReducer from '../redux/root-reducer';
import sagas from '../redux/root-saga';

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware, thunkMiddleware];

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['loaderReducer'],
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer, composeEnhancers(applyMiddleware(...middlewares)));

const persistor = persistStore(store);

sagaMiddleware.run(sagas);
sessionService.initSessionService(store);

export { store, persistor };
