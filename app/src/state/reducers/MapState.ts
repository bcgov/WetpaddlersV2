import { ADD_LAYER, TOGGLE_LAYER } from '../actions';
import { AnyAction, createNextState } from '@reduxjs/toolkit';
import { immerable } from "immer";

import { AppConfig } from '../config';

class MapState {
  [immerable] = true;
  layersDict: {
    stubLayerID: {
      toggle: boolean;
      vectorToggle: boolean;
      cached: boolean;
      loading: boolean;
    }
  };
}
const initialState = new MapState();

function createMapStateReducer(configuration: AppConfig): (MapState, AnyAction) => MapState{
  return (state = initialState, action) => {
    return createNextState(state, (draftState) => {
      switch (action.type) {
        case TOGGLE_LAYER:
          if(!draftState.layersDict[action.payload.layerID]) {
            draftState.layersDict[action.payload.layerID].toggle =
            !draftState.layersDict[action.payload.layerID].toggle;
          }
          return draftState;
        case ADD_LAYER:
          draftState.layersDict[action.payload.layerID] = {
            toggle: false,
            vectorToggle: false,
            cached: false,
            loading: false
          };
          return draftState;
        default:
          return state;
      }
    }) as unknown as MapState;
  };
}

const selectMapState: (state: any) => MapState = (state) => state.MapState;

export { createMapStateReducer, selectMapState };


