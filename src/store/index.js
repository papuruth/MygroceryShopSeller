import AsyncStorage from '@react-native-community/async-storage';
import Flatted from 'flatted';
import { applyMiddleware, compose, createStore } from 'redux';
import { persistReducer, persistStore, createTransform } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import { sessionService } from 'redux-react-native-session';
import createSagaMiddleware from 'redux-saga';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../redux/root-reducer';
import sagas from '../redux/root-saga';

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware, thunkMiddleware];

export const transformCircular = createTransform(
  (inboundState) => Flatted.stringify(inboundState),
  (outboundState) => Flatted.parse(outboundState),
);

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['loaderReducer'],
  stateReconciler: autoMergeLevel2,
  transforms: [transformCircular],
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer, composeEnhancers(applyMiddleware(...middlewares)));

const persistor = persistStore(store);

sagaMiddleware.run(sagas);
sessionService.initSessionService(store);

export { store, persistor };
