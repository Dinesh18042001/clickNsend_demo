import { BannerSection } from "@/components/banner";
import Iconify from "@/components/iconify";
import SkeletonLoader from "@/components/skeleton";
import axiosInstance from "@/utils/axios";
import {
  Box,
  Breadcrumbs,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import Link from "next/link";
import PaymentPage from "./paymentPage";
import { loadStripe } from "@stripe/stripe-js";
import React, { useState,useEffect } from "react";
import CardPaymentForm from '../paymentPage/CardPaymentForm'
import { useAuthContext } from "@/auth/useAuthContext";
const SubscriptionsPage = () => {
  const { user } = useAuthContext();
  const activePlan = user?.plan
  const [hover, setHover] = useState(0);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [stripePromise, setStripePromise] = useState(null);

  const [paymentDetails, setPaymentDetails] = useState(null);
  const [showPayment, setShowPayment] = useState(false); // State to control the display of PaymentPage

  // API FETCH LIST



  const fetchdata = async (type = "customer") => {
    setLoading(true);
    const statusShowPlan = 1 ;
    await axiosInstance
      .get(`/api/auth/master/plan/list/${type}/${statusShowPlan}`)
      .then((response) => {
        if (response.status === 200) {
          setLoading(false);
          setData(response?.data.view_data);
        }
      })
      .catch((error) => {
        setLoading(false);
        console.log("error", error);
      });
  };

  React.useEffect(() => {
    fetchdata();
  }, []);

  const handleCheckout = async (elem) => {
    setPaymentDetails(elem)
    console.log("Selected Plan: ", elem);
    setShowPayment(true); 

  //   const stripe = await loadStripe("pk_test_51LKfAOSJ8dZUi1GsNUiaUFRZ4wv8NIMfanCq6X9sQm9ekgREnQYVNid0ksBJL0PwLd75E9ASbQVptpqr21uNqMp000qtwcZJCV");
  //   // sk_test_51LKfAOSJ8dZUi1GsRwvDVKOZr0HzELRyQuV3UawLIoF8GXVNwPc3BA6x9XDnxB8oYy88or5hjxdsT7H5fPUiWQKC00jyJxfL1Z
  //   const body =  {
  //    products: elem,
  //   }
  //   const headers =  {
  //     "Content-Type": "application/json",
  //    }
  //    const response = await fetch("http://localhost:7000/api/create-checkout-session",{
  //     method:"POST",
  //     headers:headers,
  //     body:JSON.stringify(body)
  // }
  // );
  // const session = await response.json();

  // const result = stripe.redirectToCheckout({
  //     sessionId:session.id
  // });;

  //   if (result.error) {
  //     console.error(result.error);
  //   }
  };
  console.log("datadata", data);

  return (
    <React.Fragment>
     
      {!showPayment ? (
      <Box sx={{ backgroundColor: "#f5f5f5", pb: 6 }}>
        {loading ? (
          <>
            <Container>
              <SkeletonLoader />
            </Container>
          </>
        ) : (
          <>
          <Box
        sx={{
          position: "relative",
          overflow: "hidden",
          width: "100%",
          height: { lg: "550px", md: "550px", sm: "100%", xs: "100%" },
          backgroundImage: `url("/banner/banner.png")`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right center",
          zIndex: 5,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          // "&::before": {
          //   content: '""',
          //   backgroundImage:
          //     "linear-gradient(to left, rgba(77,39,63,0) 0%, #463b46 160%)",
          //   position: "absolute",
          //   top: 0,
          //   left: 0,
          //   bottom: 0,
          //   right: 0,
          //   zIndex: 7,
          // },
        }}
      >
        <Stack
        className="Subscritption_box_stack_responsive"
          sx={{ zIndex: 8, position: "absolute", left: "8em", top: "7em" }}
        >
          <Breadcrumbs aria-label="breadcrumb" sx={{ color: "common.white" }}>
            <Box
              component={Link}
              sx={{ textDecoration: "none" }}
              color="common.white"
              href="/"
            >
              Home
            </Box>
            <Box
              component={Link}
              sx={{ textDecoration: "none" }}
              color="common.white"
              href="/dashboard/customer/job_posted"
            >
              Dashboard
            </Box>
            <Typography
              sx={{ textDecoration: "none", fontWeight: 600 }}
              color="common.white"
            >
              Subscription
            </Typography>
          </Breadcrumbs>
        </Stack>
        <CardContent
         className="dashboard_subscription_box_stack_responsive"
          sx={{
            paddingTop: {
              lg: "6rem!important",
              md: "6rem!important",
              sm: "6rem!important",
              xs: "3rem!important",
            },
            paddingBottom: {
              lg: "4rem!important",
              md: "4rem!important",
              sm: "2rem!important",
              xs: "2rem!important",
            },
            position: "relative",
            zIndex: 9,
          }}
        >
          {/* <CardContentOverlay> */}
          <Stack spacing={4}>
            <Typography
              gutterBottom
              fontSize={44}
              component="h2"
              fontWeight={600}
              color="white"
              variant="h2"
            >
              Our Subscription Plans
            </Typography>
            <Typography variant="body1" component="p" color="common.white">
              Choose the right plan made for you
            </Typography>
          </Stack>
        </CardContent>
      </Box>
          <Box
          className='subscription_plan_box_stack_responsive'
            sx={{
              position: "relative",
              top: -140,
              zIndex: 6,
            }}
          >
            <Container>
              <Box pb={0}>
              
                <Grid  className="DashboardSubscritption_Grid_stack_responsive"  container spacing={6}>
                  {data &&
                    data?.length > 0 &&
                    data.map((elem, index) => {
                      const isActivePlan = activePlan.plan_id === plan.id;
                      return (
                        <Grid item md={4} key={index}>
                          <Card
                            sx={{ borderRadius: "20px" }}
                            onMouseOver={() => setHover(index)}
                            onMouseOut={() => setHover(false)}
                          >
                            <CardContent>
                              <Box
                                sx={{
                                  textAlign: "center",
                                  py: 5,
                                  backgroundImage:
                                    "url(/assets/images/home/subscription/subscription_banner.png)",
                                  backgroundRepeat: "no-repeat",
                                  objectFit: "contain",
                                }}
                              >
                                <Box>
                                  <Typography
                                    variant="h4"
                                    color="common.white"
                                    fontWeight={600}
                                  >
                                    {elem?.name}
                                  </Typography>
                                </Box>
                              </Box>
                              <Box>
                                <Stack
                                  direction="column"
                                  spacing={0.6}
                                  alignItems="center"
                                  justifyContent="center"
                                >
                                  <Typography variant="h3">
                                    ${elem?.price}
                                  </Typography>
                                  <Typography variant="body1" fontWeight={400}>
                                    /month
                                  </Typography>
                                </Stack>
                              </Box>
                              <Stack spacing={1}>
                                <Box>
                                  <Box textAlign="center">
                                    <List>
                                      <ListItem sx={{ position: "relative" }}>
                                        <ListItemIcon
                                          sx={{ position: "absolute" }}
                                        >
                                          <Iconify
                                            icon="charm:square-tick"
                                            color={(theme) =>
                                              theme.palette.success.main
                                            }
                                          />
                                        </ListItemIcon>
                                        <ListItemText
                                          sx={{ textAlign: "center" }}
                                          primary="Online System"
                                        />
                                      </ListItem>
                                      <ListItem sx={{ position: "relative" }}>
                                        <ListItemIcon
                                          sx={{ position: "absolute" }}
                                        >
                                          <Iconify
                                            icon="charm:square-tick"
                                            color={(theme) =>
                                              theme.palette.success.main
                                            }
                                          />
                                        </ListItemIcon>
                                        <ListItemText
                                          sx={{ textAlign: "center" }}
                                          primary=" Free apps"
                                        />
                                      </ListItem>
                                      <ListItem sx={{ position: "relative" }}>
                                        <ListItemIcon
                                          sx={{ position: "absolute" }}
                                        >
                                          <Iconify
                                            icon="system-uicons:cross"
                                            color="red"
                                          />
                                        </ListItemIcon>
                                        <ListItemText
                                          sx={{ textAlign: "center" }}
                                          primary=" Free apps"
                                        />
                                      </ListItem>
                                      <ListItem sx={{ position: "relative" }}>
                                        <ListItemIcon
                                          sx={{ position: "absolute" }}
                                        >
                                          <Iconify
                                            icon="charm:square-tick"
                                            color={(theme) =>
                                              theme.palette.success.main
                                            }
                                          />
                                        </ListItemIcon>
                                        <ListItemText
                                          sx={{ textAlign: "center" }}
                                          primary="live preview"
                                        />
                                      </ListItem>
                                      <ListItem sx={{ position: "relative" }}>
                                        <ListItemIcon
                                          sx={{ position: "absolute" }}
                                        >
                                          <Iconify
                                            icon="system-uicons:cross"
                                            color="red"
                                          />
                                        </ListItemIcon>
                                        <ListItemText
                                          sx={{ textAlign: "center" }}
                                          primary="Support unlimited"
                                        />theme
                                      </ListItem>
                                    </List>
                                  </Box>
                                </Box>

                                <Stack alignItems="center">
                                {isActivePlan ? (
                                    <Button
                                      fullWidth
                                      variant="contained"
                                      sx={{ px: 5 }}
                                      onClick={() => handleCheckout(plan)}
                                    >
                                      Activate Plan
                                    </Button>
                                  ) : (
                                    <Button
                                      fullWidth
                                      variant="contained"
                                      sx={{ px: 5 }}
                                      onClick={() => handleCheckout(plan)}
                                    >
                                      Get Started
                                    </Button>
                                  )}
                                </Stack>
                              </Stack>
                            </CardContent>
                          </Card>
                        </Grid>
                      );
                    })}
                </Grid>
              </Box>
            </Container>
          </Box>
          </>
        )}
      </Box>
      ) : (
        <CardPaymentForm paymentDetails={paymentDetails} setShowPayment={setShowPayment}  /> // Render the PaymentPage component when showPayment is true
      )}
    </React.Fragment>
  );
};

export default SubscriptionsPage;
