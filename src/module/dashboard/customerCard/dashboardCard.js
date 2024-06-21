import { useAuthContext } from "@/auth/useAuthContext";
import Iconify from "@/components/iconify/Iconify";
import {
  getJobDelete,
  getJobHistory,
  getJobPost,
  setJobPostPage,
} from "@/redux/slices/job/customer";
import { useDispatch, useSelector } from "@/redux/store";
import axiosInstance from "@/utils/axios";
import {
  Box,
  Card,
  CardContent,
  Grid,
  Stack,
  Typography,
  alpha,
} from "@mui/material";
import find from "lodash/find";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const DashboardCard = ({ jobPost }) => {
  const router = useRouter();
  const { user } = useAuthContext();
  const dispatch = useDispatch();
  const {
    jobPost: { pageCount, data, page, pageSize },
    jobHistory,
    jobDelete,
  } = useSelector((state) => state.customerJob);


  const handlePageChange = (event, value) => {
    dispatch(setJobPostPage(value));
  };
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

  const [subscription, setSubscription] = React.useState([]);
  // API FETCH LIST
  const fetchdata = async (type = "customer") => {
    try {
      const statusShowPlan = 1 ;
      const response = await axiosInstance.get(
        `/api/auth/master/plan/list/${type}/${statusShowPlan}`
      );
      if (response.status === 200) {
        const subscriptionData = find(response?.data.view_data, { default: 1 });

        if (subscriptionData) {
          setSubscription(subscriptionData);
        } else {
          console.log("No data found in response.view_data");
        }
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  React.useEffect(() => {
    fetchdata();
  }, []);

  return (
    <React.Fragment>
      <Box sx={{ mt: 4 }}>
        <Grid className="dashboard_box_grid_responsive" container spacing={2}>
          <Grid item md={4}>
            <Card
              sx={{
                backgroundColor:
                  router.pathname === "/dashboard/customer/job_posted"
                    ? "#145365"
                    : "#145365",
                border: "1px solid #145365",
                color:
                  router.pathname === "/dashboard/customer/job_posted"
                    ? "#fff"
                    : "#fff",
                cursor: "pointer",
              }}
              onClick={() => router.push("/dashboard/customer/job_posted")}
            >
              <CardContent className='dashboardCards_CardContent_responsive'>
                <Stack
                  direction="row"
                  justifyContent="space-around"
                  spacing={0}
                  alignItems="center"
                >
                  <Box
                    sx={{
                      backgroundColor: (theme) =>
                        router.pathname === "/dashboard/customer/job_posted"
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
                      JOB POSTED
                    </Typography>
                    <Typography variant="h4" textAlign="center">
                      {data?.length}
                    </Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
          <Grid item md={4}>
            <Card
              sx={{
                backgroundColor:
                  router.pathname === "/dashboard/customer/job_history"
                    ? "#FD9B3D"
                    : "#FD9B3D",
                border: "1px solid #FD9B3D",
                color:
                  router.pathname === "/dashboard/customer/job_history"
                    ? "#fff"
                    : "#fff",
                cursor: "pointer",
              }}
              onClick={() => router.push("/dashboard/customer/job_history")}
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
                        router.pathname === "/dashboard/customer/job_history"
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
                      {jobHistory?.dataCount}
                    </Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
          <Grid item md={4}>
            <Card
              sx={{
                backgroundColor: (theme) => theme.palette.error.main,
                border: (theme) => `1px solid ${theme.palette.error.main}`,
                color: (theme) => theme.palette.common.white,
                cursor: "pointer",
              }}
              onClick={() => router.push("/dashboard/customer/job_delete")}
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
                        alpha(theme.palette.error.light, 0.3),
                    }}
                    height="80px"
                    p={2}
                    width="80px"
                    borderRadius="50%"
                    component="div"
                  >
                    <Iconify
                      icon="material-symbols:delete-outline"
                      width={48}
                    />
                  </Box>
                  <Box>
                    <Typography variant="h6" fontWeight={300}>
                      JOB DELETE
                    </Typography>
                    <Typography variant="h4" textAlign={"center"}>
                      {jobDelete?.dataCount}
                    </Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
{/*          
          <Grid item md={3}>
            <Card
              sx={{
                backgroundColor:
                  router.pathname === "/dashboard/customer/subscription"
                    ? "#FECA3C"
                    : "#FECA3C",
                border: "1px solid #FECA3C",
                color:
                  router.pathname === "/dashboard/customer/subscription"
                    ? "#fff"
                    : "#fff",
                cursor: "pointer",
              }}
              onClick={() => router.push("/dashboard/customer/subscription")}
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
                        router.pathname === "/dashboard/customer/subscription"
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
                      SUBSCRIPTION
                    </Typography>
                    <Typography variant="h4" textAlign={"center"}>
                      {subscription?.duration || 0} Month
                    </Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
           */}
        </Grid>
      </Box>
    </React.Fragment>
  );
};

export default DashboardCard;
