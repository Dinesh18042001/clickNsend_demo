import Iconify from "@/components/iconify/Iconify";
import TrackGoogleMaps from "@/module/map/track_job";
import axiosInstance from "@/utils/axios";
import { Close } from "@mui/icons-material";

import {
  Box,
  Button,
  Card,
  Container,
  Dialog,
  DialogContent,
  Divider,
  Grid,
  IconButton, Stack,
  Typography
} from "@mui/material";
import React from "react";

const MapModal = ({ id }) => {
  const [open, setOpen] = React.useState(false);
  const [mapData, setMapData] = React.useState([]);
  const [data, setData] = React.useState([]);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const getMapData = async () => {
    await axiosInstance
      .get(`api/auth/jobs/job-address/${id}`)
      .then((response) => {
        if (response.status === 200) {
          setData(response?.data && response?.data?.view_data);
        }
      })
      .catch((error) => {
        console.log("MapDataError", error);
      });
  };
  React.useEffect(() => {
    if (id) {
      getMapData();
    }
  }, [id]);
  console.log("mapData", mapData);

  React.useEffect(() => {
    let newArray = [];
    let finalArray = [];
    if (data && data?.length > 0) {
      data.forEach((element) => {
        element.forEach((newElement, elementIndex) => {
          if (newElement?.type == "drop") {
            newArray[elementIndex] = {
              from: {
                lat: newElement?.lat,
                lng: newElement?.long,
              },
            };
          } else if (newElement?.type == "pickup") {
            newArray[elementIndex - 1] = {
              from: { ...newArray[elementIndex - 1]?.from },
              to: {
                lat: newElement?.lat,
                lng: newElement?.long,
              },
            };
            finalArray.push(...newArray);
          }
        });
      });
    }
    setMapData(finalArray);
  }, [data, data?.length]);

  // const handleGetDirection = async (elem) => {
  //   console.log("elem", elem[0].long);
  //   console.log("elem", elem[0].lat);

  // };

  return (
    <Box>
      <Button
        color="secondary"
        fullWidth
        variant="outlined"
        startIcon={<Iconify icon="carbon:map" />}
        onClick={handleOpen}
        sx={{
          fontWeight: 500,
        }}
      >
        Map
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        fullWidth={true}
        maxWidth="md"
        fullScreen={true}
      >
        <DialogContent
          sx={{
            height: "90vh",
            py: 2,
          }}
        >
          <Box
            sx={{
              position: "absolute",
              right: 25,
              top: 10,
            }}
          >
            <Card
              variant="outlined"
              sx={{ borderRadius: "50%" }}
              onClick={() => handleClose()}
            >
              <IconButton size="small">
                <Close fontSize="small" />
              </IconButton>
            </Card>
          </Box>
          <Box>
            <Box>
              <Container>
                <Box sx={{ position: "relative", overflow: "hidden" }}>
                  <Grid container>
                    <Grid item md={6}>
                      <Card
                        sx={{
                          position: "relative",
                          pr: 0,
                          py: 0,
                          maxHeight: "100%",
                          overflowY: "scroll",
                          height: "100%",
                          borderRadius: "0px",
                        }}
                      >
                        <Box
                          sx={{
                            position: "sticky",
                            top: 0,
                            zIndex: 1200,
                            background: (theme) => theme.palette.common.white,
                          }}
                        >
                          <Typography
                            component="h3"
                            variant="h3"
                            sx={{ py: 1 }}
                            color="primary"
                          >
                            Track Job
                          </Typography>
                          <Divider />
                        </Box>
                        {data.length > 0 &&
                          data &&
                          data.map((elem) => {
                            return (
                              elem &&
                              elem?.length > 0 &&
                              elem.map((item, index) => {
                                return (
                                  <Box
                                    key={index}
                                    sx={{ scrollSnapAlign: "start" }}
                                  >
                                    <Card
                                      sx={{
                                        p: 2,
                                        mb: 0.5,
                                        borderRadius: "0px",
                                        boxShadow: "none",
                                      }}
                                    >
                                      <Stack
                                        direction="row"
                                        justifyContent="space-between"
                                        alignItems="center"
                                        spacing={3}
                                      >
                                        <Stack>
                                          <Box>
                                            <Typography
                                              fontWeight={500}
                                              textTransform="uppercase"
                                            >
                                              {item?.type}
                                            </Typography>
                                          </Box>
                                          <Box>
                                            <Typography color="grey">
                                              {item?.address}
                                            </Typography>
                                          </Box>
                                        </Stack>
                                        <Box>
                                          <Button
                                            variant="outlined"
                                            color="dark"
                                            size="small"
                                            // onClick={() =>handleGetDirection(elem) }
                                          >
                                            View
                                          </Button>
                                        </Box>
                                      </Stack>
                                    </Card>
                                    <Divider />
                                  </Box>
                                );
                              })
                            );
                          })}
                      </Card>
                    </Grid>
                    <Grid item md={6}>
                      <TrackGoogleMaps data={mapData} />
                    </Grid>
                  </Grid>
                </Box>
              </Container>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default MapModal;
