import React, { useState, useEffect } from "react";

import L from "leaflet";
import { Map, TileLayer, FeatureGroup, Rectangle } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import osm from "./osm-providers";
import { useRef } from "react";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import "./Map.css";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png",
});

const DrawMap = ({ setBottomLeft, setTopRight, bottomLeft, topRight }) => {
  // console.log([
  //   [bottomLeft.lat, bottomLeft.lng],
  //   [topRight.lat, topRight.lng],
  // ]);

  const [center, setCenter] = useState({
    lat: 52.520417,
    lng: 13.408971,
  });
  const ZOOM_LEVEL = 11;
  const mapRef = useRef();
  // const [drawRec, setDrawRec] = useState(false);

  // useEffect(() => {
  //   if (bottomLeft && topRight) {
  //     setTimeout(() => {
  //       setDrawRec(true);
  //     });
  //   }
  //   console.log(bottomLeft);
  // }, []);

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
        className="map-container"
        marker={center}
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
          {/* {drawRec ? (
            <Rectangle
              bounds={[
                [bottomLeft.lat, bottomLeft.lng],
                [topRight.lat, topRight.lng],
              ]}
            ></Rectangle>
          ) : null} */}
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
