import {
  Avatar,
  Box,
  Card,
  CardContent,
  Container,
  IconButton,
  Rating,
  Stack,
  Typography,
  alpha,
} from "@mui/material";
import React, { useEffect, useRef } from "react";
import Slider from "react-slick";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useDispatch, useSelector } from "@/redux/store";
import { getTestimonial } from "@/redux/slices/home/home";

const Testimonials = () => {
  const dispatch = useDispatch();
  const {
    testimonial: { data },
  } = useSelector((state) => state.home);
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

  useEffect(() => {
    dispatch(getTestimonial());
  }, []);
  return (
    <>
      <Box
        sx={{ backgroundColor: "#FFF8F4", py: 8, pb: 20, position: "relative" }}
      >
        <Container>
          <Box textAlign="center" mb={8}>
            <Box>
              <Typography variant="h6" color="primary">
                Testimonials
              </Typography>
            </Box>
            <Box>
              <Typography variant="h5">
                What our clients say about us.
              </Typography>
            </Box>
          </Box>
          <Box>
            <Slider {...settings} ref={ref}>
              {data?.tsti?.map((elem, index) => {
                if (index > 12) {
                  return "";
                }
                return (
                  <Box key={index} px={1}>
                    <Card
                      variant="outlined"
                      sx={{
                        height: "17em",
                        borderColor: (theme) => theme.palette.primary.main,
                      }}
                    >
                      <CardContent>
                        <Stack alignItems="center">
                          <Box>
                            <Avatar
                              src={`${elem.base_url}${elem.image}`}
                              sx={{ width: "100px", height: "100px" }}
                            />
                          </Box>
                          <Box>
                            <Typography variant="subtitle1">
                              {elem.name}
                            </Typography>
                          </Box>
                          <Box>
                            <Rating value={elem.rating} readOnly size="small" />
                          </Box>
                          <Box>
                            <Typography
                              textAlign="center"
                              sx={{
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                display: "-webkit-box",
                                WebkitLineClamp: "3",
                                WebkitBoxOrient: "vertical",
                              }}
                              fontSize={14}
                            >
                             
                              {elem.text}
                             
                            </Typography>
                          </Box>
                        </Stack>
                      </CardContent>
                    </Card>
                  </Box>
                );
              })}
            </Slider>
            <Box sx={{ position: "absolute", top: "48%", left: "4%" }}>
              <Card
                onClick={previous}
                variant="outlined"
                sx={{
                  borderRadius: "50%",
                  backgroundColor: (theme) => theme.palette.primary.main,
                }}
              >
                <IconButton>
                  <ArrowBackIcon
                    sx={{
                      color: (theme) => alpha(theme.palette.common.white, 0.9),
                      fontWeight: 500,
                    }}
                  />
                </IconButton>
              </Card>
            </Box>
            <Box sx={{ position: "absolute", top: "48%", right: "4%" }}>
              <Card
                onClick={next}
                variant="outlined"
                sx={{
                  borderRadius: "50%",
                  backgroundColor: (theme) => theme.palette.primary.main,
                }}
              >
                <IconButton>
                  <ArrowForwardIcon
                    sx={{
                      color: (theme) => alpha(theme.palette.common.white, 0.9),

                      fontWeight: 500,
                    }}
                  />
                </IconButton>
              </Card>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Testimonials;
