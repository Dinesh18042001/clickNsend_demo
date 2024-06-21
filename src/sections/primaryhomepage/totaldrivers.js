import { getTotalUser } from "@/redux/slices/home/home";
import { useDispatch, useSelector } from "@/redux/store";
import {
  Box,
  Container,
  Divider,
  Grid,
  Stack,
  Typography,
  alpha,
} from "@mui/material";
import React, { useEffect } from "react";
import CountUp from "react-countup";

const TotalDrivers = () => {
  const dispatch = useDispatch();
  const {
    totalUser: { data },
  } = useSelector((state) => state.home);

  useEffect(() => {
    dispatch(getTotalUser());
  }, []);

  return (
    <React.Fragment>
      <Box
        sx={{
          backgroundColor: "#FFF8F4",
          color: "common.black",
        }}
      >
        <Container sx={{ py: 5 }}>
          <Grid
            className="aboutSection_stack_responsive"
            container
            spacing={6}
            textAlign="center"
          >
            <Grid item md={3} sm={2} xs={1}>
              <Box>
                <Box component="img" src="/home/Accountuser.png" m="auto" />
                <Typography
                  className="totaluser_typograhy_responsive"
                  variant="h3"
                >
                  <CountUp
                    start={0}
                    duration={2}
                    end={data?.customers}
                    enableScrollSpy={true}
                    scrollSpyDelay={500}
                  />
                  +
                </Typography>
                <Typography>Total User</Typography>
              </Box>
            </Grid>
            <Grid item md={3} sm={2} xs={1}>
              <Box>
                <Box component="img" src="/home/Driver.png" m="auto" />
                <Typography variant="h3">
                  <CountUp
                    start={0}
                    duration={2}
                    end={data?.drivers}
                    enableScrollSpy={true}
                    scrollSpyDelay={500}
                  />{" "}
                  +
                </Typography>
                <Typography>Total Drivers</Typography>
              </Box>
            </Grid>
            <Grid item md={3} sm={2} xs={1}>
              <Box>
                <Box component="img" src="/home/jobs.png" m="auto" />
                <Typography variant="h3">
                  <CountUp
                    start={0}
                    duration={2}
                    end={data?.jobs}
                    enableScrollSpy={true}
                    scrollSpyDelay={500}
                  />{" "}
                  +
                </Typography>
                <Typography>Total Jobs</Typography>
              </Box>
            </Grid>
            <Grid item md={3} sm={2} xs={1}>
              <Box>
                <Box component="img" src="/home/Business.png" m="auto" />
                <Typography variant="h3">
                  <CountUp
                    start={0}
                    duration={2}
                    end={data?.companies}
                    enableScrollSpy={true}
                    scrollSpyDelay={500}
                  />{" "}
                  +
                </Typography>
                <Typography>Total Company</Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </React.Fragment>
  );
};

export default TotalDrivers;
