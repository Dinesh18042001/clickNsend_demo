import DashboardCard from "@/module/dashboard/companyCard/dashboardCard";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import React from "react";

const CustomerDashboard = () => {
  const router = useRouter();

  return (
    <React.Fragment>
      <Container sx={{ my: 4, py: 10 }}>
        <Stack spacing={4}>
          
          <DashboardCard />
          
          {/* <CustomerDashboard/> */}
          
          <Box>
            <Card
              sx={{
                position: "relative",
                height: "356px",
                borderRadius: "12px",
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  zIndex: -1,
                }}
              >
                <Box
                  component="img"
                  src="/customerDashboard.png"
                  sx={{
                    width: "100%",
                    height: "100%",
                    backgroundRepeat: "no-repeat",
                    objectFit: "fill",
                  }}
                />
              </Box>
              <CardContent sx={{ height: "100%", px: 10 }}>
                <Grid container alignItems="center" sx={{ height: "inherit" }}>
                  <Grid item md={5}>
                    <Stack direction={"row"} alignItems="center" height="100%">
                      <Stack spacing={2}>
                        <Typography
                          fontSize={30}
                          fontWeight={600}
                          color="common.black"
                        >
                          Lorem ipsum
                        </Typography>
                        <Typography
                          color="common.black"
                          fontSize={13}
                          fontWeight={400}
                        >
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Sed pretium augue ac justo semper, vitae
                          ultrices velit cursus. Aenean tristique vel mi non
                          pulvinar.
                        </Typography>

                        {/* <Box>
                          <Button
                            sx={{ fontSize: "14px" }}
                            variant="contained"
                            onClick={() =>
                              router.push(
                                "/dashboard/customer/job_post_form/create"
                              )
                            }
                            color="dark"
                          >
                            Add Job
                          </Button>
                        </Box> */}

                      </Stack>
                    </Stack>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Box>
        </Stack>
      </Container>
    </React.Fragment>
  );
};

export default CustomerDashboard;
