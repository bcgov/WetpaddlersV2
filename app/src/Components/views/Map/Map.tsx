import { CommonFullCont } from '../../../assets/common-styles/common.styles';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';
import './map.css';
import { useEffect, useRef } from 'react';
import { MapContent } from './Map.style';
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import LayerPicker from '../../LayerPicker/LayerPicker';
// @ts-expect-error Override
MapboxDraw.constants.classes.CONTROL_BASE = 'maplibregl-ctrl';
// @ts-expect-error Override
MapboxDraw.constants.classes.CONTROL_PREFIX = 'maplibregl-ctrl-';
// @ts-expect-error Override
MapboxDraw.constants.classes.CONTROL_GROUP = 'maplibregl-ctrl-group';

const positionMarkerEl = document.createElement('div');
positionMarkerEl.className = 'userTrackingMarker';
positionMarkerEl.style.backgroundImage = 'url("/geo-alt-fill.svg")';

const Map = () => {
  const mapCont = useRef<any>(null);
  const map = useRef<any>(null);
  const drawTools = useRef<any>(new MapboxDraw());

  useEffect(() => {
    if (map.current) return;
    map.current = new maplibregl.Map({
      container: mapCont.current,
      maxZoom: 18,
      zoom: 3,
      minZoom: 0,
      center: [-121, 54],
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
    new maplibregl.Marker({
      element: positionMarkerEl,
    })
      .setLngLat([-121, 54])
      .addTo(map.current);
  });

  return (
    <CommonFullCont>
      <LayerPicker />
      <MapContent>
        <div ref={mapCont} className="map" />
      </MapContent>
    </CommonFullCont>
  );
};
export default Map;
