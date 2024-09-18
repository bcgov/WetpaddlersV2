import { all, put, call, takeEvery, select } from "redux-saga/effects";
import {
  GET_DBC_LAYERS_REQUEST,
  GET_DBC_LAYERS_SUCCESS,
  TOGGLE_LAYER
} from "../actions";
import { CapacitorHttp } from "@capacitor/core";
import { xml2js } from "xml-js";

const apiUrl = import.meta.env.VITE_API_ENDPOINT;


async function doFetch() {
  const url =
  'https://openmaps.gov.bc.ca/geo/pub/ows?service=WFS&request=GetCapabilities&AcceptFormats=application/json';
    const response = await CapacitorHttp.get({url: url})
    return response
}

function* handle_GET_DBC_LAYERS_REQUEST() {
    const response = yield call(doFetch)

    try {
      const body = response.data;
      const capabilities = xml2js(body, { compact: true })[
        'wfs:WFS_Capabilities'
      ]['FeatureTypeList']['FeatureType'];

      const returnVal = capabilities.map((dataset, index) => { 
        return { 
              id: index,
              title: dataset['Title']['_text'],
              name: dataset['Name']['_text'].slice(4),
              metadataLink: dataset['MetadataURL']['_attributes']['xlink:href']
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
function* MapSaga() {
  try {
    yield all([
      takeEvery(TOGGLE_LAYER, handle_TOGGLE_LAYER),
      takeEvery(GET_DBC_LAYERS_REQUEST, handle_GET_DBC_LAYERS_REQUEST)
    ]);
  } catch (e) {
    console.log(e);
  }
}

export default MapSaga;
