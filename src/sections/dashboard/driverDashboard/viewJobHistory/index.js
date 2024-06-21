import Iconify from "@/components/iconify/Iconify";
import axiosInstance from "@/utils/axios";
import { ConstructionOutlined } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
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
              onClick={() => router.push("/dashboard/driver/job_history")}
            >
              <Iconify icon="ion:play-back" sx={{ mr: "7px" }} width={14} />
              Back
            </Button>
            <Card sx={{ position: "relative" }}>
              <Typography textAlign="center" variant="h6" my={1} fontSize={17}>
                Job Detail
              </Typography>
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
                <Box my={4}>
                  <Divider />

                  <Box my={3}>
                    <Box>
                      <Typography textAlign="center" variant="h4">
                        Rating & Reviews
                      </Typography>
                    </Box>
                  </Box>
                  {jobDetail?.ratings &&
                    jobDetail?.ratings?.length > 0 &&
                    jobDetail?.ratings?.map((item, index) => {
                      return (
                        <Box key={index}> 
                          <Stack spacing={3} direction="row" py={2}>
                            <Box
                              component="img"
                              src={`${item?.user?.base_url}${item?.user?.profile_img}`}
                              width={60}
                              height={60}
                              sx={{ objectFit: "cover" }}
                            />
                            <Stack direction="column">
                              <Box>
                                <Typography
                                  fontSize={16}
                                  fontWeight={500}
                                  color="primary"
                                >
                                  {item?.user?.user_name}
                                </Typography>
                              </Box>
                              <Box>
                                <Rating
                                  value={item?.rating}
                                  readOnly
                                  size="small"
                                />
                              </Box>
                              <Box>
                                <Typography fontSize={14}>
                                  {item?.review}
                                </Typography>
                              </Box>
                            </Stack>
                          </Stack>
                          <Divider />
                        </Box>
                      );
                    })}
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Container>
      </Box>

      <Modal
        open={addressOpen}
        onClose={handleAddressClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "80%",
            bgcolor: "background.paper",
            boxShadow: 24,
            borderRadius: "10px",
            p: 4,
          }}
        >
          <TableContainer
            sx={{
              borderRadius: "10px",
              border: "1px solid",
              borderColor: (theme) => theme.palette.grey[300],
            }}
          >
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="left">Sr. No.</TableCell>
                  <TableCell align="left">Address</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {addressOpen &&
                  addressOpen?.length > 0 &&
                  addressOpen.map((item, index) => {
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
                          <Typography>{index + 1}</Typography>
                        </TableCell>
                        <TableCell align="left">
                          <Typography
                            sx={{ maxWidth: "52em", wordWrap: "break-word" }}
                          >
                            {item?.address}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Modal>
    </React.Fragment>
  );
};

export default ViewJobHistory;
