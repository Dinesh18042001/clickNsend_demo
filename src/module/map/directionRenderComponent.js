import React from "react";
import {
  Marker,
  InfoWindow,Polyline 
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

const getGooglePopUp = (data) => {
  console.log("datadtaa", data);
  return (
    <Box>
      <Stack direction="row" spacing={2}>
        <Box>
          <Box
            component="img"
            src={`${data?.product?.base_url}${data?.product?.image}`}
            sx={{
              borderRadius: "50%",
              border: "3px solid #ff7534",
              width: "50px",
              height: "50px",
            }}
          />
        </Box>
        <Stack>
          <Box>
            <Typography
              color="primary"
              fontSize={14}
              fontWeight={500}
              variant="subtitle1"
            >
              Mr. Alex
            </Typography>
          </Box>
          <Stack spacing={0.2} pb={0.8}>
            <Stack direction="row" spacing={0.4}>
              <Box>
                <Typography fontWeight={400} fontSize={10}>
                  Job Success Rate :
                </Typography>
              </Box>
              <Box>
                <Typography color="primary" fontWeight={500} fontSize={10}>
                  98 %
                </Typography>
              </Box>
            </Stack>
            <Box>
              <LinearProgress variant="determinate" value={98} />
            </Box>
          </Stack>
          <Box>
            <Rating
              value={4}
              readOnly
              size="small"
              sx={{
                color: (theme) => theme.palette.primary.main,
                fontSize: "12px !important",
              }}
            />
          </Box>
        </Stack>
      </Stack>
      <Box py={1}>
        <Stack direction="row" spacing={1}>
          <Chip
            icon={<Iconify icon="mdi:chat" width={14} />}
            size="small"
            label="Send Message"
            variant="outlined"
            color="primary"
            sx={{ fontSize: "10px", cursor: "pointer" }}
          />
        </Stack>
      </Box>
      <Divider />
      <Box pt={1}>
        <Typography fontSize={12} fontWeight={400}>
          Bid: $500
        </Typography>
      </Box>
    </Box>
  );
};
const DirectionRenderComponent = (props) => {
  console.log("elem elem", props);
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
        if (status === window.google.maps.DirectionsStatus.OK) {
          setState({
            directions: result,
          });
        } else if (
          status === window.google.maps.DirectionsStatus.OVER_QUERY_LIMIT
        ) {
          delayFactor += 0.2;
          setTimeout(() => {
            getDirections(startLoc, destinationLoc);
          }, delayFactor * 200);
        } else {
          console.error(`error fetching directions ${result}`);
        }
      }
    );
  };

  let originMarker = null;
  let destinationMarker = null;
  let polyline = null;

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
          setShowPopUp(true); // Toggle the visibility of InfoWindow
        }}
      >
        {showPopUp && (
          <InfoWindow onCloseClick={() => setShowPopUp(false)}>
            {getGooglePopUp(props.data)}
          </InfoWindow>
        )}
      </Marker>
    );
    destinationMarker = (
      <Marker
        defaultLabel={props.index.toString()}
        defaultIcon={null}
        position={{
          lat: parseFloat(props.to.lat),
          lng: parseFloat(props.to.lng),
        }}
        onClick={() => {
          setShowPopUp(true); // Toggle the visibility of InfoWindow
        }}
      >
        {showPopUp && (
          <InfoWindow onCloseClick={() => setShowPopUp(false)}>
            {getGooglePopUp(props.data)}
          </InfoWindow>
        )}
      </Marker>
    );
  }

  polyline = (
    <Polyline
      path={[
        { lat: parseFloat(props.from.lat), lng: parseFloat(props.from.lng) },
        { lat: parseFloat(props.to.lat), lng: parseFloat(props.to.lng) },
      ]}
      options={{
        strokeColor: "#FF0000",
        strokeOpacity: 1,
        strokeWeight: 1,
      }}
    />
  );



  return (
    <div>
      {originMarker}
      {destinationMarker}
      {polyline}
    </div>
  );
};

export default DirectionRenderComponent;
//  \true when international map are have then marker re not show please check in india it is visisble but out of india it is not visisble 