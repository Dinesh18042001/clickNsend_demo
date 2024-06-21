import { useAuthContext } from "@/auth/useAuthContext";
import { TextBox } from "@/components/form";
import Iconify from "@/components/iconify/Iconify";
import TextMaxLine from "@/components/text-max-line";
import DashboardCard from "@/module/dashboard/companyCard/dashboardCard";
import {
  getJobActive,
  getJobHistory,
  setJobActivePage,
} from "@/redux/slices/job/company";
import { useDispatch, useSelector } from "@/redux/store";
import axiosInstance from "@/utils/axios";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Dialog,
  DialogContent,
  Divider,
  Grid,
  Modal,
  Pagination,
  PaginationItem,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";  import Alert from '@mui/material/Alert';
import React, { useEffect, useState } from "react";
import CountUp from "react-countup";

const DashboardAddJob = () => {
  const dispatch = useDispatch();
  const {
    jobActive: { pageCount, data, page, pageSize },
    jobHistory,
  } = useSelector((state) => state.companyJob);

  const handlePageChange = (event, value) => {
    dispatch(setJobActivePage(value));
  };

  React.useEffect(() => {
    dispatch(
      getJobActive({
        user_id: user?.id,
        type: user?.user_type,
        lat: 0,
        long: 0,
      })
    );
  }, [page]);
  const router = useRouter();
  const { user } = useAuthContext();
  const { enqueueSnackbar } = useSnackbar();
  const [layout, setLayout] = useState(false);
  const [setPage] = React.useState(1);
  const [open, setOpen] = React.useState(false);
  const [select, setSelect] = React.useState("new");

  const [pageData, setPageData] = React.useState({});

  const [startOpen, setStartOpen] = React.useState(false);
  const handleStartOpen = (id) => setStartOpen(id);
  const handleStartClose = () => setStartOpen(false);

  const [completeOpen, setCompleteOpen] = React.useState(false);
  const handleCompleteOpen = (id) => setCompleteOpen(id);
  const handleCompleteClose = () => setCompleteOpen(false);

  // Rating
  const [reviewOpen, setReviewOpen] = React.useState(false);
  const handleReviewOpen = (id) => setReviewOpen(id);
  const handleReviewClose = () => setReviewOpen(false);

  const [storeInvoiceNumber, setStoreInvoiceNumber] = React.useState();
  const formData = useFormik({
    initialValues: {
      id: "",
      driver_id: user?.id,
    },
  });
  // Start Job Api
  const startJobApi = async () => {
    await axiosInstance
      .post("api/auth/jobs/start-job", formData.values)
      .then((response) => {
        if (response.status === 200) {
          // succes
          enqueueSnackbar(
            <Alert
              style={{
                width: "100%",
                padding: "30px",
                backdropFilter: "blur(8px)",
                background: "#ff7533 ",
                fontSize: "19px",
                fontWeight: 800,
                lineHeight: "30px"
              }}
              icon={false}
              severity="success"
            >
              {response?.data?.message}
            </Alert>,
            {
              variant: "success",
              iconVariant: true,
              anchorOrigin: {
                vertical: "top",
                horizontal: "center",
              },
            }
          );
          setStartOpen(false);
          dispatch(
            getJobActive({
              user_id: user?.id,
              type: user?.user_type,
              lat: 0,
              long: 0,
            })
          );
          handleClose(true);
        }
      })
      .catch((error) => {
        const { response } = error;
        console.log(error);
      });
  };

  useEffect(() => {
    formik.setFieldValue("user_id", user?.id);
  }, [user, user?.id]);

    React.useEffect(() => {
      const fetchdata = async () => {
        await axiosInstance
          .get("api/auth/invoice/number")
          .then((response) => {
            if (response.status === 200) {
              setStoreInvoiceNumber(response?.data) 
            }
          })
          .catch((error) => {
            const { response } = error;
            console.log(error);
          });
      };
    fetchdata();
  }, []);
  
  // Complete Job Api
  const completeJobApi = async () => {
    await axiosInstance
      .post("api/auth/jobs/complete-job", formData.values)
      .then((response) => {
        if (response.status === 200) {
          setCompleteOpen(false);
          setReviewOpen(true);
          // data.forEach((job) => {
          //   if (job.created_by == 'customer') {
          //     alert('customer 4') 
              
          //      axiosInstance
          //       .post(
          //         "api/auth/invoice/add-send",
          //         {
          //           user_id: job.user_id,
          //           invoice_number: storeInvoiceNumber?.invoice_number,
          //           job_id: job.accept_bid.job_id,
          //           sign_image:'www.img.com'
          //         },
          //       )
          //       .then((invoiceResponse) => {
          //         console.log( "api/auth/invoice/add-send",invoiceResponse.data); // Handle the response as needed
          //       })
          //       .catch((error) => {
          //         console.error("Error sending invoice:", error);
          //       });
          //   }
          // });
          dispatch(
            getJobActive({
              user_id: user?.id,
              type: user?.user_type,
              lat: 0,
              long: 0,
            })
          );
          dispatch(
            getJobHistory({
              user_id: user?.id,
              type: user?.user_type,
              lat: 0,
              long: 0,
            })
          );
          // succes
          enqueueSnackbar(
            <Alert
              style={{
                width: "100%",
                padding: "30px",
                backdropFilter: "blur(8px)",
                background: "#ff7533 ",
                fontSize: "19px",
                fontWeight: 800,
                lineHeight: "30px"
              }}
              icon={false}
              severity="success"
            >
              {response?.data?.message}
            </Alert>,
            {
              variant: "success",
              iconVariant: true,
              anchorOrigin: {
                vertical: "top",
                horizontal: "center",
              },
            }
          );
          handleClose(true);
          
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const formik = useFormik({
    initialValues: {
      job_id: "",
      user_id: "",
      given_by: "driver",
      rating: "",
      review: "",
    },
    validate: (values) => {
      const errors = {};
      if (!values.review) {
        errors.review = "Note is required";
      }
      if (!values.rating) {
        errors.rating = "Rating is required";
      }
      return errors;
    },
    onSubmit: async (values) => {
      await axiosInstance
        .post("api/auth/rating/add", formik.values)
        .then((response) => {
          if (response.status === 200) {
            setReviewOpen(false);
            enqueueSnackbar(
            <Alert
              style={{
                width: "100%",
                padding: "30px",
                backdropFilter: "blur(8px)",
                background: "#ff7533 ",
                fontSize: "19px",
                fontWeight: 800,
                lineHeight: "30px"
              }}
              icon={false}
              severity="success"
            >
              {response?.data?.message}
            </Alert>,
            {
              variant: "success",
              iconVariant: true,
              anchorOrigin: {
                vertical: "top",
                horizontal: "center",
              },
            }
          );
            dispatch(
              getJobActive({
                user_id: user?.id,
                type: user?.user_type,
                lat: 0,
                long: 0,
              })
            );
            handleClose(true);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  });

  return (
    <React.Fragment>
      <Box py={3} pb={12}>
        <Container>
          <Box py={5}>
            <DashboardCard activeJob={data} />
          </Box>
          <Box py={2}>
            <Grid container spacing={2}>
              <Grid item md={12}>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Typography
                    fontSize="1.75rem"
                    fontWeight={600}
                    color="primary"
                  >
                    Active Jobs
                  </Typography>

                  <Box
                    borderRadius="50%"
                    border="1px solid"
                    borderColor={(theme) => theme.palette.primary.main}
                    color={(theme) => theme.palette.primary.main}
                    py={0.6}
                    px={1.8}
                  >
                    <Typography
                      fontSize="1.3rem"
                      fontWeight={500}
                      color="primary"
                    >
                      <CountUp
                        start={0}
                        duration={1}
                        end={data.length}
                        enableScrollSpy={true}
                        scrollSpyDelay={200}
                      />
                    </Typography>
                  </Box>
                </Stack>
              </Grid>
            </Grid>
          </Box>

          <Box py={2} sx={{ background: " " }}>
            <Grid container rowSpacing={0} justifyContent="center">
              {data && data.length > 0 ? (
                data.map((elem, index) => {
                  let productDetail =
                    elem?.items && elem?.items?.length > 0 && elem?.items[0];
                  let addressDetail =
                    elem?.items && elem?.items?.length > 0 && elem?.items[0];
                  return (
                    <Grid item md={12} key={index}>
                      <Card
                        sx={{
                          my: 2,
                          borderWidth: "2px",
                          ":hover": {
                            borderColor: "#ff7534",
                            transition: " all 0.3s ease-in-out",
                          },
                        }}
                        variant="outlined"
                      >
                        <Stack
                          direction="row"
                          justifyContent="space-between"
                          px={2}
                          py={1.4}
                          alignItems="center"
                        >
                          <Box sx={{ width: "90%" }}>
                            <TextMaxLine
                              line={2}
                              color="common.black"
                              fontSize={17}
                            >
                              {elem?.description}
                            </TextMaxLine>
                          </Box>
                        </Stack>
                        <Divider />
                        <CardContent>
                          <Grid container spacing={2} alignItems="start">
                            <Grid item md={4}>
                              <Box>
                                <TextMaxLine
                                  line={2}
                                  color="common.black"
                                  fontSize={28}
                                  fontWeight={500}
                                >
                                  {elem.name}
                                </TextMaxLine>
                              </Box>
                              <Stack direction="row" spacing={2} mb={2}>
                                <Stack
                                  direction="row"
                                  alignItems="center"
                                  spacing={0.6}
                                >
                                  <Stack alignItems="center">
                                    <Iconify
                                      icon="bx:layer"
                                      color={(theme) =>
                                        theme.palette.primary.main
                                      }
                                      width={22}
                                    />
                                  </Stack>
                                  <Box>
                                    <Typography fontSize={12} color="grey">
                                      {elem?.items &&
                                        elem?.items?.length > 0 &&
                                        elem?.items[0]?.product?.material}
                                    </Typography>
                                  </Box>
                                </Stack>
                                <Stack
                                  direction="row"
                                  alignItems="center"
                                  spacing={0.6}
                                >
                                  <Stack alignItems="center">
                                    <Iconify
                                      icon="gg:expand"
                                      color={(theme) =>
                                        theme.palette.primary.main
                                      }
                                      width={22}
                                    />
                                  </Stack>
                                  <Box>
                                    <Typography fontSize={12} color="grey">
                                      {`${
                                        elem?.items &&
                                        elem?.items?.length > 0 &&
                                        elem?.items[0]?.product?.length
                                      }*${
                                        elem?.items &&
                                        elem?.items?.length > 0 &&
                                        elem?.items[0]?.product?.width
                                      }*${
                                        elem?.items &&
                                        elem?.items?.length > 0 &&
                                        elem?.items[0]?.product?.height
                                      }`}
                                    </Typography>
                                  </Box>
                                </Stack>
                                <Stack
                                  direction="row"
                                  alignItems="center"
                                  spacing={0.6}
                                >
                                  <Stack alignItems="center">
                                    <Iconify
                                      icon="uil:weight"
                                      color={(theme) =>
                                        theme.palette.primary.main
                                      }
                                      width={22}
                                    />
                                  </Stack>
                                  <Box>
                                    <Typography fontSize={12} color="grey">
                                      {elem?.items &&
                                        elem?.items?.length > 0 &&
                                        elem?.items[0]?.product?.quantity}{" "}
                                      Qty
                                    </Typography>
                                  </Box>
                                </Stack>
                              </Stack>
                              <Stack direction="row" spacing={1}>
                                {elem.items.map((elem, index) => {
                                  if (index > 2) {
                                    return "";
                                  }
                                  return (
                                    <React.Fragment key={index}>
                                      <Box
                                        component="img"
                                        alt={elem.product.image}
                                        src={`${elem.product.base_url}${elem.product.image}`}
                                        sx={{
                                          width: "83px",
                                          height: "59px",
                                          border: "1px solid lightgrey",
                                          objectFit: "fill",
                                          borderRadius: "4px",
                                          backgroundSize: "cover",
                                          backgroundRepeat: "no-repeat",
                                          objectFit: "contain",
                                        }}
                                      />
                                    </React.Fragment>
                                  );
                                })}
                              </Stack>
                            </Grid>
                            <Grid item md={6}>
                              <Stack
                                direction="row"
                                spacing={3}
                                divider={
                                  <Divider orientation="vertical" flexItem />
                                }
                              >
                                <Stack
                                  direction="row"
                                  spacing={2}
                                  alignItems="center"
                                >
                                  <Box>
                                    <Box>
                                      <Typography
                                        fontSize={13}
                                        fontWeight={600}
                                      >
                                        Pick up Date
                                      </Typography>
                                    </Box>
                                    <Stack
                                      direction="row"
                                      spacing={1}
                                      alignItems="center"
                                    >
                                      <Box
                                        sx={{
                                          backgroundColor: "#FEE6BB",
                                          width: "28px",
                                          height: "28px",
                                          borderRadius: "50%",
                                          p: "5px",
                                        }}
                                      >
                                        <Iconify
                                          color={(theme) =>
                                            theme.palette.primary.main
                                          }
                                          icon="majesticons:calendar-line"
                                        />
                                      </Box>
                                      <Box>
                                        <Typography
                                          color="grey"
                                          fontWeight={400}
                                          fontSize={13}
                                        >
                                          {productDetail?.product
                                            ?.pickup_date || "N/A"}
                                        </Typography>
                                      </Box>
                                    </Stack>
                                  </Box>

                                  <Box>
                                    <Box>
                                      <Typography
                                        fontSize={13}
                                        fontWeight={600}
                                      >
                                        Pick up Time
                                      </Typography>
                                    </Box>
                                    <Stack
                                      direction="row"
                                      spacing={1}
                                      alignItems="center"
                                    >
                                      <Box
                                        sx={{
                                          backgroundColor: "#FEE6BB",
                                          width: "28px",
                                          height: "28px",
                                          borderRadius: "50%",
                                          p: "5px",
                                        }}
                                      >
                                        <Iconify
                                          color={(theme) =>
                                            theme.palette.primary.main
                                          }
                                          icon="majesticons:calendar-line"
                                        />
                                      </Box>
                                      <Box>
                                        <Typography
                                          color="grey"
                                          fontWeight={400}
                                          fontSize={13}
                                        >
                                          {productDetail?.product
                                            ?.pickup_time || "N/A"}
                                        </Typography>
                                      </Box>
                                    </Stack>
                                  </Box>
                                </Stack>
                                <Stack
                                  direction="row"
                                  spacing={2}
                                  alignItems="center"
                                >
                                  <Box>
                                    <Box>
                                      <Typography
                                        fontSize={13}
                                        fontWeight={600}
                                      >
                                        Delivery out Date
                                      </Typography>

                                      <Stack
                                        direction="row"
                                        spacing={1}
                                        alignItems="center"
                                      >
                                        <Box
                                          sx={{
                                            backgroundColor: "#FEE6BB",
                                            width: "28px",
                                            height: "28px",
                                            borderRadius: "50%",
                                            p: "5px",
                                          }}
                                        >
                                          <Iconify
                                            color={(theme) =>
                                              theme.palette.primary.main
                                            }
                                            icon="majesticons:calendar-line"
                                          />
                                        </Box>
                                        <Box>
                                          <Typography
                                            color="grey"
                                            fontWeight={400}
                                            fontSize={13}
                                          >
                                            {productDetail?.product
                                              ?.drop_date || "N/A"}
                                          </Typography>
                                        </Box>
                                      </Stack>
                                    </Box>
                                  </Box>
                                  <Box>
                                    <Box>
                                      <Typography
                                        fontSize={13}
                                        fontWeight={600}
                                      >
                                        Delivery out Time
                                      </Typography>
                                    </Box>
                                    <Stack
                                      direction="row"
                                      spacing={1}
                                      alignItems="center"
                                    >
                                      <Box
                                        sx={{
                                          backgroundColor: "#FEE6BB",
                                          width: "28px",
                                          height: "28px",
                                          borderRadius: "50%",
                                          p: "5px",
                                        }}
                                      >
                                        <Iconify
                                          color={(theme) =>
                                            theme.palette.primary.main
                                          }
                                          icon="majesticons:calendar-line"
                                        />
                                      </Box>
                                      <Box>
                                        <Typography
                                          color="grey"
                                          fontWeight={400}
                                          fontSize={13}
                                        >
                                          {productDetail?.product?.drop_time ||
                                            "N/A"}
                                        </Typography>
                                      </Box>
                                    </Stack>
                                  </Box>
                                </Stack>
                              </Stack>
                            </Grid>
                            <Grid item md={2}>
                              <Stack
                                direction="row"
                                justifyContent="space-between"
                                alignItems="center"
                                spacing={1}
                              >
                                <Stack spacing={1}>
                                  {elem?.status != 0 && elem?.status != 1 && (
                                    <Box>
                                      <Button
                                        color="secondary"
                                        fullWidth
                                        variant="outlined"
                                        startIcon={<Iconify icon="gg:track" />}
                                        onClick={() =>
                                          router.push(
                                            `/dashboard/company/track_job/${elem.bid_id}/${elem.id}/${elem.user_id}`
                                          )
                                        }
                                        sx={{
                                          fontWeight: 500,
                                        }}
                                      >
                                        Track Job
                                      </Button>
                                    </Box>
                                  )}
                                </Stack>
                              </Stack>
                              <Stack
                                mt={1}
                                position="absolute"
                                right={33}
                              ></Stack>
                            </Grid>
                          </Grid>
                          <Divider sx={{ my: 2 }} />
                          <Box>
                            <Stack
                              direction="row"
                              alignItems="center"
                              justifyContent="space-between"
                            >
                              <Typography
                                variant="subtitle2"
                                sx={{
                                  display: "flex",
                                  alignItems: "flex-start",
                                }}
                              >
                                {/* Job Budget: <Iconify icon="bi:currency-pound" />
                                {elem?.budget} */}
                              </Typography>
                              <Typography
                                variant="subtitle2"
                                sx={{
                                  display: "flex",
                                  alignItems: "flex-start",
                                }}
                              >
                                Customer Spend:{" "}
                                <Iconify icon="bi:currency-pound" />
                                {elem?.spentmoney}+
                              </Typography>
                            </Stack>
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>
                  );
                })
              ) : (
                <Box my={6}>
                  <Typography variant="h4">No Active Jobs</Typography>
                </Box>
              )}
            </Grid>
            <Box>
              <Modal
                open={completeOpen}
                onClose={handleCompleteClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-review"
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    textAlign: "center",
                    transform: "translate(-50%, -50%)",

                    bgcolor: "background.paper",
                    border: "1px solid #f5f5f5",
                    boxShadow: 24,
                    p: 4,
                  }}
                  component="form"
                  noValidate
                >
                  <Typography mb={2}>
                    Are you sure you have completed the job?
                  </Typography>
                  <Stack direction="row" spacing={8}>
                    <Button
                      fullWidth
                      variant="outlined"
                      onClick={() => {
                        completeJobApi();
                      }}
                    >
                      Yes
                    </Button>
                    <Button
                      fullWidth
                      variant="outlined"
                      onClick={() => {
                        handleCompleteClose();
                      }}
                    >
                      No
                    </Button>
                  </Stack>
                </Box>
              </Modal>
            </Box>
            <Box>
              <Modal
                open={startOpen}
                onClose={handleStartClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    textAlign: "center",
                    transform: "translate(-50%, -50%)",

                    bgcolor: "background.paper",
                    border: "1px solid #f5f5f5",
                    boxShadow: 24,
                    p: 4,
                  }}
                  component="form"
                  noValidate
                >
                  <Typography mb={2}>
                    Are you sure you want to start the job?
                  </Typography>
                  <Stack direction="row" spacing={8}>
                    <Button
                      fullWidth
                      variant="outlined"
                      onClick={() => {
                        startJobApi();
                      }}
                    >
                      Yes
                    </Button>
                    <Button
                      fullWidth
                      variant="outlined"
                      onClick={() => {
                        handleStartClose();
                      }}
                    >
                      No
                    </Button>
                  </Stack>
                </Box>
              </Modal>
            </Box>
            <Box>
              <Stack alignItems="center" justifyContent="center">
                <Pagination
                  count={pageCount}
                  color="primary"
                  page={page}
                  onChange={handlePageChange}
                  variant="outlined"
                  shape="rounded"
                  renderItem={(item) => (
                    <PaginationItem
                      slots={{
                        previous: () => {
                          return (
                            <Stack
                              direction="row"
                              spacing={0.5}
                              alignItems="center"
                            >
                              <NavigateBeforeIcon />
                            </Stack>
                          );
                        },
                        next: () => {
                          return (
                            <Stack
                              direction="row"
                              spacing={0.5}
                              alignItems="center"
                            >
                              <NavigateNextIcon />
                            </Stack>
                          );
                        },
                      }}
                      {...item}
                    />
                  )}
                />
              </Stack>
            </Box>
            <Box></Box>
            <Box>
              <Dialog
                open={reviewOpen}
                onClose={handleReviewOpen}
                maxWidth="xs"
                fullWidth={true}
              >
                <DialogContent sx={{ my: 3 }}>
                  <Typography mb={2} variant="subtitle1">
                    Review
                  </Typography>
                  <Box
                    component="form"
                    noValidate
                    onSubmit={formik.handleSubmit}
                  >
                    <Stack spacing={2}>
                      <Box>
                        <Rating
                          value={formik.values.rating}
                          onChange={formik.handleChange}
                          name="rating"
                          helperText={
                            formik.touched.rating && formik.errors.rating
                          }
                        />
                      </Box>
                      <Box>
                        <TextBox
                          size="small"
                          name="review"
                          label="Review"
                          fullWidth
                          multiline={true}
                          rows="4"
                          value={formik.values.review}
                          onChange={formik.handleChange}
                          helperText={
                            formik.touched.review && formik.errors.review
                          }
                        />
                      </Box>
                    </Stack>
                    <Stack direction="row" spacing={8}>
                      <Button fullWidth variant="outlined" type="submit">
                        Submit
                      </Button>
                    </Stack>
                  </Box>
                </DialogContent>
              </Dialog>
            </Box>
          </Box>
        </Container>
      </Box>
    </React.Fragment>
  );
};

export default DashboardAddJob;
