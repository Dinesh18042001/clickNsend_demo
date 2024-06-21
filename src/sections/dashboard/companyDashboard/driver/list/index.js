import { SelectBox } from "@/components/form";
import Iconify from "@/components/iconify/Iconify";
import { Add } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  Modal,
  Pagination,
  PaginationItem,
  Stack,
  Typography
} from "@mui/material";
import { useRouter } from "next/router";
import React, { useState } from "react";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import CountUp from "react-countup";
import DashboardCard from "@/module/dashboard/companyCard/dashboardCard";
import axiosInstance from "@/utils/axios";
import { useSnackbar } from "notistack";  import Alert from '@mui/material/Alert';
import SkeletonLoader from "@/components/skeleton";
import { JobSekelton } from "@/components/not-found";
import { useAuthContext } from "@/auth/useAuthContext";
import { useDispatch, useSelector } from "@/redux/store";
import { getJobPost, setJobPostPage } from "@/redux/slices/job/customer";
import { getDriver } from "@/redux/slices/job/company";
const DriverJobListSection = ({ formik }) => {
  const { user } = useAuthContext();
  const router = useRouter();
  const dispatch = useDispatch();
  const {
    Driver: { pageCount, data, page, pageSize },
  } = useSelector((state) => state.companyJob);

  const handlePageChange = (event, value) => {
    dispatch(setJobPostPage(value));
  };

  React.useEffect(() => {
    dispatch(getDriver({ user_id: user?.id,type:user?.user_type  ,lat:0,long:0}));
  }, []);

  const [layout, setLayout] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [select, setSelect] = React.useState("new");

  const [loader, setLoader] = React.useState(false);
  console.log("datadata", data);
  const MonthSelect = [
    {
      label: "Choose Month",
      value: 0,
    },
    {
      label: "January",
      value: "January",
    },
    {
      label: "February",
      value: "February",
    },
    {
      label: "March",
      value: "March",
    },
    {
      label: "April",
      value: "April",
    },
    {
      label: "May",
      value: "May",
    },
    {
      label: "June",
      value: "June",
    },
    {
      label: "July",
      value: "July",
    },
    {
      label: "August",
      value: "August",
    },
    {
      label: "September",
      value: "September",
    },
    {
      label: "October",
      value: "October",
    },
    {
      label: "November",
      value: "November",
    },
    {
      label: "December",
      value: "December",
    },
  ];
  return (
    <React.Fragment>
      <Box py={3} pb={12}>
        <Container>
          <Box py={5}>
            <DashboardCard jobPost={data?.length} />
          </Box>
          <Box py={2}>
            {loader ? (
              <SkeletonLoader />
            ) : (
              <Grid container spacing={2}>
                <Grid item md={7}>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Typography fontSize={28} fontWeight={600} color="primary">
                      Driver List
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
                          end={data?.length}
                          enableScrollSpy={true}
                          scrollSpyDelay={200}
                        />
                      </Typography>
                    </Box>
                  </Stack>
                </Grid>

                <Grid item md={3}>
                  <Box>
                    <SelectBox
                      sx={{ mb: 0 }}
                      size="small"
                      fullWidth
                      options={MonthSelect}
                      name={`month`}
                      value={formik?.values?.month}
                      onChange={formik.handleChange}
                      error={formik.touched.month && formik.errors.month}
                      helperText={formik.touched.month && formik.errors.month}
                    />
                  </Box>
                </Grid>
                <Grid item md={2}>
                  <Box>
                    <Button
                      startIcon={<Add />}
                      variant="contained"
                      fullWidth
                      onClick={() =>
                        router.push("/dashboard/company/driver/form/create")
                      }
                    >
                      Add Driver
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            )}
          </Box>

          <Box py={2} sx={{ background: " " }}>
            <Grid container rowSpacing={0}>
              {data && data?.length > 0 ? (
                data.map((item, index) => {
                  let productDetail = "N/A";
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
                              }}
                              fontWeight={500}
                            >
                              {item?.email}
                            </Typography>
                          </Box>
                          <Box>
                          </Box>
                        </Stack>
                        <Divider />
                        <CardContent>
                          <Grid container spacing={2} alignItems="start">
                            <Grid item md={3}>
                              <Box>
                                <Typography fontSize={28} fontWeight={500}>
                                  {item.user_name}
                                </Typography>
                              </Box>
                             
                              <Stack direction="row" spacing={1}>
                                <React.Fragment key={index}>
                                  <Box
                                    component="img"
                                    alt={item.user_name}
                                    src={`${item.base_url}${item.profile_img}`}
                                    sx={{
                                      width: "83px",
                                      height: "59px",
                                      border: "1px solid lightgrey",
                                      objectFit: "cover",
                                    }}
                                  />
                                </React.Fragment>
                              </Stack>
                            </Grid>
                            <Grid item md={3}>
                              <Box mb={4}>
                                <Box>
                                  <Typography fontSize={13} fontWeight={600}>
                                    Mobile
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
                                      {item?.mobile || "N/A"}
                                    </Typography>
                                  </Box>
                                </Stack>
                              </Box>

                              <Box>
                                <Typography fontSize={13} fontWeight={600}>
                                  Driver job completed
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
                                    {item?.state || "N/A"}
                                  </Typography>
                                </Box>
                              </Stack>
                            </Grid>
                            <Grid item md={3}>
                              <Box mb={4}>
                                <Box>
                                  <Typography fontSize={13} fontWeight={600}>
                                    Running Job
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
                                      {item?.city || "N/A"}
                                    </Typography>
                                  </Box>
                                </Stack>
                              </Box>
                              
                            </Grid>
                            <Grid item md={3}></Grid>
                          </Grid>
                          <Divider sx={{ my: 2 }} />
                          <Box>
                            <Stack
                              direction="row"
                              alignItems="center"
                              justifyContent="flex-end"
                            >
                              <Box>
                                <Button
                                  color="dark"
                                  fullWidth
                                  variant="outlined"
                                  startIcon={
                                    <Iconify icon="basil:edit-solid" />
                                  }
                                  onClick={() =>
                                    router.push(
                                      `/dashboard/company/driver/form/${item?.user_id}`
                                    )
                                  }
                                  sx={{
                                    fontWeight: 500,
                                  }}
                                >
                                  Edit Driver
                                </Button>
                              </Box>
                            </Stack>
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>
                  );
                })
              ) : (
                <>{!loader && <JobSekelton title="No Driver List..." />}</>
              )}

              {/* )} */}
            </Grid>
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
          </Box>
        </Container>
      </Box>
    </React.Fragment>
  );
};

