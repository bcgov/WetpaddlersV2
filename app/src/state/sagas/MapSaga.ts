import { all, put, call, takeEvery, select } from "redux-saga/effects";
import {
  TOGGLE_LAYER
} from "../actions";

const apiUrl = import.meta.env.VITE_API_ENDPOINT;


function* handle_TOGGLE_LAYER(action) {
  console.log('side effect happening')
}
function* MapSaga() {
  try {
    yield all([
      takeEvery(TOGGLE_LAYER, handle_TOGGLE_LAYER),
    ]);
  } catch (e) {
    console.log(e);
  }
}

export default MapSaga;
