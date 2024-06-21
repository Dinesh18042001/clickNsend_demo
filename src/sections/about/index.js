import SkeletonLoader from "@/components/skeleton";
import axiosInstance from "@/utils/axios";
import {
  Box,
  Breadcrumbs,
  Button,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import TotalDrivers from "../primaryhomepage/totaldrivers";
// import Link from "next/link";
import AboutSlider from "./aboutSlider";
import { motion } from "framer-motion";
const AboutUs = () => {
  const [readMore, setReadMore] = useState(false);
  const [loader, setLoader] = React.useState(false);
  const [data, setData] = useState("");
  const AboutUsApi = async () => {
    setLoader(true);
    await axiosInstance
      .get("api/front/page-details/about-us")
      .then((response) => {
        if (response?.status === 200) {
          setLoader(false);
          setData(response.data.view_data);
        } else {
          setLoader(false);
          console.log("error");
        }
      })
      .catch((error) => {
        setLoader(false);
        console.log(error, "About Us Page");
      });
  };
  useEffect(() => {
    AboutUsApi();
  }, []);

  const handleRead = (boolean) => {
    if (boolean === false) {
      setReadMore(true);
    } else {
      setReadMore(false);
    }
  };
  return (
    <React.Fragment>
      <Box py={12} sx={{ position: "relative", overflow: "hidden" }}>
        <Container>
          <Breadcrumbs aria-label="breadcrumb">
            <Box
              component={Link}
              sx={{ textDecoration: "none" }}
              color="inherit"
              href="/"
            >
              Home
            </Box>

            <Typography color="text.primary">About Us</Typography>
          </Breadcrumbs>

          <div>
            <Grid container spacing={1}>
              <Grid item md={8} my={1}>
                <Box my={3}>
                  <Typography
                    color="common.black"
                    fontSize={34}
                    fontWeight={600}
                  >
                    We help you to solve your Logistics problems
                    <Typography
                      color="primary"
                      component="span"
                      fontSize={34}
                      fontWeight={600}
                    >
                      Efficiently
                    </Typography>
                  </Typography>
                </Box>
                <Stack direction="row" spacing={2}>
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
                            href="auth/register"
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
                            href="auth/register"
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
              </Grid>
            </Grid>
            {!loader ? (
              <Box>
                <Box
                  sx={{
                    background: "#202020",
                    position: "absolute",
                    width: "100%",
                    height: "60%",
                    left: "0",
                    zIndex: -1,
                  }}
                />
                <Box
                  sx={{
                    background: "#202020",
                    position: "absolute",

                    width: "102%",
                    height: "15em",
                    left: "-10px",
                    borderRadius: "100px",
                    rotate: "-5deg",
                    top: "26em",
                    zIndex: -1,
                  }}
                />
                <Box
                  sx={{
                    position: "absolute",
                    border: (theme) =>
                      `5px solid ${theme.palette.primary.main} `,
                    width: "630px",
                    height: "500px",
                    right:"-11em",
                    borderRadius: "50%",
                    rotate: "33.61deg",
                  bottom: "-5em",
                    zIndex: 3,
                  }} 
                /> 

                <Grid container spacing={1} mt={16} alignItems="center">
                  <Grid item md={6}>
                    <Stack spacing={1.5} color="common.white">
                      <Stack spacing={1.5} direction="row">
                        <Box
                          sx={{
                            border: (theme) =>
                              `8px solid ${theme.palette.primary.main}`,
                          }}
                        />
                        <Typography fontSize={24} fontWeight={600}>
                          About us
                        </Typography>
                      </Stack>
                      <Box>
                        <Typography
                          fontSize={14}
                          fontWeight={400}
                          sx={{
                            overflow: "hidden",
                            height: readMore ? "auto" : "16em",
                          }}
                          component="div"
                          dangerouslySetInnerHTML={{
                            __html: `${data && data.body}`,
                          }}
                        />
                      </Box>
                      <Box>
                        <Button
                          variant="contained"
                          onClick={() => handleRead(readMore)}
                        >
                          {readMore ? "Read Less" : "Read More"}
                        </Button>
                      </Box>
                    </Stack>
                  </Grid>
                  <Grid item md={6} mt={8}>
                    <Box
                      component="img"
                      src={`${data?.base_url}${data?.feature_img}`}
                      alt="About us Thumb"
                      height="400px"
                      m="auto"
                    />
                  </Grid>
                </Grid>
              </Box>
            ) : (
              <SkeletonLoader />
            )}
          </div>
        </Container>
      </Box>
      <Box>
        <TotalDrivers />
      </Box>
      {/* <Container>
        <Grid container spacing={1} alignItems="center">
          <Grid className='aboutUs_grid_responsive'  item md={6}  mt={6}>
            <Stack spacing={1.5}>
              <Stack spacing={1.5} direction="row">
                <Box
                  sx={{
                    border: (theme) =>
                      `8px solid ${theme.palette.primary.main}`,
                  }}
                />
                <Typography fontSize={24} fontWeight={600}>
                  Our Story
                </Typography>
              </Stack>
              <Box>
                <Typography
                  fontSize={14}
                  fontWeight={400}
                  sx={{
                    overflow: "hidden",
                  }}
                  component="div"
                >
                  Placerat platonem per no, ut vim quas nostro contentiones. Te
                  pro appetere abhorreant, his qualisque liberavisse no. Malorum
                  theophrastus eum id. Quo an harum latine deleniti, est at
                  impetus facilisi, falli assentior sit id. Vix alienum
                  temporibus ut, ei ius aeque mucius eligendi, ne eum labore
                  epicurei. Ad abhorreant scripserit necessitatibus mea.
                  Placerat platonem per no, ut vim quas nostro contentiones. Te
                  pro appetere abhorreant, his qualisque liberavisse no. Malorum
                  theophrastus eum id. Quo an harum latine deleniti, est at
                  impetus facilisi, falli assentior sit id. Vix alienum
                  temporibus ut, ei ius aeque mucius eligendi, ne eum labore
                  epicurei. Ad abhorreant scripserit necessitatibus mea.
                </Typography>
              </Box>
            </Stack>
          </Grid>
          <Grid className='aboutUs_grid_responsive' item md={6} mt={4}>
            <Box
              component="img"
              m="auto"
              height="400px"
              src={`${data?.base_url}${data?.feature_img}`}
              alt="About us Thumb"
            />
          </Grid> 
          <Grid className='aboutUs_grid_responsive' item md={6}  mt={6}>
            <Stack spacing={1.5}>
              <Stack spacing={1.5} direction="row">
                <Box
                  sx={{
                    border: (theme) =>
                      `8px solid ${theme.palette.primary.main}`,
                  }}
                />
                <Typography fontSize={24} fontWeight={600}>
                  Our Story
                </Typography>
              </Stack>
              <Box>
                <Typography
                  fontSize={14}
                  fontWeight={400}
                  sx={{
                    overflow: "hidden",
                  }}
                  component="div"
                >
                  Placerat platonem per no, ut vim quas nostro contentiones. Te
                  pro appetere abhorreant, his qualisque liberavisse no. Malorum
                  theophrastus eum id. Quo an harum latine deleniti, est at
                  impetus facilisi, falli assentior sit id. Vix alienum
                  temporibus ut, ei ius aeque mucius eligendi, ne eum labore
                  epicurei. Ad abhorreant scripserit necessitatibus mea.
                  Placerat platonem per no, ut vim quas nostro contentiones. Te
                  pro appetere abhorreant, his qualisque liberavisse no. Malorum
                  theophrastus eum id. Quo an harum latine deleniti, est at
                  impetus facilisi, falli assentior sit id. Vix alienum
                  temporibus ut, ei ius aeque mucius eligendi, ne eum labore
                  epicurei. Ad abhorreant scripserit necessitatibus mea.
                </Typography>
              </Box>
            </Stack>
          </Grid>
          <Grid className='aboutUs_grid_responsive' item md={6} mt={4}>
            <Box
              component="img"
              m="auto"
              height="400px"
              src={`${data?.base_url}${data?.feature_img}`}
              alt="About us Thumb"
            />
          </Grid>
          <Grid className='aboutUs_grid_responsive' item md={6}  mt={6}>
            <Stack spacing={1.5}>
              <Stack spacing={1.5} direction="row">
                <Box
                  sx={{
                    border: (theme) =>
                      `8px solid ${theme.palette.primary.main}`,
                  }}
                />
                <Typography fontSize={24} fontWeight={600}>
                  Our Story
                </Typography>
              </Stack>
              <Box>
                <Typography
                  fontSize={14}
                  fontWeight={400}
                  sx={{
                    overflow: "hidden",
                  }}
                  component="div"
                >
                  Placerat platonem per no, ut vim quas nostro contentiones. Te
                  pro appetere abhorreant, his qualisque liberavisse no. Malorum
                  theophrastus eum id. Quo an harum latine deleniti, est at
                  impetus facilisi, falli assentior sit id. Vix alienum
                  temporibus ut, ei ius aeque mucius eligendi, ne eum labore
                  epicurei. Ad abhorreant scripserit necessitatibus mea.
                  Placerat platonem per no, ut vim quas nostro contentiones. Te
                  pro appetere abhorreant, his qualisque liberavisse no. Malorum
                  theophrastus eum id. Quo an harum latine deleniti, est at
                  impetus facilisi, falli assentior sit id. Vix alienum
                  temporibus ut, ei ius aeque mucius eligendi, ne eum labore
                  epicurei. Ad abhorreant scripserit necessitatibus mea.
                </Typography>
              </Box>
            </Stack>
          </Grid>
          <Grid className='aboutUs_grid_responsive' item md={6} mt={4}>
            <Box
              component="img"
              m="auto"
              height="400px"
              src={`${data?.base_url}${data?.feature_img}`}
              alt="About us Thumb"
            />
          </Grid>
        </Grid>
      </Container> */}
      <Box mt={6}>
        {/* <AboutSlider /> */}
      </Box>
    </React.Fragment>
  );
};

export default AboutUs;
