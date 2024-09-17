import { CommonFullCont } from "../../assets/common-styles/common.styles";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import "./map.css";
import { useEffect, useRef } from "react";
import { MapContent } from "./Map.style";

const positionMarkerEl = document.createElement("div");
positionMarkerEl.className = "userTrackingMarker";
positionMarkerEl.style.backgroundImage = 'url("/geo-alt-fill.svg")';

const Map = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mapCont = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const map = useRef<any>(null);

  useEffect(() => {
    if (map.current) return;
    map.current = new maplibregl.Map({
      container: mapCont.current,
      maxZoom: 24,
      zoom: 3,
      minZoom: 0,
      center: [-121, 54],
      style: {
        glyphs: "https://fonts.openmaptiles.org/{fontstack}/{range}.pbf",
        version: 8,
        sources: {
          "Esri-Sat-LayerHD": {
            type: "raster",
            tiles: [
              "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
            ],
            tileSize: 256,
            maxzoom: 24,
          },
        },
        layers: [
          {
            id: "Esri-Sat-LayerHD",
            type: "raster",
            source: "Esri-Sat-LayerHD",
            minzoom: 0,
          },
        ],
      },
    });
    new maplibregl.Marker({
      element: positionMarkerEl,
    })
      .setLngLat([-121, 54])
      .addTo(map.current);
  });

  return (
    <CommonFullCont>
      <MapContent>
        <div ref={mapCont} className="map" />
      </MapContent>
    </CommonFullCont>
  );
};
export default Map;
