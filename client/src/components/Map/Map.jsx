import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import "./Map.css";

mapboxgl.accessToken =
  "pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA";

const Map = ({ setLng, setLat }) => {
  const mapContainerRef = useRef(null);

  const [zoom, setZoom] = useState(11);
  const berlin = [13.408971, 52.520417];

  // Initialize map when component mounts
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: berlin,
      zoom: zoom,
    });
    const marker = new mapboxgl.Marker({
      color: "#FFFFFF",
      draggable: true,
    });

    // Add navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), "top-right");
    map.doubleClickZoom.disable();
    // map.on("move", () => {
    //   setLng(map.getLngLat().lng.toFixed(4));
    //   setLat(marker.getLngLat().lat.toFixed(4));
    // setZoom(map.getZoom().toFixed(2));
    // });

    map.on("dblclick", (e) => {
      console.log(`A click event has occurred at ${e.lngLat}`);
      // console.log(e.lngLat.lat);
      marker.setLngLat(e.lngLat).addTo(map);
      setLat(e.lngLat.lat.toFixed(5));
      setLng(e.lngLat.lng.toFixed(5));
    });
    map.on("touchstart", (e) => {
      marker.setLngLat(e.lngLat).addTo(map);
      setLat(e.lngLat.lat.toFixed(5));
      setLng(e.lngLat.lng.toFixed(5));
    });
    // Clean up on unmount
    return () => map.remove();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <div className="sidebarStyle">
        <div>{/* Longitude: {lng} | Latitude: {lat} | Zoom: {zoom} */}</div>
      </div>
      <div className="map-container" ref={mapContainerRef} />
    </div>
  );
};

export default Map;
