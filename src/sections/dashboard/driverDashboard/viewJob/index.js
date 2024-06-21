import Iconify from "@/components/iconify/Iconify";
import MapModal from "@/module/dashboard/driverCard/mapModel";
import axiosInstance from "@/utils/axios";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  Modal,
  Rating,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import React, { useState } from "react";

const ViewJobHistory = () => {
  const router = useRouter();
  const { id } = router.query;
  const [jobDetail, setJobDetail] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [addressOpen, setAddressOpen] = useState(false);
  const handleAddressOpen = (address) => setAddressOpen(address);
  const handleAddressClose = () => setAddressOpen(false);
  // Rating list api
  const getJobDetail = async () => {
    // setLoader(true);
    await axiosInstance
      .get(`api/auth/jobs/view/${id}`)
      .then((response) => {
        if (response?.status === 200) {
          setJobDetail(response?.data?.view_data);
          setRatings(response?.data?.view_data?.job?.ratings);
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  };
  // End
  React.useEffect(() => {
    if (id) {
      getJobDetail();
    }
  }, [id]);

  
  return (
    <React.Fragment>
      <Box mt={10} pb={12}>
        <Container>
          <Box my={4}>
            <Button
              variant="outlined"
              sx={{ my: 2 }}
              onClick={() => router.push("/dashboard/driver/job_request")}
            >
              <Iconify icon="ion:play-back" sx={{ mr: "7px" }} width={14} />
              Back
            </Button>
            <Card sx={{ position: "relative" }}>
              <Box sx={{ p: 2 }}>
                <Grid container>
                  <Grid item md={2} sm={12}></Grid>
                  <Grid item md={8} sm={12}>
                    <Typography
                      textAlign="center"
                      variant="h6"
                      my={1}
                      fontSize={17}
                    >
                      Job Detail
                    </Typography>
                  </Grid>
                  <Grid item md={2} sm={12}>
                    <MapModal id={id} />
                  </Grid>
                </Grid>
              </Box>
              <Divider />
              <CardContent>
                <Typography variant="h4" component="h4" textAlign="center">
                  {jobDetail?.job?.name}
                </Typography>
                <Stack
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  spacing={2}
                  my={1}
                >
                  <Typography component="p" variant="body2" fontWeight={500}>
                    Vehicle Requirment:
                  </Typography>
                  <Typography component="p" variant="body2" fontWeight={600}>
                    {jobDetail?.job?.vehicle}
                  </Typography>
                </Stack>
                <Divider sx={{ my: 4 }} />
                <Box>
                  <Typography
                    component="p"
                    variant="body1"
                    fontWeight={500}
                    textAlign="center"
                    mb={2}
                  >
                   Important Note
                  </Typography>
                  <TableContainer
                    sx={{
                      borderRadius: "10px",
                      border: "1px solid",
                      borderColor: (theme) => theme.palette.primary.main,
                    }}
                  >
                    <Table aria-label="simple table" sx={{ minWidth: "100%" }}>
                      <TableHead>
                        
                      </TableHead>
                      <TableBody>
                        {jobDetail?.pickup &&
                          jobDetail?.pickup?.length > 0 &&
                          jobDetail?.pickup.map((item, index) => {
                            return (
                              <TableRow
                                key={`jobDetail${index}`}
                                sx={{
                                  "&:last-child td, &:last-child th": {
                                    border: 0,
                                  },
                                }}
                              >
                               
                                <TableCell>
                                  <Typography component="p" variant="body2">
                                    {item?.item?.description}
                                  </Typography>
                                </TableCell>
                              </TableRow>
                            );
                          })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>


                <Box>
                  <Typography
                    component="p"
                    variant="body1"
                    fontWeight={500}
                    textAlign="center"
                    mb={2}
                    mt={2}
                  >
                    Pickup Details
                  </Typography>
                  <TableContainer
                    sx={{
                      borderRadius: "10px",
                      border: "1px solid",
                      borderColor: (theme) => theme.palette.primary.main,
                    }}
                  >
                    <Table aria-label="simple table" sx={{ minWidth: "100%" }}>
                      <TableHead>
                        <TableRow>
                          <TableCell align="left">Address</TableCell>
                          <TableCell align="left">Pickup Date</TableCell>
                          <TableCell align="left">Pickup Time</TableCell>
                          <TableCell align="left">L*W*H</TableCell>
                          <TableCell align="left">Quantity</TableCell>
                          <TableCell align="left">Image</TableCell>
                          <TableCell align="left">Material</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {jobDetail?.pickup &&
                          jobDetail?.pickup?.length > 0 &&
                          jobDetail?.pickup.map((item, index) => {
                            return (
                              <TableRow
                                key={`jobDetail${index}`}
                                sx={{
                                  "&:last-child td, &:last-child th": {
                                    border: 0,
                                  },
                                }}
                              >
                                <TableCell component="th" scope="row">
                                  <Typography component="p" variant="body2">
                                    {item?.address}
                                  </Typography>
                                </TableCell>
                                <TableCell>
                                  <Typography component="p" variant="body2">
                                    {item?.item?.pickup_date}
                                  </Typography>
                                </TableCell>
                                <TableCell>
                                  <Typography component="p" variant="body2">
                                    {item?.item?.pickup_time}
                                  </Typography>
                                </TableCell>
                                <TableCell>
                                  <Typography
                                    component="p"
                                    variant="body2"
                                  >{`${item?.item?.length} * ${item?.item?.width} * ${item?.item?.height}`}</Typography>
                                </TableCell>
                                <TableCell>
                                  <Typography component="p" variant="body2">
                                    {item?.item?.quantity}
                                  </Typography>
                                </TableCell>
                                <TableCell>
                                  <Box>
                                    <Box
                                      component="img"
                                      m="auto"
                                      src={`${item?.item?.base_url}${item?.item?.image}`}
                                      width={80}
                                    />
                                  </Box>
                                </TableCell>
                                <TableCell>
                                  <Typography component="p" variant="body2">
                                    {item?.item?.material}
                                  </Typography>
                                </TableCell>
                              </TableRow>
                            );
                          })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
                <Divider sx={{ my: 4 }} />
                <Box>
                  <Typography
                    component="p"
                    variant="body1"
                    fontWeight={500}
                    textAlign="center"
                    mb={2}
                  >
                    Delivery Details
                  </Typography>
                  <TableContainer
                    sx={{
                      borderRadius: "10px",
                      border: "1px solid",
                      borderColor: (theme) => theme.palette.primary.main,
                    }}
                  >
                    <Table aria-label="simple table" sx={{ minWidth: "100%" }}>
                      <TableHead>
                        <TableRow>
                          <TableCell align="left">Address</TableCell>
                          <TableCell align="left">Delivery Date</TableCell>
                          <TableCell align="left">Delivery Time</TableCell>
                          <TableCell align="left">Quantity</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {jobDetail?.drop &&
                          jobDetail?.drop?.length > 0 &&
                          jobDetail?.drop.map((item, index) => {
                            return (
                              <TableRow
                                key={`jobDetail${index}`}
                                sx={{
                                  "&:last-child td, &:last-child th": {
                                    border: 0,
                                  },
                                }}
                              >
                                <TableCell component="th" scope="row">
                                  <Typography component="p" variant="body2">
                                    {item?.address}
                                  </Typography>
                                </TableCell>
                                <TableCell>
                                  <Typography component="p" variant="body2">
                                    {item?.item?.drop_date}
                                  </Typography>
                                </TableCell>
                                <TableCell>
                                  <Typography component="p" variant="body2">
                                    {item?.item?.drop_time}
                                  </Typography>
                                </TableCell>
                                <TableCell>
                                  <Typography component="p" variant="body2">
                                    {item?.item?.quantity}
                                  </Typography>
                                </TableCell>
                              </TableRow>
                            );
                          })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Container>
      </Box>
    </React.Fragment>
  );
};

export default ViewJobHistory;
