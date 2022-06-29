import React, { useState } from "react";

import L from "leaflet";
import { Map, TileLayer, FeatureGroup } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import osm from "./osm-providers";
import { useRef } from "react";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png",
});

const DrawMap = ({ setBottomLeft, setTopRight }) => {
  const [center, setCenter] = useState({
    lat: 52.520417,
    lng: 13.408971,
  });
  const ZOOM_LEVEL = 11;
  const mapRef = useRef();

  const _created = (e) => {
    setTopRight(e.layer._bounds._northEast);
    setBottomLeft(e.layer._bounds._southWest);
    console.log(e.layer._bounds._northEast, e.layer._bounds._southWest);
  };

  return (
    <>
      {" "}
      <Map
        center={center}
        zoom={ZOOM_LEVEL}
        ref={mapRef}
        style={{ width: "90vw", height: "30vh", margin: "1rem auto" }}
      >
        <FeatureGroup>
          <EditControl
            position="topright"
            onCreated={_created}
            draw={{
              circle: false,
              circlemarker: false,
              marker: false,
              polygon: false,
              polyline: false,
            }}
            // onDrawStop={(e) => console.log(e.layer)}
          />
        </FeatureGroup>
        <TileLayer
          url={osm.maptiler.url}
          attribution={osm.maptiler.attribution}
        />
      </Map>
    </>
  );
};

export default DrawMap;
