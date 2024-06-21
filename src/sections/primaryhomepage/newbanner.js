import {
  Box,
  Button,
  CardContent,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
// import { m } from "framer-motion";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
const NewBanner = () => {
  return (
    <React.Fragment>
      {/* <Box component={MotionViewport}> */}
      <Box>
        {/* <Container> */}
        <Grid container direction="row-reverse">
          <Grid item lg={6}>
            <Container sx={{ mt: 8 }}>
              <CardContent>
                <Stack
                  direction="row"
                  alignItems="flex-end"
                  sx={{ overflow: "hidden" }}
                >
                  <CardContent sx={{ pb: "0px !important", width: "100%" }}>
                    <Stack spacing={4}>
                      <Box>
                        <Stack direction="row" justifyContent="space-evenly">
                          <Box>
                            <Stack spacing={4}>
                              <Box
                                component={motion.div}
                                initial={{ x: -300, y: 0 }}
                                animate={{
                                  x: [-300, 0, 0, 0],
                                  y: [0, 0, -250, -250],
                                }}
                                transition={{
                                  repeat: Infinity,
                                  delay: 0,
                                  duration: 4,
                                  times: [0, 0.1, 0.9, 1],
                                  ease: "easeInOut",
                                }}
                              >
                                <Box
                                  component="img"
                                  sx={{ width: "200px" }}
                                  src="/assets/images/home/new/download-app.png"
                                  alt="truck"
                                />
                              </Box>
                              <Box
                                component={motion.div}
                                initial={{ x: -300, y: 0 }}
                                animate={{
                                  x: [-300, 0, 0, 0],
                                  y: [0, 0, -280, -280],
                                }}
                                transition={{
                                  repeat: Infinity,
                                  delay: 0.1,
                                  duration: 4,
                                  times: [0, 0.1, 0.9, 1],
                                  ease: "easeInOut",
                                }}
                              >
                                <Box
                                  component="img"
                                  sx={{ width: "200px" }}
                                  src="/assets/images/home/new/start-job.png"
                                  alt="truck"
                                />
                              </Box>
                            </Stack>
                          </Box>
                          <Box sx={{ mt: 6 }}>
                            <Stack spacing={4}>
                              <Box
                                component={motion.div}
                                initial={{ x: 300, y: 0 }}
                                animate={{
                                  x: [300, 0, 0, 0],
                                  y: [0, 0, -250, -250],
                                }}
                                transition={{
                                  repeat: Infinity,
                                  delay: 0,
                                  duration: 4,
                                  times: [0, 0.1, 0.9, 1],
                                  ease: "easeInOut",
                                }}
                              >
                                <Box
                                  component="img"
                                  sx={{ width: "200px" }}
                                  src="/assets/images/home/new/place-bid.png"
                                  alt="truck"
                                />
                              </Box>
                              <Box
                                component={motion.div}
                                initial={{ x: 300, y: 0 }}
                                animate={{
                                  x: [300, 0, 0, 0],
                                  y: [0, 0, -300, -300],
                                }}
                                transition={{
                                  repeat: Infinity,
                                  delay: 0.1,
                                  duration: 4,
                                  times: [0, 0.1, 0.9, 1],
                                  ease: "easeInOut",
                                }}
                              >
                                <Box
                                  component="img"
                                  sx={{ width: "200px" }}
                                  src="/assets/images/home/new/invoice.png"
                                  alt="truck"
                                />
                              </Box>
                            </Stack>
                          </Box>
                        </Stack>
                      </Box>
                      <Box
                        component={motion.div}
                        initial={{ rotate: 0, scale: 0 }}
                        animate={{
                          rotate: 360,
                          scale: 1,
                        }}
                        transition={{
                          delay: 0.5,
                          duration: 1.2,
                          ease: "easeIn",
                        }}
                      >
                        <Box sx={{ display: "flex", justifyContent: "center" }}>
                          <Box
                            component="img"
                            sx={{ width: "500px" }}
                            src="/home/hometruck.png"
                            alt="truck"
                          />
                        </Box>
                      </Box>
                    </Stack>
                  </CardContent>
                </Stack>
              </CardContent>
            </Container>
          </Grid>
          <Grid item lg={6} sx={{ position: "relative" }}>
            <Box
              sx={{
                backgroundImage: `url(/home/bgHomeBanner.png)`,
                position: "absolute",
                top: 0,
                left: 0,
                backgroundRepeat: "no-repeat",
                right: 0,
                bottom: 0,
                height: "100%",
                zIndex: -1,
              }}
            />
            <Stack
              spacing={6}
              alignItems="center"
              direction="row"
              justifyContent="center"
              height="100%"
            >
              <CardContent sx={{}}>
                <Stack spacing={0} mb={5}>
                  <Box
                    component={motion.div}
                    initial={{ x: 500, y: 0 }}
                    animate={{
                      x: 0,
                      y: 0,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 10,
                      delay: 0,
                      duration: 1.2,
                      ease: "easeInOut",
                    }}
                  >
                    <Typography
                      color="common.black"
                      fontSize={63}
                      fontWeight={500}
                      eigh
                    >
                      Your Logistic
                    </Typography>
                    <Typography
                      color="primary"
                      fontSize={63}
                      fontWeight={500}
                      eigh
                    >
                      Solution
                    </Typography>
                    <Typography color="common.black" fontSize={25}>
                      For Business, For Client & For Driver{"'"}s
                    </Typography>
                  </Box>
                </Stack>
                <Box>
                  <Stack direction="row" alignItems="flex-end" height="100%">
                    <Box>
                          
                      <Stack className='flexDirection' direction="row" alignItems={"center"} spacing={2} >
                        <Box
                          component={motion.div}
                          initial={{ scale: 0 }}
                          animate={{
                            scale: 1,
                          }}
                          transition={{
                            delay: 0,
                            duration: 1.2,
                            ease: "easeInOut",
                          }}
                        >
                          <Button
                            variant="contained"
                            LinkComponent={Link}
                            href="/auth/register"
                            size="large"
                            sx={{
                              backgroundColor: "#000",
                              ":hover": {
                                backgroundColor: "#555555",
                              },
                            }}
                          >
                            <Typography fontWeight={500}>
                              For Clients
                            </Typography>
                          </Button>
                        </Box>
                        <Box
                          component={motion.div}
                          initial={{ scale: 0 }}
                          animate={{
                            scale: 1,
                          }}
                          transition={{
                            delay: 0,
                            duration: 1.2,
                            ease: "easeInOut",
                          }}
                        >
                          <Button
                            variant="contained"
                            size="large"
                            color="primary"
                            LinkComponent={Link}
                            href="/auth/register"
                          >
                            <Typography fontWeight={500}>
                              For Businesses
                            </Typography>
                          </Button>
                        </Box>
                        <Box
                          component={motion.div}
                          initial={{ scale: 0 }}
                          animate={{
                            scale: 1,
                          }}
                          transition={{
                            delay: 0,
                            duration: 1.2,
                            ease: "easeInOut",
                          }}
                        >
                          <Button
                            LinkComponent={Link}
                            href="auth/register/driver"
                            variant="outlined"
                            color="dark"
                            size="large"
                          >
                            <Typography fontWeight={500}>For Driver</Typography>
                          </Button>
                        </Box>
                      </Stack>
                    </Box>
                  </Stack>
                </Box>
              </CardContent>
            </Stack>
          </Grid>
        </Grid>
        {/* </Container> */}
      </Box>
    </React.Fragment>
  );
};

export default NewBanner;
