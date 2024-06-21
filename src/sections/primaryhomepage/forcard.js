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
import Link from "next/link";
import React from "react";

const ForCard = () => {
  return (
    <React.Fragment>
      <Box py={4}>
        <Container>
          <Grid container spacing={3}>
            {/* <Grid item lg={6}>
              <CardContent>
                <CardContent>
                  <Box
                    component="img"
                    sx={{ width: "100%" }}
                    src="/assets/images/home/new/ukmap.jpg"
                    alt="truck"
                  />
                </CardContent>
              </CardContent>
            </Grid> */}
            <Grid item lg={4}>
              <Card
                variant="outlined"
                sx={{
                  my: 3,
                  cursor: "pointer",
                  ":hover": {
                    borderColor: (theme) => theme.palette.primary.main,
                  },
                }}
              >
                <CardContent>
                  <Stack spacing={1}>
                    <Typography color="primary">For Driver</Typography>
                    <Typography variant="h5">Join Our Fleet</Typography>
                    <Typography color="grey">
                      The personal account where user can manage,track and order
                      parcels,check order details and history
                    </Typography>
                    <Box>
                      <Button
                        LinkComponent={Link}
                        href="/auth/register/driver"
                        variant="contained"
                        color="primary"
                      >
                        Signup as a Driver
                      </Button>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>

            <Grid item lg={4}>
              <Card
                variant="outlined"
                sx={{
                  my: 3,
                  cursor: "pointer",
                  ":hover": {
                    borderColor: (theme) => theme.palette.primary.main,
                  },
                }}
              >
                <CardContent>
                  <Stack spacing={1}>
                    <Typography color="primary">For Clients</Typography>
                    <Typography variant="h5">Shipment Manager</Typography>
                    <Typography color="grey">
                      The personal account where user can manage,track and order
                      parcels,check order details and history
                    </Typography>
                    <Box>
                      <Button
                        LinkComponent={Link}
                        href="/auth/register/company"
                        variant="contained"
                        color="primary"
                      >
                        Login to ship Manager
                      </Button>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
            <Grid item lg={4}>
              <Card
                variant="outlined"
                sx={{
                  my: 3,
                  cursor: "pointer",
                  ":hover": {
                    borderColor: (theme) => theme.palette.primary.main,
                  },
                }}
              >
                <CardContent>
                  <Stack spacing={1}>
                    <Typography color="primary">For Clients</Typography>
                    <Typography variant="h5">Mobile Application</Typography>
                    <Typography color="grey">
                      The personal account where user can manage,track and order
                      parcels,check order details and history
                    </Typography>
                    <Box>
                      <Button
                        LinkComponent={Link}
                        href="/auth/register"
                        variant="contained"
                        color="primary"
                      >
                        Login to Driver
                      </Button>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </React.Fragment>
  );
};

export default ForCard;
