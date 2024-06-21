import Iconify from "@/components/iconify/Iconify";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  IconButton,
  Stack,
  Typography,
  alpha,
} from "@mui/material";
import React, { useRef } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Slider from "react-slick";

const OurFleet = () => {
  const ref = useRef();
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    adaptiveHeight: true,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
  };
  const next = () => {
    ref.current.slickNext();
  };
  const previous = () => {
    ref.current.slickPrev();
  };
  return (
    <React.Fragment>
      <Box py={8}>
        <Container>
          <Box>
            <Typography
              sx={{
                fontSize: "25px !important",
                mb: 2,
                pl: 1,
                borderLeft: "16px  solid ",
                borderColor: (theme) => theme.palette.primary.main,
                fontWeight: 500,
              }}
            >
              Our Fleet
            </Typography>
            <Typography
              color="grey"
              sx={{ fontSize: "14px", lineHeight: "20px" }}
            >
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry standard dummy text
              ever sinceLorem Ipsum is simply dummy text of the printing and
              typesetting industr. Lorem Ipsum is simply dummy text of the
              printing and typesetting industry. Lorem Ipsum has been the
              industry standard dummy text ever sinceLorem Ipsum is simply dummy
              text of the printing and typesetting industr.
            </Typography>
          </Box>
          <Grid  className="primaryHomeSection_grid_responsive " container columnSpacing={3} mt={6}>
            <Grid className="primaryHomePage_grid_responsive " item xs={1} sm={2} md={3}>
              <Card
              className="primaryHomePages_Card_responsive "
                variant="outlined"
                sx={{
                  borderRadius: "5px",
                  height:"280px",
                  cursor: "pointer",
                  "&:hover": {
                    borderColor: (theme) => theme.palette.primary.main,
                  },
                }}
              >
                <CardContent>
                  <Box>
                    <Stack justifyContent="center" direction="column">
                      <Box
                        component="img"
                        src="/home/carFleet.png"
                        alt="car"
                        width="100%"
                        height={160}
                      />
                      <Typography variant="h5" textAlign="center">
                      Car
                      </Typography>
                      <Typography color="grey" fontSize={15} textAlign="center">
                        Extensive equipment and consolidation options
                      </Typography>
                      {/* <Box>
                    <Button
                      endIcon={<Iconify icon="ep:right" color="primary" />}
                    >
                      View All
                    </Button>
                  </Box> */}
                    </Stack>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid className="primaryHomePage_grid_responsive " item xs={1} sm={2} md={3}>
            <Card
                          className="primaryHomePages_Card_responsive "

                variant="outlined"
                sx={{
                  borderRadius: "5px",
                  height:"280px",
                  cursor: "pointer",
                  "&:hover": {
                    borderColor: (theme) => theme.palette.primary.main,
                  },
                }}
              >
                <CardContent>
              <Box>
                <Stack justifyContent="center" direction="column">
                  <Box
                    component="img"
                    src="/home/vanFleet.png"
                    alt="van"
                    width="100%"
                        height={160}
                  />
                  <Typography variant="h5" textAlign="center">Van</Typography>
                  <Typography color="grey" fontSize={15} textAlign="center">
                    Extensive equipment and consolidation options
                  </Typography>
                  {/* <Box>
                    <Button
                      endIcon={<Iconify icon="ep:right" color="primary" />}
                    >
                      View All
                    </Button>
                  </Box> */}
                </Stack>
              </Box>
              </CardContent></Card>
            </Grid>

            <Grid  className="primaryHomePage_grid_responsive " item xs={1} sm={2} md={3}>
              {/* <Slider ref={ref} {...settings}> */}
              <Card
                            className="primaryHomePages_Card_responsive "

                variant="outlined"
                sx={{
                  borderRadius: "5px",
                  height:"280px",
                  cursor: "pointer",
                  "&:hover": {
                    borderColor: (theme) => theme.palette.primary.main,
                  },
                }}
              >
                <CardContent>
              <Box>
                <Stack justifyContent="center" direction="column">
                  <Box
                    component="img"
                    src="/home/pickupFleet.png"
                    alt="pickup"
                    width="100%"
                        height={160}
                  />
                  <Typography variant="h5" textAlign="center">Pickup Truck</Typography>
                  <Typography color="grey" fontSize={15} textAlign="center">
                    Extensive equipment and consolidation options
                  </Typography>
                  {/* <Box>
                    <Button
                      endIcon={<Iconify icon="ep:right" color="primary" />}
                    >
                      View All
                    </Button>
                  </Box> */}

                </Stack>
              </Box>
              </CardContent></Card>
              {/* </Slider> */}
              {/* <Box sx={{ mt: 4 }}>
                <Stack direction="row" spacing={2}>
                  <Card
                    onClick={previous}
                    variant="outlined"
                    sx={{
                      borderRadius: "50%",
                      borderColor: (theme) =>
                        alpha(theme.palette.grey[900], 0.4),
                    }}
                  >
                    <IconButton>
                      <ArrowBackIcon
                        sx={{
                          color: (theme) =>
                            alpha(theme.palette.common.black, 0.9),
                          fontWeight: 500,
                        }}
                      />
                    </IconButton>
                  </Card>
                  <Card
                    onClick={next}
                    variant="outlined"
                    sx={{
                      borderRadius: "50%",
                      borderColor: (theme) =>
                        alpha(theme.palette.grey[900], 0.4),
                    }}
                  >
                    <IconButton>
                      <ArrowForwardIcon
                        sx={{
                          color: (theme) =>
                            alpha(theme.palette.common.black, 0.9),
                          fontWeight: 500,
                        }}
                      />
                    </IconButton>
                  </Card>
                </Stack>
              </Box> */}
            </Grid>
            <Grid  className="primaryHomePage_grid_responsive "
 item xs={1} sm={2} md={3}>
            <Card
             className="primaryHomePages_Card_responsive "
                variant="outlined"
                sx={{
                  borderRadius: "5px",
                  height:"280px",
                  cursor: "pointer",
                  "&:hover": {
                    borderColor: (theme) => theme.palette.primary.main,
                  },
                }}
              >
                <CardContent>
              <Box>
                <Stack justifyContent="center" direction="column">
                  <Box
                    component="img"
                    src="/home/truckFleet.png"
                    alt="Truck"
                     width="100%"
                        height={160}
                  />
                  <Typography variant="h5" textAlign="center">Refrigetro Truck</Typography>
                  <Typography color="grey"  textAlign="center" fontSize={15}>
                    Extensive equipment and consolidation options
                  </Typography>
                  {/* <Box>
                    <Button
                      endIcon={<Iconify icon="ep:right" color="primary" />}
                    >
                      View All
                    </Button>
                  </Box> */}
                </Stack>
              </Box>
              </CardContent></Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </React.Fragment>
  );
};

export default OurFleet;
