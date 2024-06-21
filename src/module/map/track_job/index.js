import React from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { Box } from "@mui/material";
import DirectionRenderComponent from "./directionRenderComponent";
import DummyLocations from "@/utils/dummyLocations";
import Iconify from "@/components/iconify/Iconify";

const containerStyle = {
  width: "100%",
  height: "700px",
};

// const center = {
//   lat: 0, // Update the center to an international location
//   lng: 0,
// };

function TrackGoogleMaps({ data = [] }) {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY,
  });
  // const initialCenter = { lat: 0, lng: 0 };
  // const [state, setState] = React.useState({
  //   defaultZoom: 5,
  //   map: null,
  //   center: {
  //     lat: 23.217724,
  //     lng: 72.667216,
  //   },
  // });

  const initialCenter = calculateCenter(data);

  const [showPopUpIndex, setShowPopUpIndex] = React.useState(null);

  function calculateCenter(data) {
    if (data.length === 0) return { lat:  51.509865, lng: -0.118092 };

    const sumLat = data.reduce((acc, curr) => acc + parseFloat(curr?.from?.lat) + parseFloat(curr?.to?.lat), 0);
    const sumLng = data.reduce((acc, curr) => acc + parseFloat(curr?.from?.lng) + parseFloat(curr?.to?.lng), 0);
    const avgLat = sumLat / (2 * data.length);
    const avgLng = sumLng / (2 * data.length);
    return { lat: avgLat, lng: avgLng };
  }

  return isLoaded ? (
    <GoogleMap
    mapContainerStyle={containerStyle}
    center={initialCenter}
    zoom={5}
  >
    {data.map((elem, index) => (
      <React.Fragment key={index}>
        <DirectionRenderComponent
          from={{ lat: parseFloat(elem?.from?.lat), lng: parseFloat(elem?.from?.lng) }}
          to={{ lat: parseFloat(elem?.to?.lat), lng: parseFloat(elem?.to?.lng) }}
        />
        <Marker
          position={{ lat: parseFloat(elem?.from?.lat), lng: parseFloat(elem?.from?.lng) }}
          onClick={() => setShowPopUpIndex(index)}
           autoFocus={true}
        />
        <Marker
          position={{ lat: parseFloat(elem?.to?.lat), lng: parseFloat(elem?.to?.lng) }}
          onClick={() => setShowPopUpIndex(index)}
           autoFocus={true}
        />
        {showPopUpIndex === index && (
          <InfoWindow
            position={{ lat: parseFloat(elem?.from?.lat), lng: parseFloat(elem?.from?.lng) }}
            onCloseClick={() => setShowPopUpIndex(null)}
          >
            <div>
              <div>nhà trọ cho thuê</div>
              <div>1.500.000đ</div>
            </div>
          </InfoWindow>
        )}
      </React.Fragment>
    ))}
  </GoogleMap>
) : (
  <></>
);
}

export default React.memo(TrackGoogleMaps);
