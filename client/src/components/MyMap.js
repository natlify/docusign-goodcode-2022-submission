import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";

import { useEffect, useRef } from "react";
const MyMap = () => {
  const mapRef = useRef(null);
  useEffect(() => {
    new MapView({
      container: mapRef.current,
      map: new Map({
        basemap: "dark-gray",
      }),
      zoom: 4,
    });
  }, []);
  return <div ref={mapRef} style={{ height: "100vh", width: "100vw" }}></div>;
};

export default MyMap;
