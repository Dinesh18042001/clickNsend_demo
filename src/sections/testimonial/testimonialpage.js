import {
  Avatar,
  Box,
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  Rating,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { StyledBgTest, StyledLine } from "./testimonialStyled";
import axiosInstance from "@/utils/axios";
import SkeletonLoader from "@/components/skeleton";
import { JobSekelton } from "@/components/not-found";

const TestimonialPage = () => {
  const [data, setData] = useState([]);
  const [loadingCard, setLoadingCard] = useState(false);
  const fetchTestApi = async () => {
    setLoadingCard(true);

    await axiosInstance
      .get("api/front/testimonials")
      .then((response) => {
        if (response?.status === 200) {
          setLoadingCard(false);

          setData(response?.data.view_data);
        } else {
          setLoadingCard(false);

          console.log(error);
        }
      })
      .catch((error) => {
        console.log(error, "Testimonial Page");
      });
  };
  useEffect(() => {
    fetchTestApi();
  }, []);

  console.log("datadatadata", data);
  return (
    <React.Fragment>
      <StyledBgTest>
        <Container>
          <Box py={6}>
            <Stack spacing={1} alignItems="center" color="#fff">
              <Typography variant="h3">Actual Customer Reviews</Typography>
              <Typography fontWeight={600}>
                And that{"'"}s just a few
              </Typography>
            </Stack>
            <Box py={6}>
              {loadingCard ? (
                <SkeletonLoader />
              ) : (
                <Grid
                  container
                  spacing={6}
                  justifyContent={loadingCard ? "center" : "left"}
                >
                  <>
                    {data && data.length > 0 ? (
                      data.map((elem, index) => {
                        return (
                          <Grid item sm={12} md={4} key={index}>
                            <Card
                              sx={{
                                borderRadius: "0px",
                                position: "relative",
                              }}
                            >
                              <CardContent>
                                <Stack
                                  direction="row"
                                  spacing={2}
                                  sx={{ mb: 2 }}
                                >
                                  <Box
                                    component="img"
                                    src={"/r1.png"}
                                    width="30px"
                                    height="22px"
                                    alt="testimonial icon"
                                  />
                                  <Box sx={{ minHeight: "11em" }}>
                                    <Typography>{elem.text}</Typography>
                                  </Box>
                                </Stack>
                                <Divider sx={{ mb: 2 }} />
                                <Stack
                                  direction="row"
                                  justifyContent="space-between"
                                >
                                  <Box>
                                    <Box>
                                      <Typography
                                        color="primary"
                                        fontWeight={600}
                                      >
                                        {elem.name}
                                      </Typography>
                                    </Box>

                                    <Box>
                                      <Rating value={elem.rating} readOnly />
                                    </Box>
                                  </Box>
                                  <Box
                                    sx={{
                                      position: "relative",
                                    }}
                                  >
                                    <Avatar
                                      alt={`${elem.name}`}
                                      src={`${elem.base_url}${elem.image}`}
                                      sx={{ width: 60, height: 60 }}
                                    />
                                  </Box>
                                </Stack>
                              </CardContent>
                            </Card>
                          </Grid>
                        );
                      })
                    ) : (
                      <>
                        {!loadingCard && data.length <= 0 && (
                          <JobSekelton title="No Testimonials" />
                        )}
                      </>
                    )}
                  </>
                </Grid>
              )}
            </Box>
          </Box>
        </Container>
      </StyledBgTest>
    </React.Fragment>
  );
};

export default TestimonialPage;
