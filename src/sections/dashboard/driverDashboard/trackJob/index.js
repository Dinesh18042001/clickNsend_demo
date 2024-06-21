import { useAuthContext } from "@/auth/useAuthContext";
import TrackGoogleMaps from "@/module/map/track_job";
import axiosInstance from "@/utils/axios";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import Iconify from "@/components/iconify/Iconify";

const TrackJob = () => {
  const router = useRouter();
  const { query } = useRouter();
  const { id } = query;
  const { user } = useAuthContext();
  const [data, setData] = useState([]);
  const [mapData, setMapData] = React.useState([]);

  const initialValues = {
    id: id,
    driver_id: user?.id,
  };
  const fetchTrackJob = async () => {
    await axiosInstance
      .post(`api/auth/jobs/job-tasks`, initialValues)
      .then((response) => {
        if (response.status === 200) {
          setData(
            response.data.view_data && response.data.view_data?.length > 0
              ? response.data.view_data
              : []
          );
        }
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    if (id && user?.id) {
      fetchTrackJob();
    }
  }, [id, user?.id]);

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

  return (
    <React.Fragment>
      <Box py={12}>
        <Container>
          <Box my={1}>
            <Button
              variant="outlined"
              sx={{ my: 0 }}
              onClick={() => router.push("/dashboard/driver/active_jobs")}
            >
              <Iconify icon="ion:play-back" sx={{ mr: "7px" }} width={14} />
              Back
            </Button>
          </Box>
          <Box sx={{ position: "relative", overflow: "hidden" }}>
            <Grid container>
              <Grid item md={6}>
                <Card
                  sx={{
                    position: "relative",
                    pr: 0,
                    py: 0,
                    maxHeight: "92vh",
                    overflowY: "scroll",
                    height: "100%",
                    borderRadius: "0px",
                  }}
                >
                  <Box
                    sx={{
                      my: 0,
                      ml: 0,
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
                            <Box key={index} sx={{ scrollSnapAlign: "start" }}>
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
    </React.Fragment>
  );
};

export default TrackJob;
