import React from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,
  DirectionsRenderer,
} from "@react-google-maps/api";
import {
  Box,
  Chip,
  Divider,
  LinearProgress,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import Iconify from "@/components/iconify/Iconify";

const DirectionRenderComponent = (props) => {
  console.log("elem elem 1", props);

  const [showPopUp, setShowPopUp] = React.useState(false);
  const [state, setState] = React.useState({
    directions: null,
  });
  let delayFactor = 0;

  React.useEffect(() => {
    const startLoc = props.from.lat + ", " + props.from.lng;
    const destinationLoc = props.to.lat + ", " + props.to.lng;
    getDirections(startLoc, destinationLoc);
  }, [props]);

  const getDirections = async (startLoc, destinationLoc) => {
    const directionService = new window.google.maps.DirectionsService();
    directionService.route(
      {
        origin: startLoc,
        destination: destinationLoc,
        optimizeWaypoints: true,
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        // console.log("status", status);
        if (status === window.google.maps.DirectionsStatus.OK) {
          setState({
            directions: result,
          });
        } else if (
          status === window.google.maps.DirectionsStatus.OVER_QUERY_LIMIT
        ) {
          delayFactor += 0.2;
          // if (delayFactor <= 10) delayFactor = 0.2;
          setTimeout(() => {
            getDirections(startLoc, destinationLoc);
          }, delayFactor * 200);
        } else {
          console.error(`Error fetching directions: ${status}`);        }
      }
    );
  };
  console.log("Stroke Color:", props); // Debugging

  let originMarker = null;
  let destinationMarker = null;
  if (state.directions && props.index) {
    originMarker = (
      <Marker
        defaultLabel={props.index.toString()}
        defaultIcon={null}
        position={{
          lat: parseFloat(props.from.lat),
          lng: parseFloat(props.from.lng),
        }}
        onClick={() => {
          setShowPopUp(1);
        }}
      />
    );
    destinationMarker = (
      <Marker
        label={props.index.toString()}
        defaultIcon={null}
        position={{
          lat: parseFloat(props.to.lat),
          lng: parseFloat(props.to.lng),
        }}
        onClick={() => {
          setShowPopUp(1);
        }}
      />
    );
  }

  return (
   <>
      {state.directions && (
        <DirectionsRenderer
          directions={state.directions}
          options={{
            polylineOptions: {
              strokeColor: props.strokeColor, // Corrected typo
              strokeOpacity: 0.4,
              strokeWeight: 4,
            },
            preserveViewport: true,
            suppressMarkers: true,
            icon: { scale: 3 },
          }}
        />
      )}
      <Marker
        position={{
          lat: parseFloat(props.from.lat),
          lng: parseFloat(props.from.lng),
        }}
        onClick={() => {
          setShowPopUp(true); // Assuming setShowPopUp is defined in parent component
        }}
        autoFocus={true}
      />
      <Marker
        position={{
          lat: parseFloat(props.to.lat),
          lng: parseFloat(props.to.lng),
        }}
        onClick={() => {
          setShowPopUp(true); // Assuming setShowPopUp is defined in parent component
        }}
         autoFocus={true}
      />
    </>
  );
};

export default DirectionRenderComponent;
