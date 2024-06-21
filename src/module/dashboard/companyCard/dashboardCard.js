import { useAuthContext } from "@/auth/useAuthContext";
import Iconify from "@/components/iconify/Iconify";
import { getCompanyDashboard } from "@/redux/slices/job/company";
import { useDispatch, useSelector } from "@/redux/store";
import axiosInstance from "@/utils/axios";
import {
  Box,
  Card,
  CardContent,
  Grid,
  Stack,
  Typography
} from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import {
  getJobDelete,
  getJobHistory,
  getJobPost,
  setJobPostPage,
} from "@/redux/slices/job/customer";
const DashboardCard = ({ jobPost }) => {
  const router = useRouter();
  const { user } = useAuthContext();
  const dispatch = useDispatch();
  const { dashboard } = useSelector((state) => state.companyJob);
  const [subscription, setSubscription] = React.useState([]);
  console.log("dashboard", dashboard);

  // API FETCH LIST
  const fetchdata = async (type = "company") => {
    await axiosInstance
      .get(`/api/auth/master/plan/list/${type}`)
      .then((response) => {
        if (response.status === 200) {
          let subscriptionData = find(response?.data.view_data, { default: 1 });
          setSubscription(subscriptionData);
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  React.useEffect(() => {
    fetchdata();
  }, []);

  useEffect(() => {
    dispatch(getCompanyDashboard({ user_id: user?.id }));
  }, [user?.id]);
  useEffect(() => {
    dispatch(
      getJobPost({ user_id: user?.id, type: user?.user_type, lat: 0, long: 0 })
    );
  }, []);

  React.useEffect(() => {
    dispatch(
      getJobHistory({
        user_id: user?.id,
        type: user?.user_type,
        lat: 0,
        long: 0,
      })
    );
  }, []);

  React.useEffect(() => {
    dispatch(
      getJobDelete({
        user_id: user?.id,
        type: user?.user_type,
        lat: 0,
        long: 0,
      })
    );
  }, []);
  return (
    <React.Fragment>
      <Box sx={{ mt: 4 }}>
        <Grid className="dashboard_box_grid_responsive" container spacing={2}>
          <Grid item md={3}>
            <Card
              sx={{
                backgroundColor:
                  router.pathname === "/dashboard/company/driver/list"
                    ? "#145365"
                    : "#145365",
                border: "1px solid #145365",
                color:
                  router.pathname === "/dashboard/company/driver/list"
                    ? "#fff"
                    : "#fff",
                cursor: "pointer",
              }}
              onClick={() => router.push("/dashboard/company/driver/list")}
            >
              <CardContent>
                <Stack
                  direction="row" 
                  justifyContent="space-around"
                  spacing={0}
                  alignItems="center"
                >
                  <Box
                    sx={{
                      backgroundColor: (theme) =>
                        router.pathname === "/dashboard/company/driver/list"
                          ? "#246678"
                          : "#246678",
                    }}
                    height="80px"
                    p={2}
                    width="80px"
                    borderRadius="50%"
                    component="div"
                  >
                    <Iconify icon="basil:bag-solid" width={48} />
                  </Box>
                  <Box>
                    <Typography variant="h6" fontWeight={300}>
                      Job List 2
                    </Typography>
                    <Typography variant="h4" textAlign="center">
                      {dashboard?.drivers}
                    </Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
          <Grid item md={3}>
            <Card
              sx={{
                backgroundColor:
                  router.pathname === "/dashboard/company/job_history"
                    ? "#FD9B3D"
                    : "#FD9B3D",
                border: "1px solid #FD9B3D",
                color:
                  router.pathname === "/dashboard/company/job_history"
                    ? "#fff"
                    : "#fff",
                cursor: "pointer",
              }}
              onClick={() => router.push("/dashboard/company/job_history")}
            >
              <CardContent>
                <Stack
                  direction={"row"}
                  justifyContent="space-around"
                  alignItems="center"
                  spacing={0}
                >
                  <Box
                    sx={{
                      backgroundColor: (theme) =>
                        router.pathname === "/dashboard/company/job_history"
                          ? "#ffa54e"
                          : "#ffa54e",
                    }}
                    height="80px"
                    p={2}
                    width="80px"
                    borderRadius="50%"
                    component="div"
                  >
                    <Iconify icon="ri:history-fill" width={48} />
                  </Box>
                  <Box>
                    <Typography variant="h6" fontWeight={300}>
                      JOB HISTORY
                    </Typography>
                    <Typography variant="h4" textAlign={"center"}>
                      {dashboard?.history}
                    </Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
          <Grid item md={3}>
            <Card
              sx={{
                backgroundColor:
                  router.pathname === "/dashboard/company/active_jobs"
                    ? "#FD9B3D"
                    : "#FD9B3D",
                border: "1px solid #FD9B3D",
                color:
                  router.pathname === "/dashboard/company/active_jobs"
                    ? "#fff"
                    : "#fff",
                cursor: "pointer",
              }}
              onClick={() => router.push("/dashboard/company/active_jobs")}
            >
              <CardContent>
                <Stack
                  direction={"row"}
                  justifyContent="space-around"
                  alignItems="center"
                  spacing={0}
                >
                  <Box
                    sx={{
                      backgroundColor: (theme) =>
                        router.pathname === "/dashboard/company/job_post"
                          ? "#ffa54e"
                          : "#ffa54e",
                    }}
                    height="80px"
                    p={2}
                    width="80px"
                    borderRadius="50%"
                    component="div"
                  >
                    <Iconify icon="solar:user-linear" width={48} />
                  </Box>
                  <Box>
                    <Typography fontSize={16} fontWeight={300}>
                      ACTIVE JOBS
                    </Typography>
                    <Typography variant="h5" textAlign="center">
                      {dashboard?.active}
                    </Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          <Grid item md={3}>
            <Card
              sx={{
                backgroundColor:
                  router.pathname === "/invoice"
                    ? "#FECA3C"
                    : "#FECA3C",
                border: "1px solid #FECA3C",
                color:
                  router.pathname === "/invoice"
                    ? "#fff"
                    : "#fff",
                cursor: "pointer",
              }}
              onClick={() => router.push("/invoice")}
            >
              <CardContent>
                <Stack
                  direction={"row"}
                  justifyContent="space-around"
                  spacing={0}
                  alignItems="center"
                >
                  <Box
                    sx={{
                      backgroundColor: (theme) =>
                        router.pathname === "/invoice"
                          ? "#ffd768"
                          : "#ffd768",
                    }}
                    height="80px"
                    p={2}
                    width="80px"
                    borderRadius="50%"
                    component="div"
                  >
                    <Iconify
                      icon="material-symbols:subscriptions-outline"
                      width={48}
                    />
                  </Box>
                  <Box>
                    <Typography variant="h6" fontWeight={300}>
                      Invoice
                    </Typography>
                    {/* <Typography variant="h4" textAlign={"center"}>
                      {subscription?.duration || 0} Month
                    </Typography> */}
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          {/* {user?.user_type === "company" && (
  <Grid item md={3}>
    <Card
      sx={{
        backgroundColor: router.pathname === "/dashboard/company/subscription" ? "#FECA3C" : "#FECA3C",
        border: "1px solid #FECA3C",
        color: "#fff",
        cursor: "pointer",
      }}
      onClick={() => router.push("/dashboard/company/subscription")}
    >
      <CardContent>
        <Stack
          direction="row"
          justifyContent="space-around"
          spacing={0}
          alignItems="center"
        >
          <Box
            sx={{
              backgroundColor: router.pathname === "/dashboard/company/subscription" ? "#ffd768" : "#ffd768",
            }}
            height="80px"
            p={2}
            width="80px"
            borderRadius="50%"
            component="div"
          >
            <Iconify
              icon="material-symbols:subscriptions-outline"
              width={48}
            />
          </Box>
          <Box>
            <Typography variant="h6" fontWeight={300}>
              Subscription
            </Typography>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  </Grid>
)} */}

        </Grid>
      </Box>
    </React.Fragment>
  );
};

export default DashboardCard;





