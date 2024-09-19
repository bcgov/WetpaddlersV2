import { all, put, call, takeEvery, select } from 'redux-saga/effects';
import {
  CACHE_LAYER_SUCCESS,
  CACHE_OFFLINE_MAP_SUCCESS,
  GET_DBC_LAYERS_REQUEST,
  GET_DBC_LAYERS_SUCCESS,
  LAYER_VECTOR_SUCCESS,
  REQUEST_CACHE_OFFLINE_MAP,
  REQUEST_LAYER_VECTOR,
  TOGGLE_LAYER,
  TOGGLE_LAYER_MODE,
  TOGGLE_WARNING_MESSAGE,
} from '../actions';
import { CapacitorHttp } from '@capacitor/core';
import { xml2js } from 'xml-js';

const API_URL = "https://wetpaddlerapi-cf52af-dev.apps.silver.devops.gov.bc.ca"
const DBC_API_BASE_URL =
  'https://openmaps.gov.bc.ca/geo/pub/ows?service=WFS&request=GetCapabilities&AcceptFormats=application/json';

async function doFetch() {
  const url =
    'https://openmaps.gov.bc.ca/geo/pub/ows?service=WFS&request=GetCapabilities&AcceptFormats=application/json';
  const response = await CapacitorHttp.get({ url: url });
  return response;
}

async function get_PMTILE_URL(id, layerNameInDBC, filterShape) {
  if (!API_URL) {
    console.error('Missing API URL, cannot continue');
    return;
  }
  const payload = {
    layer: layerNameInDBC,
    bbox: filterShape,
  };
  console.log(payload);
  const response = await CapacitorHttp.post({
    url: API_URL + '/api/v1/create_pm_tiles',
    data: payload,
    headers: { 'content-type': 'application/json' },
  });
  return response;
}

const createBoundingBox = (
  shape: Record<string, any>,
): [number, number, number, number] => {
  const coords = shape.geometry.coordinates[0];
  const lats = coords.map((item) => item[0]);
  const longs = coords.map((item) => item[1]);
  const box = {
    min: {
      lat: Math.min(...lats),
      long: Math.min(...longs),
    },
    max: {
      lat: Math.max(...lats),
      long: Math.max(...longs),
    },
  };

  return [box.min.lat, box.min.long, box.max.lat, box.max.long];
};

function* handle_REQUEST_LAYER_VECTOR(action) {
  const mapState = yield select((state) => state.MapState);
  const boundingBox = createBoundingBox(mapState.filterShape);

  const response = yield call(
    get_PMTILE_URL,
    action.payload.layerID,
    mapState.layersDict[action.payload.layerID].name,
    boundingBox,
  );
  if (response.status === 200) {
    console.log(response.data.s3_key);
    yield put({
      type: LAYER_VECTOR_SUCCESS,
      payload: {
        layerID: action.payload.layerID,
        pmTileURL: response.data
      },
    });
    console.log('pmtile url is fetched');
  }
}

function* handle_GET_DBC_LAYERS_REQUEST() {
  const response = yield call(doFetch);

  try {
    const body = response.data;
    const capabilities = xml2js(body, { compact: true })[
      'wfs:WFS_Capabilities'
    ]['FeatureTypeList']['FeatureType'];

    console.dir(capabilities);

    const returnVal = capabilities.map((dataset, index) => {
      return {
        id: index,
        title: dataset['Title']?.['_text'],
        name: dataset['Name']?.['_text']?.slice(4),
        metadataLink: dataset['MetadataURL']?.['_attributes']?.['xlink:href'],
      };
    });

    if (response.status === 200) {
      yield put({ type: GET_DBC_LAYERS_SUCCESS, payload: returnVal });
    }
  } catch (e) {
    console.log(e);
    throw Error('Error fetching GeoBC WFS capabilities');
  }
}

function* handle_TOGGLE_LAYER(action) {
  console.log('side effect happening');
}

function* handle_TOGGLE_LAYER_MODE(action) {
  console.log('side effect happening');
  const mapState = yield select((state) => state.MapState);
  // Add logic to determine if warning needed
  if (!mapState.filterShape) {
    yield put({ type: TOGGLE_WARNING_MESSAGE });
    return;
  }

  if (
    mapState.layersDict[action.payload.layerID].vectorToggle &&
    mapState.layersDict[action.payload.layerID].pmTileURL === null
  ) {
    yield put({ type: REQUEST_LAYER_VECTOR, payload: action.payload });
  }
}

async function getPMTILE_FILE(id, url) {
  const response = await CapacitorHttp.get({ url: url });
  // write to disk here, get filepath
  const filepath = '';
  put({
    type: CACHE_LAYER_SUCCESS,
    payload: { id: id, localPMTileURL: filepath },
  });
  return filepath;
}

function* handle_REQUEST_CACHE_OFFLINE_MAP(action) {
  // get all layers toggled on that also have a pmtileurl
  const mapState = yield select((state) => state.MapState);
  const layersToCache = Object.keys(mapState.layersDict).filter((layer) => {
    return (
      mapState.layersDict[layer].toggle &&
      mapState.layersDict[layer].pmTileURL !== null
    );
  });

  const calls = [];

  layersToCache.forEach((element) => {
    calls.push(
      call(getPMTILE_FILE, element, mapState.layersDict[element].pmTileURL),
    );
  });

  yield all(calls);
  yield put({ type: CACHE_OFFLINE_MAP_SUCCESS });
}

function* MapSaga() {
  try {
    yield all([
      takeEvery(TOGGLE_LAYER_MODE, handle_TOGGLE_LAYER_MODE),
      takeEvery(REQUEST_LAYER_VECTOR, handle_REQUEST_LAYER_VECTOR),
      takeEvery(TOGGLE_LAYER, handle_TOGGLE_LAYER),
      takeEvery(GET_DBC_LAYERS_REQUEST, handle_GET_DBC_LAYERS_REQUEST),
      takeEvery(REQUEST_CACHE_OFFLINE_MAP, handle_REQUEST_CACHE_OFFLINE_MAP),
    ]);
  } catch (e) {
    console.log(e);
  }
}

export default MapSaga;