export default DriverJobListSection;

const DeleteModal = ({ id }) => {
  const [open, setOpen] = React.useState(false);
  const { user } = useAuthContext();
  const { enqueueSnackbar } = useSnackbar();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch();
  const {
    jobPost: { pageCount, data, page, pageSize },
  } = useSelector((state) => state.customerJob);

  const deleteData = async () => {
    await axiosInstance
      .delete(`api/auth/master/jobs/delete/${id}`)
      .then((response) => {
        if (response?.status === 200) {
          handleClose();
          dispatch(
            getJobPost({ user_id: user?.id,type:user?.user_type  ,lat:0,long:0 })
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
        }
      })
      .catch((error) => {
        const { response } = error;
            // error
            enqueueSnackbar(
              <Alert
                style={{
                  width: "100%",
                  padding: "30px",
                  filter: blur("8px"),
                  background: "#ffe9d5 ",
                  fontSize: "19px",
                  fontWeight: 800,
                  lineHeight: "30px",
                }}
                icon={false}
                severity="error"
              >
                {response?.data?.error}
              </Alert>,
              {
                variant: "error",
                iconVariant: true,
                anchorOrigin: {
                  vertical: "top",
                  horizontal: "center",
                },
              }
            );
      });
  };
  return (
    <Box>
      <Button onClick={handleOpen}>
        <Iconify
          icon="fluent:delete-12-regular"
          width="1.7em"
          color={(theme) => theme.palette.primary.main}
        />
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
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
            borderRadius: "8px",
            bgcolor: "background.paper",
            border: "1px solid #f5f5f5",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Stack spacing={1} sx={{ mb: 4 }}>
            <Typography
              id="modal-modal-title"
              fontWeight={600}
              fontSize={20}
              component="p"
            >
              Sure you want to delete?
            </Typography>

            <Typography
              id="modal-modal-title"
              fontWeight={400}
              fontSize={14}
              component="p"
              sx={{
                color: "#54595E",
              }}
            >
              Are you sure you want to delete this?
            </Typography>
          </Stack>
          <Stack direction="row" spacing={3}>
            <Button fullWidth variant="outlined" onClick={handleClose}>
              No, cancel
            </Button>
            <Button fullWidth variant="contained" onClick={deleteData}>
              Yes, Delete
            </Button>
          </Stack>
        </Box>
      </Modal>
    </Box>
  );
};
