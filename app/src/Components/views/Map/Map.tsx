import MapboxDraw from '@mapbox/mapbox-gl-draw';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';
import {
  MapLibreMap,
  MlMarker,
  MlWmsLayer,
  useMap,
} from '@mapcomponents/react-maplibre';
<<<<<<< Updated upstream
import WarningModal from '../../WarningModal/WarningModal';
=======
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { PMTiles, Protocol } from 'pmtiles';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CommonFullCont } from '../../../assets/common-styles/common.styles';
import LayerPicker from '../../LayerPicker/LayerPicker';
import { MapContent } from './Map.style';
import './map.css';
>>>>>>> Stashed changes
// @ts-expect-error Override
MapboxDraw.constants.classes.CONTROL_BASE = 'maplibregl-ctrl';
// @ts-expect-error Override
MapboxDraw.constants.classes.CONTROL_PREFIX = 'maplibregl-ctrl-';
// @ts-expect-error Override
MapboxDraw.constants.classes.CONTROL_GROUP = 'maplibregl-ctrl-group';

const positionMarkerEl = document.createElement('div');
positionMarkerEl.className = 'userTrackingMarker';
positionMarkerEl.style.backgroundImage = 'url("/wheres-waldo-seeklogo.svg")';

const Map = (props: any) => {
  const dispatch = useDispatch();
  const layerDict = useSelector((state: any) => state.MapState.layersDict);
  const mapCont = useRef<any>(null);
  const map = useMap({ mapId: 'map' });
  const drawTools = useRef<any>(new MapboxDraw());
  const [lat] = useState<number>(-121);
  const [long] = useState<number>(54);
  const marker = new maplibregl.Marker({
    element: positionMarkerEl,
  });

  useEffect(() => {
    const protocol = new Protocol();
    maplibregl.addProtocol('pmtiles', (request) => {
      return new Promise((resolve, reject) => {
        const callback = (err, data) => {
          if (err) {
            reject(err);
          } else {
            resolve({ data });
          }
        };
        protocol.tile(request, callback);
      });
    });

    const PMTILES_URL = `https://nrs.objectstore.gov.bc.ca/uphjps/invasives-local.pmtiles`;

    const p = new PMTiles(PMTILES_URL);

    // this is so we share one instance across the JS code and the map renderer
    protocol.add(p);

    // we first fetch the header so we can get the center lon, lat of the map.
    p.getHeader().then((header) => {
      map?.map?.addSource('pmtiles', {
        type: 'vector',
        url: `pmtiles://${PMTILES_URL}`,
        //              url: `https://nrs.objectstore.gov.bc.ca/uphjps/invasives-local.pmtiles`,
        // url: `pmtiles://${ CONFIG.PUBLIC_MAP_URL}`,
        attribution: '© <a href="https://openstreetmap.org">OpenStreetMap</a>',
      });
      map?.map?.addLayer({
        id: 'invasivesbc-pmtile-vector',
        type: 'circle',
        source: 'pmtiles',
        'source-layer': 'invasives',
        layout: {
          visibility: 'visible',
        },
        paint: { 'circle-color': '#0905f5', 'circle-opacity': 0.5 },
        maxzoom: 20,
      });
    });

  }, [map]);

  return (
    <CommonFullCont>
      <WarningModal />
      <LayerPicker />
      <MapContent>
        {' '}
        {/*<div ref={mapCont} className="map" />*/}
        <MapLibreMap
          mapId="map"
          options={{
            zoom: 14.5,
            center: [7.0851268, 50.73884],
          }}
        ></MapLibreMap>
        <MlWmsLayer url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}" />
        {/* put waldo in content here:*/}
        <MlMarker
          content="<div>This is where waldo is</div>"
          lat={50.73884}
          lng={7.0851268}
        />
        {Object.keys(layerDict)
          .filter((layer) => !layerDict?.[layer]?.vectorToggle)
          .map((layer) => {
            const layerUrl = `https://openmaps.gov.bc.ca/geo/ows?bbox={bbox-epsg-3857}&format=image/png&service=WMS&version=1.3.0&request=GetMap&srs=EPSG:3857&transparent=true&width=256&height=256&raster-opacity=0.5&layers=${layerDict[layer].name}`;
            return (
              <MlWmsLayer
                key={layerDict[layer].id}
                url={layerUrl}
                visible={layerDict[layer].toggle}
              />
            );
          })}
      </MapContent>
    </CommonFullCont>
  );
};
export default Map;
