import { CommonFullCont } from '../../../assets/common-styles/common.styles';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';
import './map.css';
import { useEffect, useRef, useState } from 'react';
import { MapContent } from './Map.style';
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import LayerPicker from '../../LayerPicker/LayerPicker';
import { useDispatch, useSelector } from 'react-redux';
import {
  MapLibreMap,
  MlMarker,
  MlWmsLayer,
} from '@mapcomponents/react-maplibre';
import WarningModal from '../../WarningModal/WarningModal';
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
  const map = useRef<any>(null);
  const drawTools = useRef<any>(new MapboxDraw());
  const [lat] = useState<number>(-121);
  const [long] = useState<number>(54);
  const marker = new maplibregl.Marker({
    element: positionMarkerEl,
  });
  /*
  useEffect(() => {
    if (map.current) return;
    map.current = new maplibregl.Map({
      container: mapCont.current,
      maxZoom: 18,
      zoom: 3,
      minZoom: 0,
      center: [lat ?? -121, long ?? 54],
      style: {
        glyphs: 'https://fonts.openmaptiles.org/{fontstack}/{range}.pbf',
        version: 8,
        sources: {
          'Esri-Sat-LayerHD': {
            type: 'raster',
            tiles: [
              'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
            ],
            tileSize: 256,
            maxzoom: 18,
          },
        },
        layers: [
          {
            id: 'Esri-Sat-LayerHD',
            type: 'raster',
            source: 'Esri-Sat-LayerHD',
            minzoom: 0,
          },
        ],
      },
    }).addControl(drawTools.current, 'top-left');

    marker.setLngLat([lat, long]);
    marker.addTo(map.current);
  });
  useEffect(() => {
    marker.remove();
    marker.setLngLat([lat, long]);
    marker.addTo(map.current);
  }, [lat, long]);
    */
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
