import { Box } from "@mui/material";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import React, { useState,useEffect } from "react";
import DirectionRenderComponent from "./directionRenderComponent";

const containerStyle = {
  width: "100%",
  height: "700px",
};

function GoogleMaps({ data = [] }) {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY,
  });
  // console.log("data data 123", data);

  const [map, setMap] = useState(null);
  const [center, setCenter] = useState({ lat:  51.509865, lng: -0.118092 });
  const [bounds, setBounds] = useState(null);


  useEffect(() => {
    if (data.length > 0) {
      // Calculate the bounds of all markers
      const markerBounds = new window.google.maps.LatLngBounds();
      data.forEach((elem) => {
        markerBounds.extend(new window.google.maps.LatLng(elem.from.lat, elem.from.lng));
        markerBounds.extend(new window.google.maps.LatLng(elem.to.lat, elem.to.lng));
      });

      // Set the center and bounds of the map
      setBounds(markerBounds);
      setCenter(markerBounds.getCenter());
    }
  }, [data]);

  const onLoad = (map) => {
    setMap(map);
  };

  return isLoaded ? (
    <Box component="div" sx={{ position: "relative", width: "100%" }}>
       <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={5}
      onLoad={onLoad}
      options={{
        restriction: {
          latLngBounds: bounds, // Restrict map to the bounds of all markers
          strictBounds: false, // Allow slight movement beyond bounds for better user experience
        },
      }}
    >
        {data.map((elem, index) => {
          {/* console.log(index, "elem elem", elem); */}

          return (
            <DirectionRenderComponent
              key={index}
              index={index + 1}
              strokeColor={elem.strokeColor}
              from={elem.from}
              to={elem.to}
              data={elem.data}
            />
          );
        })}
      </GoogleMap>
    </Box>
  ) : (
    <></>
  );
}

export default React.memo(GoogleMaps);
