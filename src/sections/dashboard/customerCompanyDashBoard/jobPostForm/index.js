import React, { useContext } from "react";
import {
  Box,
  Breadcrumbs,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import StepOne from "./form/step_one";
import ScrollableTabs from "@/components/scrollableTabs";
import StepTwo from "./form/step_two";
import StepThree from "./form/step_three";
import { StepperContext } from "@/components/stepper/stepperContext";
import Link from "next/link";

const JobPostForm = ({
  formik,
  addProduct,
  removeProduct,
  addAddress,
  removesAddress,
  addSingleAddress,
  addSingleAddress1,

}) => {
  const { value } = useContext(StepperContext);
  const isLastStep = value === 3 - 1;
  const setStep = 3;

  const router = useRouter();
  const { id } = router.query;
  const tabs = [
    {
      title: "Basic",
      fields: ["name"],
      component: (
        <>
          <StepOne formik={formik} />
        </>
      ),
    },
    {
      title: "Details",
      fields: ["items"],
      component: (
        <>
          <StepTwo
            formik={formik}
            id={id}
            removeProduct={removeProduct}
            addProduct={addProduct}
            addSingleAddress={addSingleAddress}
            addSingleAddress1={addSingleAddress1}
            removesAddress={removesAddress}
          />
        </>
      ),
    },
    {
      title: "Address",
      fields: ["vehicle", "vehical_type",  "description"],
      component: (
        <>
          <StepThree formik={formik} />
        </>
      ),
    },
  ];

  return (
    <React.Fragment>
      <Box
        sx={{ background: (theme) => theme.palette.grey[400], mt: 8, pb: 12 }}
      >
        <Container sx={{ py: 3 }}>
          <Stack spacing={4}>
            <Box>
              {/* <DashboardCard /> */}
              <Breadcrumbs aria-label="breadcrumb">
                <Box
                  component={Link}
                  sx={{ textDecoration: "none" }}
                  color="grey"
                  href="/"
                >
                  Home
                </Box>
                <Box
                  component={Link}
                  sx={{ textDecoration: "none" }}
                  color="grey"
                  href="/dashboard/customer/job_posted"
                >
                  Dashboard
                </Box>
                <Box
                  component={Link}
                  sx={{ textDecoration: "none" }}
                  color="grey"
                  href="/dashboard/customer/job_posted"
                >
                  Job Posted
                </Box>
                <Typography color="text.primary">
                  {id === "create" ? "Add New Job" : "Edit Job"}
                </Typography>
              </Breadcrumbs>
            </Box>
            <Box>
              <Card sx={{ borderRadius: "0px" }}>
                <CardContent>
                  <Stack direction="row" spacing={1} py={2}>
                    {/* <Iconify width="2em" icon="ion:briefcase" color="#ff7534" /> */}
                    <Typography fontWeight={500} fontSize={24}>
                      {" "}
                      {id === "create" ? "Post Your Job" : "Edit Your Job"}
                    </Typography>
                  </Stack>
                  <Box
                    component="form"
                    noValidate
                    onSubmit={formik.handleSubmit}
                  >
                    {id === "create" ? (
                      <ScrollableTabs
                        setStep={setStep}
                        isLastStep={isLastStep}
                        tabs={tabs}
                        formik={formik}
                      />
                    ) : (
                      <Grid container spacing={1}>
                        <Grid item md={12}>
                          <StepOne formik={formik} />
                        </Grid>
                        <Grid item md={12}>
                          <StepTwo
                            formik={formik}
                            id={id}
                            removeProduct={removeProduct}
                            addProduct={addProduct}
                            removesAddress={removesAddress}
                          />
                        </Grid>
                        <Grid  item md={12}>
                          <StepThree formik={formik} />
                        </Grid>
                        <Grid
                          container
                          spacing={2}
                          alignItems="center"
                          justifyContent="center"
                          sx={{ mt: 1 }}
                        >
                          <Grid item md={2}>
                            <Box>
                              <Button
                                variant="outlined"
                                fullWidth
                                onClick={() =>
                                  router.push("/dashboard/customer/job_posted")
                                }
                              >
                                Cancel
                              </Button>
                            </Box>
                          </Grid>
                          <Grid item md={2}>
                            <Box sx={{ width: "180px" }}>
                              <Button
                                variant="contained"
                                fullWidth
                                type="submit"
                                onClick={() =>
                                  router.push("/dashboard/customer/job_posted")
                                }
                              >
                                Save
                              </Button>
                            </Box>
                          </Grid>
                        </Grid>
                      </Grid>
                    )}
                  </Box>
                </CardContent>
              </Card>
            </Box>
          </Stack>
        </Container>
      </Box>
    </React.Fragment>
  );
};

export default JobPostForm;
