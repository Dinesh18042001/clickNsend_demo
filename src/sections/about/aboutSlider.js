import Iconify from "@/components/iconify";
import {
  alpha,
  Box,
  Card,
  Container,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { useRef } from "react";
import Slider from "react-slick";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const AboutSlider = () => {
  const ref = useRef();
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
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
    <>
      <Box py={10} sx={{ backgroundColor: "#0f0f0f" }}>
        <Container>
          <Box textAlign="center">
            <Typography fontSize={34} fontWeight={600} color="common.white">
              Hear From the{" "}
              <Typography
                fontSize={34}
                color="primary"
                fontWeight={600}
                component="span"
              >
                {" "}
                Team
              </Typography>
            </Typography>
          </Box>
          <Box my={6}>
            <Grid container spacing={2}>
              <Grid item md={6}>
                <Box>
                  <Box
                    component="img"
                    width="331px"
                    height="331px"
                    src="/about/avatar.png"
                    m="auto"
                    sx={{ border: "10px solid white", borderRadius: "50%" }}
                  />
                </Box>
              </Grid>
              <Grid item md={6}>
                <Slider ref={ref} {...settings}>
                  <Box>
                    <Box>
                      <Iconify
                        sx={{ color: (theme) => theme.palette.primary.main }}
                        icon="ri:double-quotes-l"
                        width={60}
                      />
                    </Box>
                    <Box>
                      <Typography
                        fontSize={14}
                        fontWeight={400}
                        color="common.white"
                      >
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry{"'"}s standard dummy text ever sinceLorem Ipsum is
                        simply dummy text of the printing and typesetting
                        industr. Lorem Ipsum is simply dummy text of the
                        printing and typesetting industry. Lorem Ipsum has been
                        the industry{"'"}s standard dummy text ever sinceLorem Ipsum
                        is simply dummy text of the Surendra Kumar
                      </Typography>
                    </Box>
                    <Box my={2}>
                      {" "}
                      <Typography
                        fontSize={18}
                        fontWeight={600}
                        color="#878787"
                      >
                        Surendra Kumar
                      </Typography>
                    </Box>
                  </Box>
                  
                </Slider>
                <Box sx={{ mt: 4 }}>
                  <Stack direction="row" spacing={2}>
                    <Card
                      onClick={previous}
                      variant="outlined"
                      sx={{
                        background: (theme) => theme.palette.primary.main,
                        borderRadius: "50%",
                        borderColor: (theme) =>
                          alpha(theme.palette.grey[900], 0.4),
                      }}
                    >
                      <IconButton>
                        <ArrowBackIcon
                          sx={{
                            color: (theme) =>
                              alpha(theme.palette.common.white, 0.9),
                            fontWeight: 500,
                          }}
                        />
                      </IconButton>
                    </Card>
                    <Card
                      onClick={next}
                      variant="outlined"
                      sx={{
                        background: (theme) => theme.palette.primary.main,
                        borderRadius: "50%",
                        borderColor: (theme) =>
                          alpha(theme.palette.grey[900], 0.4),
                      }}
                    >
                      <IconButton>
                        <ArrowForwardIcon
                          sx={{
                            color: (theme) =>
                              alpha(theme.palette.common.white, 0.9),
                            fontWeight: 500,
                          }}
                        />
                      </IconButton>
                    </Card>
                  </Stack>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default AboutSlider;
