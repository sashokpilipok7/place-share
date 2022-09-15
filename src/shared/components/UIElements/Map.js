import React, { useRef, useEffect } from "react";
import MapOl from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import XYZ from "ol/source/XYZ";

import "./Map.css";

const Map = (props) => {
  const mapRef = useRef();

  const { center, zoom } = props;

  useEffect(() => {
    const map = new MapOl({
      target: mapRef.current.id,
      layers: [
        new TileLayer({
          source: new XYZ({}),
        }),
      ],
      view: new View({
        center: [center.lng, center.lat],
        zoom: zoom,
      }),
    });
  }, [center, zoom]);

  return (
    <div
      ref={mapRef}
      className={`map ${props.className}`}
      style={props.style}
      id="map"
    ></div>
  );
};

export default Map;
