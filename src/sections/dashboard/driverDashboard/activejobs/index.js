import { TextBox } from "@/components/form";
import Iconify from "@/components/iconify/Iconify";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  Divider,
  Grid,
  IconButton,
  Modal,
  Pagination,
  PaginationItem,
  Rating,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import CountUp from "react-countup";
import DashboardCard from "@/module/dashboard/driverCard/dashboardCard";
import axiosInstance from "@/utils/axios";
import { useAuthContext } from "@/auth/useAuthContext";
import { useFormik } from "formik";
import { useSnackbar } from "notistack";
import Alert from "@mui/material/Alert";
import { PDFViewer } from "@react-pdf/renderer";
import InvoicePDF from "./InvoicePDF";
import { useDispatch, useSelector } from "@/redux/store";
import {
  getJobActive,
  getJobHistory,
  setJobActivePage,
} from "@/redux/slices/job/driver";
import TextMaxLine from "@/components/text-max-line";

const DashboardJobPost = () => {
  const dispatch = useDispatch();
  const {
    jobActive: { pageCount, data, page, pageSize },
    jobHistory,
  } = useSelector((state) => state.driverJob);

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
  // const [openPDf, setOpenPDF] = React.useState(false);
  const [select, setSelect] = React.useState("new");

  const [pageData, setPageData] = React.useState({});

  const [confirmOpen, setConfirmOpen] = React.useState(false);
  const handleConfirmOpen = (id) => setConfirmOpen(id);
  const handleCofirmClose = () => setConfirmOpen(false);

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

  const [loader, setLoader] = React.useState(false);
  const [addItemInvoiceData, setAddItemInvoiceData] = React.useState([]);


  const formData = useFormik({
    initialValues: {
      id: "",
      driver_id: user?.id,
    },
  });

  const formDataInvoice = useFormik({
    initialValues: {
      // user_id: items?.user_id,
        invoice_number: storeInvoiceNumber?.invoice_number,
        // job_id: items?.accept_bid?.job_id,
        sign_image:'www.img.com'
    },
  });

  const confirmJobApi = async () => {
    await axiosInstance
      .post("api/auth/jobs/confirm-job", formData.values)
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
                lineHeight: "30px",
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
          setConfirmOpen(false);
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

        // enqueueSnackbar(response.data.error, {
        //   variant: "error",
        // });
        console.log(error);
      });
  };

  // Start Job Api
  const startJobApi = async () => {
    await axiosInstance
      .post("api/auth/jobs/start-job", formData.values)
      .then((response) => {
        if (response.status === 200) {
          enqueueSnackbar(
            <Alert
              style={{
                width: "100%",
                padding: "30px",
                backdropFilter: "blur(8px)",
                background: "#ff7533 ",
                fontSize: "19px",
                fontWeight: 800,
                lineHeight: "30px",
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

        // enqueueSnackbar(response.data.error, {
        //   variant: "error",
        // });
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
console.log('storeInvoiceNumber',storeInvoiceNumber,addItemInvoiceData);

const HandleAddSendInvoices =  async () => {
  const initialValues =  {
        user_id: addItemInvoiceData?.driver_id,
          invoice_number: storeInvoiceNumber?.invoice_number,
          job_id: addItemInvoiceData.id,
          sign_image:'www.img.com'
      }
    await axiosInstance
        .post("api/auth/invoice/add-send",initialValues)
        .then((response) => {
          if (response.status === 200) {
            enqueueSnackbar(
              <Alert
                style={{
                  width: "100%",
                  padding: "30px",
                  backdropFilter: "blur(8px)",
                  background: "#ff7533 ",
                  fontSize: "19px",
                  fontWeight: 800,
                  lineHeight: "30px",
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
          }
        })
        .catch((error) => {
          console.log(error);
        });
  }

// const HandleAddSendInvoice = async () => {
//     await axiosInstance
//       .post("api/auth/invoice/add-send",
//       {
//         user_id: '',
//         invoice_number: storeInvoiceNumber?.invoice_number,
//         job_id: '',
//         sign_image:'www.img.com'
//       },)
//       .then((response) => {
//         if (response.status === 200) {
//           enqueueSnackbar(
//             <Alert
//               style={{
//                 width: "100%",
//                 padding: "30px",
//                 backdropFilter: "blur(8px)",
//                 background: "#ff7533 ",
//                 fontSize: "19px",
//                 fontWeight: 800,
//                 lineHeight: "30px",
//               }}
//               icon={false}
//               severity="success"
//             >
//               {response?.data?.message}
//             </Alert>,
//             {
//               variant: "success",
//               iconVariant: true,
//               anchorOrigin: {
//                 vertical: "top",
//                 horizontal: "center",
//               },
//             }
//           );
//         }
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };
  
  const completeJobApi = async () => {
    await axiosInstance
      .post("api/auth/jobs/complete-job", formData.values)
      .then((response) => {
        if (response.status === 200) {
          setCompleteOpen(false);
          setReviewOpen(true);
    handleReviewOpen(true);
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
                lineHeight: "30px",
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

          setTimeout(() => {
            HandleAddSendInvoices();
          }, 9000);
          
         
        }
      })
      .catch((error) => {
        console.log(error);
        setTimeout(() => {
          HandleAddSendInvoices();
        }, 9000);
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
          // HandleAddSendInvoices()
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
                  lineHeight: "30px",
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

  // useEffect(() => {
  //   formik.setFieldValue("id", startOpen);
  // }, [startOpen]);
  // useEffect(() => {
  //   formik.setFieldValue("driver_id", user?.id);
  // }, [user, user?.id]);
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
                            {/* <Typography
                              color="common.black"
                              fontSize={17}
                              sx={{
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                              }}
                              fontWeight={500}
                            >
                              {elem?.description}
                            </Typography> */}
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
                                {/* <Typography fontSize={28} fontWeight={500}>
                                  {elem.name}
                                </Typography> */}
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
                                      {elem.items[0].product.material}
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
                                      {`${elem.items[0].product.length}*${elem.items[0].product.width}*${elem.items[0].product.height}`}
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
                                      {elem.items[0].product.quantity} Qty
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
                                  <Box>
                                    {elem.status === 1 ? (
                                      <>
                                        <Button
                                          color="success"
                                          fullWidth
                                          variant="outlined"
                                          startIcon={
                                            <Iconify icon="icon-park:check-correct" />
                                          }
                                          onClick={() => {
                                            formData.setFieldValue(
                                              "id",
                                              elem?.bid_id
                                            );
                                            setConfirmOpen(true);
                                          }}
                                          sx={{
                                            fontWeight: 500,
                                          }}
                                        >
                                          Confirm Job
                                        </Button>
                                        {/* {elem.is_paid === 0 && (
                                          <Button
                                            fullWidth
                                            color="info"
                                            variant="outlined"
                                            disabled
                                          >
                                            Wait Please
                                          </Button>
                                        )} */}
                                      </>
                                    ) : elem.status === 2 ? (
                                      <>
                                        {elem.is_paid === 0 &&  elem?.created_by == 'customer' ? (
                                          <Button
                                            fullWidth
                                            color="info"
                                            variant="outlined"
                                            disabled
                                          >
                                            Wait For Payment
                                          </Button>
                                        ) : (
                                          <Button
                                            color="success"
                                            fullWidth
                                            variant="outlined"
                                            startIcon={
                                              <Iconify icon="icon-park:check-correct" />
                                            }
                                            onClick={() => {
                                              formData.setFieldValue(
                                                "id",
                                                elem?.bid_id
                                              );
                                              setStartOpen(true);
                                            }}
                                            sx={{
                                              fontWeight: 500,
                                            }}
                                          >
                                            Start Job
                                          </Button>
                                        )}
                                      </>
                                    ) : (
                                      <>
                                        <Button
                                          sx={{ fontWeight: 500 }}
                                          fullWidth
                                          color="success"
                                          variant="outlined"
                                          startIcon={
                                            <Iconify icon="carbon:task-complete" />
                                          }
                                          onClick={() => {
                                            // HandleAddSendInvoices(elem);
                                            formData.setFieldValue(
                                              "id",
                                              elem?.bid_id
                                            );
                                            formik.setFieldValue(
                                              "job_id",
                                              elem?.id
                                            );
                                            setCompleteOpen(true);
                                            setAddItemInvoiceData(elem);
                                          }}
                                        >
                                          Complete Job
                                        </Button>
                                      </>
                                    )}
                                  </Box>

                                  {/* <Box>
                                  <Button
                                    sx={{ fontWeight: 500 }}
                                    fullWidth
                                    color="success"
                                    variant="outlined"
                                    startIcon={<Iconify icon="carbon:star" />}
                                    onClick={() => handleReviewOpen(1)}
                                  >
                                    Give Review
                                  </Button>
                                </Box> */}
                                  {elem?.status != 0 && elem?.status != 1 && elem?.is_paid == 1  && (
                                    <Box>
                                      <Button
                                        color="secondary"
                                        fullWidth
                                        variant="outlined"
                                        startIcon={<Iconify icon="gg:track" />}
                                        onClick={() =>
                                          router.push(
                                            `/dashboard/driver/track_job/${elem.bid_id}`
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
                                  {/* <Box>
                                    <Button
                                      sx={{ fontWeight: 500 }}
                                      fullWidth
                                      variant="outlined"
                                      startIcon={
                                        <Iconify icon="carbon:view-filled" />
                                      }
                                      onClick={() => setOpenPDF(true)}
                                    >
                                      View PDF
                                    </Button>
                                  </Box> */}
                                </Stack>
                              </Stack>
                              <Stack
                                mt={1}
                                position="absolute"
                                right={33}
                              ></Stack>
                            </Grid>
                          </Grid>
                          {/* <Box pt={2}>
                            <Typography fontSize={14}>
                              {" "}
                              {elem?.description}
                            </Typography>
                          </Box> */}

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
                                {/* Job Budget: <Iconify icon="bi:currency-pound" /> */}
                                {/* {elem?.budget} */}
                              </Typography>
                              {/* <Typography variant="subtitle2">
                              Total Spend: $30K+
                            </Typography> */}
                             
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
                open={confirmOpen}
                onClose={handleCofirmClose}
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
                    Are you sure you want to confirm the job?
                  </Typography>
                  <Stack direction="row" spacing={8}>
                    <Button
                      fullWidth
                      variant="outlined"
                      onClick={() => {
                        confirmJobApi();
                      }}
                    >
                      Yes
                    </Button>
                    <Button
                      fullWidth
                      variant="outlined"
                      onClick={() => {
                        handleCofirmClose();
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
                    Are you sure you have Start the job?
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
                      <Typography textAlign="left" variant="p">
                        Image of the item
                      </Typography>
                      {!formik.values.company_certificate && (
                        <TextBox
                          variant="standard"
                          fullWidth
                          type="file"
                          size="small"
                          value=""
                          name="company_certificate"
                          onChange={(e) => {
                            formik.setFieldValue(
                              "company_certificate",
                              e.target.files[0]
                            );
                            formik.setFieldValue(
                              "company_certificate_url",
                              URL.createObjectURL(e.target.files[0])
                            );
                          }}
                          helperText={
                            formik.touched.company_certificate &&
                            formik.errors.company_certificate
                          }
                          isAdditional={true}
                          textBoxSx={{
                            "& .MuiInput-root:after": {
                              borderBottom: "0px !important",
                            },
                            "& .MuiInput-root:before": {
                              borderBottom: "0px !important",
                              content: '""',
                            },
                          }}
                        />
                      )}

                      {formik.values.company_certificate_url && (
                        <Card sx={{ width: "max-content" }}>
                          <CardContent
                            sx={{
                              pb: "10px !important",
                              pt: "30px !important",
                              px: "10px !important",
                            }}
                          >
                            <Box
                              sx={{
                                position: "absolute",
                                top: 5,
                                right: 6,
                              }}
                            >
                              <Card sx={{ borderRadius: "50%" }}>
                                <IconButton
                                  size="small"
                                  onClick={() => {
                                    formik.setFieldValue(
                                      "company_certificate",
                                      ""
                                    );
                                    formik.setFieldValue(
                                      "company_certificate_url",
                                      ""
                                    );
                                  }}
                                >
                                  <Close fontSize="small" />
                                </IconButton>
                              </Card>
                            </Box>
                            <Box
                              component="img"
                              style={{ margin: "10px" }}
                              src={formik.values.company_certificate_url}
                              alt={formik.values.company_certificate.name}
                              width="150px"
                              height="150px"
                              thumbnail
                            />
                          </CardContent>
                        </Card>
                      )}

                      <Typography textAlign="left" variant="p">
                        Sign Image
                      </Typography>
                      {!formik.values.company_vat && (
                        <TextBox
                          variant="standard"
                          fullWidth
                          type="file"
                          size="small"
                          value=""
                          name="company_vat"
                          onChange={(e) => {
                            formik.setFieldValue(
                              "company_vat",
                              e.target.files[0]
                            );
                            formik.setFieldValue(
                              "company_vat_url",
                              URL.createObjectURL(e.target.files[0])
                            );
                          }}
                          helperText={
                            formik.touched.company_vat &&
                            formik.errors.company_vat
                          }
                          isAdditional={true}
                          textBoxSx={{
                            "& .MuiInput-root:after": {
                              borderBottom: "0px !important",
                            },
                            "& .MuiInput-root:before": {
                              borderBottom: "0px !important",
                              content: '""',
                            },
                          }}
                        />
                      )}

                      {formik.values.company_vat_url && (
                        <Card sx={{ width: "max-content" }}>
                          <CardContent
                            sx={{
                              pb: "10px !important",
                              pt: "30px !important",
                              px: "10px !important",
                            }}
                          >
                            <Box
                              sx={{
                                position: "absolute",
                                top: 5,
                                right: 6,
                              }}
                            >
                              <Card sx={{ borderRadius: "50%" }}>
                                <IconButton
                                  size="small"
                                  onClick={() => {
                                    formik.setFieldValue("company_vat", "");
                                    formik.setFieldValue("company_vat_url", "");
                                  }}
                                >
                                  <Close fontSize="small" />
                                </IconButton>
                              </Card>
                            </Box>
                            <Box
                              component="img"
                              style={{ margin: "10px" }}
                              src={formik.values.company_vat_url}
                              alt={formik.values.company_vat.name}
                              width="150px"
                              height="150px"
                              thumbnail
                            />
                          </CardContent>
                        </Card>
                      )}
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
                      <Box></Box>
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
            {/* <Stack alignItems="center">
              <Box>
                <Typography variant="h5">No Active Jobs.....</Typography>
              </Box>
              <Box
                component="img"
                sx={{ width: "400px" }}
                src="/assets/images/home/new/banner-image.jpg"
                alt="truck"
              />
            </Stack> */}
          </Box>
        </Container>
      </Box>
      {/* <Dialog fullScreen open={openPDf}>
        <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
          <DialogActions
            sx={{
              zIndex: 9,
              padding: "12px !important",
              boxShadow: (theme) => theme.customShadows.z8,
            }}
          >
            <Tooltip title="Close">
              <IconButton color="inherit" onClick={() => setOpenPDF(false)}>
                <Iconify icon="eva:close-fill" />
              </IconButton>
            </Tooltip>
          </DialogActions>
          <Box sx={{ flexGrow: 1, height: "100%", overflow: "hidden" }}>
            <PDFViewer
              fileName={`Test-Name`}
              width="100%"
              height="100%"
              style={{ border: "none" }}
              showToolbar={false}
            >
              <InvoicePDF />
            </PDFViewer>
          </Box>
        </Box>
      </Dialog> */}
    </React.Fragment>
  );
};

export default DashboardJobPost;
