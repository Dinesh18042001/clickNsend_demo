import Iconify from "@/components/iconify/Iconify";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Rating,
  Typography,
} from "@mui/material";
import React from "react";
import Slider from "react-slick";

const NewTestimonial = () => {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: false,
    adaptiveHeight: true,
    autoplay:true,
    autoplaySpeed:2000,
    pauseOnHover:true
    
  };
  return (
    <React.Fragment>
      <Box py={4} sx={{ backgroundColor: "#000000" }}>
        <Container>
          <Container>
            <Grid container Spacing={4}>
              <Grid item md={4}>
                <CardContent sx={{ pt: "0px !important" }}>
                  <CardContent sx={{ pt: "0px !important" }}>
                    <Typography color="#fff" variant="h3" mb={2}>
                      What Our Client Says
                    </Typography>
                    <Typography color="grey" sx={{ fontSize: "14px" }}>
                      {" "}
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry
                      {"'"}s standard dummy text ever .
                    </Typography>
                  </CardContent>
                </CardContent>
              </Grid>
              <Grid item md={8}>
                <Slider {...settings}>
                  {[...Array(4)].map((elem, index) => {
                    return (
                      <Box key={index} px={1}>
                        <Card sx={{ position: "relative" }}>
                          <CardContent
                            sx={{
                              px: "12px !important",
                              py: "18px !important",
                            }}
                          >
                            <Rating
                              color="primary"
                              sx={{
                                "&.MuiRating-root": {
                                  color: (theme) => theme.palette.primary.main,
                                },
                              }}
                              name="read-only"
                              value={4}
                              readOnly
                            />
                            <Typography
                              mb={2.2}
                              color="grey"
                              sx={{ fontSize: "14px" }}
                            >
                              Lorem Ipsum is simply dummy text of the printing
                              and typesetting industryLorem Ipsum is simply
                              dummy text of the printing and typesetting
                              industry
                            </Typography>
                            <Grid container spacing={2}>
                              <Grid item md={3}>
                                <Box
                                  component={"img"}
                                  src="/testimonialimage.png"
                                />
                              </Grid>
                              <Grid item md={9}>
                                <Typography
                                  variant="h6"
                                  sx={{ fontSize: "16px !important" }}
                                >
                                  Diego Thompson
                                </Typography>
                                <Typography
                                  sx={{ fontSize: "14px !important" }}
                                >
                                  Lives in: Atlantis Resort
                                </Typography>
                              </Grid>
                            </Grid>

                            <Button
                              variant="contained"
                              sx={{
                                position: "absolute",
                                right: "0",
                                bottom: "0",
                                borderRadius: "6px",
                                py: 2,
                              }}
                            >
                              <Iconify icon="ep:right" color="primary" />
                            </Button>
                          </CardContent>
                        </Card>
                      </Box>
                    );
                  })}
                </Slider>
              </Grid>
            </Grid>
          </Container>
        </Container>
      </Box>
    </React.Fragment>
  );
};

export default NewTestimonial;
