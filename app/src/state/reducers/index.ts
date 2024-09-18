import { combineReducers } from 'redux';
import { AppConfig } from '../config';
import { createConfigurationReducerWithDefaultState } from './configuration';
import { createMapStateReducer } from './MapState';

function createRootReducer(config: AppConfig) {
  return combineReducers({
    Configuration: createConfigurationReducerWithDefaultState(config),
    MapState: createMapStateReducer(config)
  });
}

export { createRootReducer };

export type RootState = ReturnType<ReturnType<typeof createRootReducer>>;
