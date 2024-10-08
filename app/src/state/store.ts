import { applyMiddleware, legacy_createStore as createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createRootReducer } from './reducers';

import { createLogger } from 'redux-logger';
import { AppConfig } from './config';
import MapSaga from './sagas/MapSaga';
import { GET_DBC_LAYERS_REQUEST } from './actions';

const setupStore = (configuration: AppConfig) => {
  const logger = createLogger({
    logErrors: true,
    collapsed: true,
    diff: true
  });
  let middlewares;

  const sagaMiddleware = createSagaMiddleware();

  let store;
  if (configuration.DEBUG) {
    store = createStore(createRootReducer(configuration), applyMiddleware(sagaMiddleware, logger));
  } else {
    store = createStore(createRootReducer(configuration), applyMiddleware(sagaMiddleware));
  }

  sagaMiddleware.run(MapSaga);
  store.dispatch({ type: GET_DBC_LAYERS_REQUEST });

  return store;
};

export { setupStore };
