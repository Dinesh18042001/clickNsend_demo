import { useAuthContext } from "@/auth/useAuthContext";
import { SelectBox, TextBox } from "@/components/form";
import Iconify from "@/components/iconify/Iconify";
import { JobSekelton } from "@/components/not-found";
import SkeletonLoader from "@/components/skeleton";
import TextMaxLine from "@/components/text-max-line";
// import DashboardCard from "@/module/dashboard/customerCard/dashboardCard";
import DashboardCard from "@/module/dashboard/customercompanyCard/dashboardCard";
import { getJobPost, setJobPostPage } from "@/redux/slices/job/customer";
import { useDispatch, useSelector } from "@/redux/store";
import axiosInstance from "@/utils/axios";
import { Add } from "@mui/icons-material";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineItem,
  TimelineSeparator,
  timelineItemClasses,
} from "@mui/lab";
import {
  Badge,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Dialog,
  DialogContent,
  Divider,
  Grid,
  Pagination,
  PaginationItem,
  Stack,
  Typography,
  alpha,
} from "@mui/material";
import { useFormik } from "formik";
import moment from "moment";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import Alert from "@mui/material/Alert";
import React, { useState } from "react";
import CardPaymentForm from "../paymentPage/CardPaymentForm";
import CountUp from "react-countup";
import CustomerDashboard from "../../customerDashboard";
const DashboardJobPost = ({ formik }) => {
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const dispatch = useDispatch();
  const [date, setDate] = React.useState("");
  const { user } = useAuthContext();
  const [layout, setLayout] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [select, setSelect] = React.useState("new");
  const [loader, setLoader] = React.useState(false);
  const [adress, setAdress] = React.useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [companyData, setCompanyData] = useState([]);

  const address =  user?.profile?.address
  // Add for filter
  const [paymentDetails, setPaymentDetails] = useState(null);
  const addressDetail = {
    address: [{ type: "pickup" }, { type: "delivery" }],
  };
  // Check if addressDetail is defined before accessing its properties.
  const pickupAddresses = addressDetail?.address?.filter(
    (addressItem) => addressItem.type === "pickup"
  );
  const dropAddresses = addressDetail?.address?.filter(
    (addressItem) => addressItem.type === "drop"
  );

  const {
    jobPost: { pageCount, data, page, pageSize, dataCount },
  } = useSelector((state) => state.customerJob);
  const handlePageChange = (event, value) => {
    dispatch(setJobPostPage(value));
  };

  React.useEffect(() => {
    dispatch(
      getJobPost({
        user_id: user?.id,
        type: user?.user_type,
        lat: 0,
        long: 0,
        is_deleted: 0,
        date: date ? moment(date).format("YYYY-MM-DD h:mm:ss") : "",
      })
    ).then(() => {});
  }, [page, pageSize, date]);


  React.useEffect(()=>{
    const fetch = async()=>{
      await axiosInstance
      .get("api/auth/profile/my-profile")
      .then((response) => {
        if (response.status === 200) {
          setAdress(response.data.view_data.profile.address)
          console.log(response.data.view_data.profile.address,"prire")
        }})
      }
    fetch()
  },[])



  React.useEffect(() => {
    if (data) {
      const filteredData = data.filter(compData => 
        compData.created_by === "company" && compData.user_id === user.id
      );
      setCompanyData(filteredData);
    }
  }, [data, user]);
  console.log(companyData?.length,"companyData")
  const handleCheckoutPayment = async (item) => {
    setPaymentDetails(item);
    setShowPayment(true);
  };

  const handleAddNewJob = () => {
    if (user.plan === null) {
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
          Please Buy Subscription
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
    } else {
      if (!address || address.trim() === "") {
        router.push("/company/profile");
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
            Please Update Address
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
      } else {
        router.push("/dashboard/company/job_post_form/create");
      }
    }
  };
  

  return (
    <React.Fragment>
      <Box py={3} pb={12}>
        <Container>
          {!showPayment ? (
            <>
          <Box py={5}>
            <DashboardCard jobPost={companyData?.length} />
          </Box>
          <Box py={2}>
            {loader ? (
              <SkeletonLoader />
            ) : (
              <Grid container spacing={2}>
                <Grid item md={7}>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Typography fontSize={28} fontWeight={600} color="primary">
                      Job Posted By You
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
                          end={companyData?.length}
                          enableScrollSpy={true}
                          scrollSpyDelay={200}
                        />
                      </Typography>
                    </Box>
                  </Stack>
                </Grid>

                <Grid item md={3}>
                  <Box>
                    <TextBox
                      type="date"
                      sx={{ mb: 0 }}
                      size="small"
                      fullWidth
                      name={`date`}
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                    />
                    {/* </Stack> */}
                  </Box>
                </Grid>
                <Grid item md={2}>
                  <Box>
                    <Button
                      startIcon={<Add />}
                      variant="contained"
                      fullWidth
                      onClick={handleAddNewJob}
                    >
                      Add New Job
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            )}
          
          </Box>

          <Box py={2} sx={{ background: " " }}>
            <Grid container rowSpacing={0} justifyContent="center">
              {companyData && companyData?.length > 0 ? (
                companyData.map((item, index) => {
                  let productDetail =
                    item?.items && item?.items?.length > 0 && item?.items[0];
                  let addressDetail =
                    item?.items && item?.items?.length > 0 && item?.items[0];
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
                            <Typography
                              color="common.black"
                              fontSize={17}
                              sx={{
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                cursor: "pointer",
                              }}
                              fontWeight={500}
                              onClick={() =>
                                router.push(
                                  `/dashboard/company/job_history/detail/${item.id}`
                                )
                              }
                            >
                              {item?.name}
                            </Typography>
                          </Box>
                          {item?.status <= 0 && (
                            <Box>
                              <DeleteModal
                                params={{
                                  user_id: user?.id,
                                  job_id: item?.id,
                                }}
                              />
                            </Box>
                          )}
                        </Stack>
                        <Divider />
                        <CardContent>
                          <Grid container spacing={2} alignItems="start">
                            <Grid item md={3}>
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
                                      {item.items[0].product.material}
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
                                      {`${item.items[0].product.length}*${item.items[0].product.width}*${item.items[0].product.height}`}
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
                                      {item.items[0].product.quantity} Qty
                                    </Typography>
                                  </Box>
                                </Stack>
                              </Stack>
                              <Stack direction="row" spacing={1}>
                                {item.items.map((elem, index) => {
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
                                          objectFit: "cover",
                                        }}
                                      />
                                    </React.Fragment>
                                  );
                                })}
                              </Stack>
                              <Box>
                                <TextMaxLine
                                  line={4}
                                  component="p"
                                  variant="body2"
                                >
                                  {item.description}
                                </TextMaxLine>
                              </Box>
                            </Grid>
                            <Grid item md={3}>
                              <Box mb={4}>
                                <Box>
                                  <Typography fontSize={13} fontWeight={600}>
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
                                      {productDetail?.product?.pickup_date ||
                                        "N/A"}
                                    </Typography>
                                  </Box>
                                </Stack>
                              </Box>

                                  <Box>
                                    <Typography fontSize={13} fontWeight={600}>
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
                                        {productDetail?.product?.pickup_time ||
                                          "N/A"}
                                      </Typography>
                                    </Box>
                                  </Stack>
                                </Grid>
                                <Grid item md={3}>
                                  <Box mb={4}>
                                    <Box>
                                      <Typography
                                        fontSize={13}
                                        fontWeight={600}
                                      >
                                        Delivery out Date
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
                                          {productDetail?.product?.drop_date ||
                                            "N/A"}
                                        </Typography>
                                      </Box>
                                    </Stack>
                                  </Box>
                                  <Box>
                                    <Typography fontSize={13} fontWeight={600}>
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
                                </Grid>

                                {/* change this grid  */}

                                <Grid item md={3}>
                                  <Timeline
                                    sx={{
                                      [`& .${timelineItemClasses.root}:before`]:
                                        {
                                          flex: 0,
                                          padding: 0,
                                        },
                                    }}
                                  >
                                    <div
                                      style={{
                                        display: "flex",
                                        flexDirection: "column",
                                      }}
                                    >
                                      {addressDetail?.address
                                        .filter((ds) => ds.type === "pickup")
                                        ?.map((addressItem, index) => (
                                          <TimelineItem
                                           key={index}
                                            sx={{
                                              "&.MuiTimelineItem-root": {
                                                minHeight: "50px",
                                              },
                                            }}
                                          >
                                            <TimelineSeparator>
                                              <Iconify
                                                color={(theme) =>
                                                  theme.palette.primary.main
                                                }
                                                width={30}
                                                icon="carbon:location-star-filled"
                                              />

                                              <TimelineConnector
                                                sx={{
                                                  "&.MuiTimelineConnector-root":
                                                    {
                                                      border: (theme) =>
                                                        `1px solid ${alpha(
                                                          theme.palette.common
                                                            .black,
                                                          0.6
                                                        )}`,
                                                      width: "0px",
                                                      borderStyle: "dashed",
                                                      backgroundColor:
                                                        "transparent",
                                                    },
                                                }}
                                              />
                                            </TimelineSeparator>

                                            {/* map the address hare */}

                                            <TimelineContent
                                              key={index}
                                              sx={{
                                                fontSize: 14,
                                                fontWeight: 600,
                                              }}
                                            >
                                              {addressItem.address}{" "}
                                              <Typography
                                                fontSize={10}
                                                component="span"
                                                color="primary"
                                              >
                                                {addressItem.type},
                                              </Typography>
                                            </TimelineContent>
                                          </TimelineItem>
                                        ))}
                                    </div>

                                    <div
                                      style={{
                                        display: "flex",
                                        flexDirection: "column",
                                      }}
                                    >
                                      {addressDetail?.address
                                        .filter((ds) => ds.type === "drop")
                                        ?.map((addressItem, index) => (
                                          <TimelineItem
                                            key={index} // Remember to add a unique key prop when using map
                                            sx={{
                                              "&.MuiTimelineItem-root": {
                                                minHeight: "50px",
                                              },
                                            }}
                                          >
                                            <TimelineSeparator>
                                              <Iconify
                                                width={30}
                                                icon="carbon:location-star-filled"
                                              />
                                            </TimelineSeparator>

                                            <TimelineContent
                                              sx={{
                                                fontSize: 14,
                                                fontWeight: 600,
                                              }}
                                            >
                                              {addressItem.address}{" "}
                                              {/* Use addressItem instead of addressDetail?.address[0] */}
                                              <Typography
                                                fontSize={10}
                                                component="span"
                                                color="primary"
                                              >
                                                {addressItem.type}{" "}
                                                {/* Use addressItem instead of addressDetail?.address[0] */}
                                              </Typography>
                                            </TimelineContent>
                                          </TimelineItem>
                                        ))}
                                    </div>
                                  </Timeline>
                                  <Box mt={4}>
                                    <Box>
                                      <Typography
                                        fontSize={13}
                                        fontWeight={600}
                                      >
                                        Created At
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
                                          icon="ion:time"
                                        />
                                      </Box>
                                      <Box>
                                        <Typography
                                          color="grey"
                                          fontWeight={400}
                                          fontSize={13}
                                        >
                                          {item?.created_at
                                            ? moment(item?.created_at).format(
                                                "DD MMM"
                                              )
                                            : "" || "N/A"}
                                        </Typography>
                                      </Box>
                                    </Stack>
                                  </Box>
                                </Grid>
                              </Grid>
                              <Divider sx={{ my: 2 }} />
                              <Box>
                                <Stack
                                  className="customerBid_box_stack_responsive"
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
                                    {/* Bid: <Iconify icon="bi:currency-pound" /> */}
                                    {item?.budget}
                                  </Typography>

                                  <Stack direction="row" spacing={2}>
                                    {/* {item?.bid_id &&
                                      item?.bid_id !== null &&
                                      item?.status === 2 &&
                                      item?.is_paid === 0 &&  user?.user_type == 'company' && user?.profile.company_type == 'customer' && (
                                        <Box>
                                          <Button
                                            color="secondary"
                                            fullWidth
                                            variant="contained"
                                            onClick={() =>
                                              handleCheckoutPayment(item)
                                            }
                                            sx={{
                                              fontWeight: 500,
                                            }}
                                          >
                                            Pay 1
                                          </Button>
                                         </Box>
                                      )} */}
                                    <Box>
                                      <Badge
                                        badgeContent={
                                          item?.job_requests?.length
                                        }
                                        color="secondary"
                                        anchorOrigin={{
                                          vertical: "top",
                                          horizontal: "right",
                                        }}
                                      >
                                        <Button
                                          sx={{ fontWeight: 500 }}
                                          fullWidth
                                          variant="contained"
                                          startIcon={
                                            <Iconify icon="ph:hand-fill" />
                                          }
                                          onClick={() =>
                                            router.push(
                                              `/dashboard/company/driver_bid_list/${item.id}`
                                            )
                                          }
                                        >
                                          View Bids
                                        </Button>
                                      </Badge>
                                    </Box>
                                    <Box>
                                    {   item?.status === 0  &&
                                      <Button
                                        color="dark"
                                        fullWidth
                                        variant="outlined"
                                        startIcon={
                                          <Iconify icon="basil:edit-solid" />
                                        }
                                        onClick={() =>
                                          router.push(
                                            `/dashboard/company/job_post_form/${item?.id}`
                                          )
                                        }
                                        disabled={
                                          item?.status === 1 ||
                                          item?.status === 2 ||
                                          item.status === 3 ||
                                          item?.status === 4
                                        }
                                        sx={{
                                          fontWeight: 500,
                                        }}
                                      >
                                        Edit Job
                                      </Button> }
                                    </Box>
                                    {item?.bid_id &&
                                      item?.bid_id !== null &&
                                      item?.status === 3 && (
                                        <Box>
                                          <Button
                                            color="primary"
                                            fullWidth
                                            variant="outlined"
                                            startIcon={
                                              <Iconify icon="mingcute:foot-fill" />
                                            }
                                            onClick={() =>
                                              router.push(
                                                `/dashboard/company/track_job/${item.bid_id}/${item.id}`
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
                              </Box>
                            </CardContent>
                          </Card>
                        </Grid>
                      );
                    })
                  ) : (
                    <Box my={4}>
                      <Typography variant="h4">No Job Posted</Typography>
                    </Box>
                  )}

                  {/* )} */}
                </Grid>
                {companyData && companyData?.length > 0 && (
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
                )}
              </Box>
            </>
          ) : (
            <CardPaymentForm
              paymentDetails={paymentDetails}
              setShowPayment={setShowPayment}
            /> // Render the PaymentPage component when showPayment is true
          )}
        </Container>
      </Box>
    </React.Fragment>
  );
};

