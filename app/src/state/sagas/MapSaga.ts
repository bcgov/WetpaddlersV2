import { all, put, call, takeEvery, select } from "redux-saga/effects";
import {
  GET_DBC_LAYERS_REQUEST,
  GET_DBC_LAYERS_SUCCESS,
  LAYER_VECTOR_SUCCESS,
  REQUEST_LAYER_VECTOR,
  TOGGLE_LAYER,
  TOGGLE_LAYER_MODE
} from "../actions";
import { CapacitorHttp } from "@capacitor/core";
import { xml2js } from "xml-js";

const API_URL = import.meta.env.VITE_API_ENDPOINT;
const DBC_API_BASE_URL = 'https://openmaps.gov.bc.ca/geo/pub/ows?service=WFS&request=GetCapabilities&AcceptFormats=application/json';


async function doFetch() {
  const url =
  'https://openmaps.gov.bc.ca/geo/pub/ows?service=WFS&request=GetCapabilities&AcceptFormats=application/json';
    const response = await CapacitorHttp.get({url: url})
    return response
}

async function get_PMTILE_URL(id, layerNameInDBC, filterShape) {
  const payload = {
    id: id,
    url: DBC_API_BASE_URL + layerNameInDBC,
    filterShape: filterShape
  }
  const response = await CapacitorHttp.get({url: API_URL + '/api/v1/pmtile', params: payload})
  return response
}

function* handle_REQUEST_LAYER_VECTOR(action) {
  const mapState = yield select((state) => state.MapState);
  //TODO once call is ready
    if(false) {
      const response = yield call(get_PMTILE_URL, action.payload.layerID, mapState.layersDict[action.payload.layerID].name, action.payload.filterShape )
      if(response.status === 200) {
        yield put({ type: LAYER_VECTOR_SUCCESS, payload: response.data }) 
        console.log('pmtile url is fetched')
      }
    }
}

function* handle_GET_DBC_LAYERS_REQUEST() {
    const response = yield call(doFetch)

    try {
      const body = response.data;
      const capabilities = xml2js(body, { compact: true })[
        'wfs:WFS_Capabilities'
      ]['FeatureTypeList']['FeatureType'];

      console.dir(capabilities)

      const returnVal = capabilities.map((dataset, index) => { 
        return { 
              id: index,
              title: dataset['Title']?.['_text'],
              name: dataset['Name']?.['_text']?.slice(4),
              metadataLink: dataset['MetadataURL']?.['_attributes']?.['xlink:href']
          }
        })

      if(response.status === 200) {
        yield put ({type: GET_DBC_LAYERS_SUCCESS, payload: returnVal})
      }
    } catch(e) {
      console.log(e)
      throw Error('Error fetching GeoBC WFS capabilities');
    }
  }


function* handle_TOGGLE_LAYER(action) {
  console.log('side effect happening')
}

function* handle_TOGGLE_LAYER_MODE(action) {
  console.log('side effect happening')
  const mapState = yield select((state) => state.MapState);
  if(mapState.layersDict[action.payload.layerID].vectorToggle && mapState.layersDict[action.payload.layerID].pmTileURL === null) {
    yield put({type: REQUEST_LAYER_VECTOR, payload: action.payload})

    console.log('vector layer is toggled on and cached')
  }

}
function* MapSaga() {
  try {
    yield all([
      takeEvery(TOGGLE_LAYER_MODE, handle_TOGGLE_LAYER_MODE),
      takeEvery(REQUEST_LAYER_VECTOR, handle_REQUEST_LAYER_VECTOR),
      takeEvery(TOGGLE_LAYER, handle_TOGGLE_LAYER),
      takeEvery(GET_DBC_LAYERS_REQUEST, handle_GET_DBC_LAYERS_REQUEST)
    ]);
  } catch (e) {
    console.log(e);
  }
}

export default MapSaga;
