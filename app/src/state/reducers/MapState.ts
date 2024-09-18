import { ADD_LAYER, GET_DBC_LAYERS_SUCCESS, LAYER_VECTOR_SUCCESS, TOGGLE_LAYER, TOGGLE_LAYER_MODE } from '../actions';
import { AnyAction, createNextState } from '@reduxjs/toolkit';
import { immerable } from 'immer';

import { AppConfig } from '../config';

class MapState {
  [immerable] = true;
  layersDict: any 
  constructor() {
    this.layersDict = {};
  }
}
const initialState = new MapState();

function createMapStateReducer(
  configuration: AppConfig,
): (MapState, AnyAction) => MapState {
  return (state = initialState, action) => {
    return createNextState(state, (draftState) => {
      switch (action.type) {
        case TOGGLE_LAYER:
          if (!draftState.layersDict[action.payload.layerID]) {
            draftState.layersDict[action.payload.layerID].toggle =
              !draftState.layersDict[action.payload.layerID].toggle;
          }
          return draftState;
        case ADD_LAYER:
          draftState.layersDict[action.payload.layerID] = {
            toggle: false,
            vectorToggle: false,
            cached: false,
            loading: false,
          };
          return draftState;
        case TOGGLE_LAYER_MODE:
          if(!draftState.layersDict[action.payload.layerID].vectorToggle && draftState.layersDict[action.payload.layerID].pmTileURL === null) {
            draftState.layersDict[action.payload.layerID].vectorToggle = true;
            draftState.layersDict[action.payload.layerID].loading = true;
          }
          if(draftState.layersDict[action.payload.layerID].vectorToggle) {
            draftState.layersDict[action.payload.layerID].vectorToggle = false;
          }
          if(!draftState.layersDict[action.payload.layerID].vectorToggle && draftState.layersDict[action.payload.layerID].pmTileURL !== null) {
            draftState.layersDict[action.payload.layerID].vectorToggle = true;
          }
          return draftState;
        case LAYER_VECTOR_SUCCESS: 
          draftState.layersDict[action.payload.layerID].pmTileURL = action.payload.pmTileURL;
          draftState.layersDict[action.payload.layerID].loading = false;
          return draftState;
        case GET_DBC_LAYERS_SUCCESS:
          action.payload.forEach((layer) => {
            const newLayer = {
              toggle: false,
              vectorToggle: false,
              cached: false,
              loading: false,
              name: layer.name,
              title: layer.title,
              metadataLink: layer.metadataLink,
              pmTileURL: null,
            };
            draftState.layersDict[layer.id] = newLayer;
          });
          return draftState;
        default:
          return state;
      }
    }) as unknown as MapState;
  };
}

const selectMapState: (state: any) => MapState = (state) => state.MapState;

export { createMapStateReducer, selectMapState };