export default DashboardJobPost;

const DeleteModal = ({ params }) => {
  const [open, setOpen] = React.useState(false);
  const { user } = useAuthContext();
  const { enqueueSnackbar } = useSnackbar();
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    formik.resetForm();
  };
  const dispatch = useDispatch();
  const {
    jobPost: { pageCount, data, page, pageSize },
  } = useSelector((state) => state.customerJob);

  const formik = useFormik({
    initialValues: {
      ...params,
      reason: "",
      is_deleted: 1,
    },
    validate: (values) => {
      const errors = {};
      if (!values.reason) {
        errors.reason = "Reason is required";
      }
      return errors;
    },
    onSubmit: async (values) => {
      await axiosInstance
        .post(`api/auth/jobs/delete-job`, values)
        .then((response) => {
          if (response?.status === 200) {
            handleClose();
            dispatch(
              getJobPost({
                user_id: user?.id,
                type: user?.user_type,
                lat: 0,
                long: 0,
                is_deleted: 0,
              })
            );
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
          const { response } = error;
          enqueueSnackbar(
            <Alert icon={false} severity="error">
              {response?.data?.error}
            </Alert>,
            {
              variant: "error",
              anchorOrigin: {
                vertical: "top",
                horizontal: "center",
              },
            }
          );
        });
    },
  });

  return (
    <Box>
      <Button onClick={handleOpen}>
        <Iconify
          icon="fluent:delete-12-regular"
          width="1.7em"
          color={(theme) => theme.palette.primary.main}
        />
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        fullWidth={true}
        maxWidth="xs"
      >
        <DialogContent sx={{ py: 2 }}>
          <Stack
            spacing={1}
            sx={{ mb: 0, height: "100%" }}
            justifyContent="space-between"
          >
            <Typography
              id="modal-modal-title"
              fontWeight={600}
              fontSize={20}
              component="p"
            >
              Sure you want to delete?
            </Typography>
            <Box>
              <TextBox
                size="small"
                name="reason"
                label="Reason"
                fullWidth
                multiline={true}
                rows="4"
                value={formik.values.reason}
                onChange={formik.handleChange}
                helperText={formik.touched.reason && formik.errors.reason}
              />
            </Box>
            <Box component="form" noValidate onSubmit={formik.handleSubmit}>
              <Stack direction="row" spacing={3}>
                <Button fullWidth variant="outlined" onClick={handleClose}>
                  No, cancel
                </Button>
                <Button fullWidth variant="contained" type="submit">
                  Yes, Delete
                </Button>
              </Stack>
            </Box>
          </Stack>
        </DialogContent>
      </Dialog>
    </Box>
  );
};