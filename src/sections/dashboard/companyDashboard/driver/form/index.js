import { PasswordBox, TextBox } from "@/components/form";
import { Close } from "@mui/icons-material";
import {
  Box,
  Breadcrumbs,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const DriverJobForm = ({ formik }) => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <React.Fragment>
      <Box
        sx={{ background: (theme) => theme.palette.grey[400], mt: 8, pb: 12 }}
      >
        <Container sx={{ py: 3 }}>
          <Stack spacing={4}>
            <Box>
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
                  href="/dashboard/company"
                >
                  Dashboard
                </Box>
                <Box
                  component={Link}
                  sx={{ textDecoration: "none" }}
                  color="grey"
                  href="/dashboard/company/driver/list"
                >
                  Driver
                </Box>
                <Typography color="text.primary">
                  {id === "create" ? "Add Driver" : "Update Driver"}
                </Typography>
              </Breadcrumbs>
            </Box>
            <Box>
              <Card sx={{ borderRadius: "0px" }}>
                <CardContent>
                  <Stack direction="row" spacing={1} py={2}>
                    <Typography fontWeight={500} fontSize={24}>
                      {id === "create" ? "Add Driver" : "Update Driver"}
                    </Typography>
                  </Stack>
                  <Box
                  >
                  
                    <Container>
                      <Box
                        component="form"
                        noValidate
                        onSubmit={formik.handleSubmit}
                      >
                        <Grid container spacing={4}>
                          <Grid item md={12} sm={12} xs={12}>
                            <TextBox
                              fullWidth
                              placeholder={
                                formik.values.user_type === "company"
                                  ? "Enter Company Name"
                                  : "Enter Your Full Name"
                              }
                              name="user_name"
                              value={formik.values.user_name}
                              onChange={formik.handleChange}
                              helperText={
                                formik.touched.user_name &&
                                formik.errors.user_name
                              }
                              size={"small"}
                            />
                          </Grid>
                          <Grid item md={6} sm={12} xs={12}>
                            <TextBox
                              fullWidth
                              placeholder={
                                formik.values.user_type === "company"
                                  ? "Enter Company Email"
                                  : "Enter Your Email Address"
                              }
                              name="email"
                              value={formik.values.email}
                              onChange={formik.handleChange}
                              helperText={
                                formik.touched.email && formik.errors.email
                              }
                              size={"small"}
                            />
                          </Grid>
                          <Grid item md={6} sm={12} xs={12}>
                            <TextBox
                              fullWidth
                              placeholder={"Enter Your Contact Number"}
                              name="mobile"
                              value={formik.values.mobile}
                              onChange={(e) => {
                        const cleanedValue = e.target.value
                          .replace(/\D/gm, "")
                          .slice(0, 11);
                        formik.setFieldValue("mobile", cleanedValue);
                      }}
                              helperText={
                                formik.touched.mobile && formik.errors.mobile
                              }
                              size={"small"}
                            />
                          </Grid>
                          {id === "create" && (
                            <>
                              <Grid item md={6} sm={12} xs={12}>
                                <PasswordBox
                                  fullWidth
                                  placeholder={"Enter Password"}
                                  name="password"
                                  value={formik.values.password}
                                  onChange={formik.handleChange}
                                  helperText={
                                    formik.touched.password &&
                                    formik.errors.password
                                  }
                                  size={"small"}
                                />
                              </Grid>
                              <Grid item md={6} sm={12} xs={12}>
                                <PasswordBox
                                  fullWidth
                                  placeholder={"Enter Confirm Password"}
                                  name="password_confirmation"
                                  value={formik.values.password_confirmation}
                                  onChange={formik.handleChange}
                                  helperText={
                                    formik.touched.password_confirmation &&
                                    formik.errors.password_confirmation
                                  }
                                  size={"small"}
                                />
                              </Grid>
                            </>
                          )}
                          <Grid item md={4}>
                            <Stack textAlign={"center"}>
                              <Typography textAlign="left" variant="p">
                                Driver Photo
                              </Typography>
                              {!formik.values.profile_img && (
                                <TextBox
                                  fullWidth
                                  isAdditional={true}
                                  textBoxSx={{
                                    "& .MuiInput-root:after": {
                                      borderBottom: "0px !important",
                                    },
                                    "& .MuiInput-root:before": {
                                      borderBottom: "0px !important",
                                      content: '""',
                                    },
                                  }}
                                  type="file"
                                  size="small"
                                  value=""
                                  name="profile_img"
                                  onChange={(e) => {
                                    formik.setFieldValue(
                                      "profile_img",
                                      e.target.files[0]
                                    );
                                    formik.setFieldValue(
                                      "profile_img_url",
                                      URL.createObjectURL(e.target.files[0])
                                    );
                                  }}
                                  helperText={
                                    formik.touched.profile_img &&
                                    formik.errors.profile_img
                                  }
                                />
                              )}

                              {formik.values.profile_img_url &&
                                formik.values.profile_img && (
                                  <Card sx={{ width: "max-content" }}>
                                    <CardContent
                                      sx={{
                                        pb: "10px !important",
                                        pt: "30px !important",
                                        px: "10px !important",
                                      }}
                                    >
                                      <Box
                                        sx={{
                                          position: "absolute",
                                          top: 5,
                                          right: 6,
                                        }}
                                      >
                                        <Card sx={{ borderRadius: "50%" }}>
                                          <IconButton
                                            size="small"
                                            onClick={() => {
                                              formik.setFieldValue(
                                                "profile_img",
                                                ""
                                              );
                                              formik.setFieldValue(
                                                "profile_img_url",
                                                ""
                                              );
                                            }}
                                          >
                                            <Close fontSize="small" />
                                          </IconButton>
                                        </Card>
                                      </Box>
                                      <Box
                                        component="img"
                                        style={{ margin: "10px" }}
                                        src={formik.values.profile_img_url}
                                        alt={formik.values.profile_img.name}
                                        width="100px"
                                        height="100px"
                                        thumbnail
                                      />
                                    </CardContent>
                                  </Card>
                                )}
                            </Stack>
                          </Grid>
                          <Grid item md={4}>
                            <Stack textAlign={"center"}>
                              <Typography textAlign="left" variant="p">
                                Driver Licence Front
                              </Typography>
                              {!formik.values.licence_front && (
                                <TextBox
                                  fullWidth
                                  isAdditional={true}
                                  textBoxSx={{
                                    "& .MuiInput-root:after": {
                                      borderBottom: "0px !important",
                                    },
                                    "& .MuiInput-root:before": {
                                      borderBottom: "0px !important",
                                      content: '""',
                                    },
                                  }}
                                  type="file"
                                  size="small"
                                  value=""
                                  name="licence_front"
                                  onChange={(e) => {
                                    formik.setFieldValue(
                                      "licence_front",
                                      e.target.files[0]
                                    );
                                    formik.setFieldValue(
                                      "licence_front_url",
                                      URL.createObjectURL(e.target.files[0])
                                    );
                                  }}
                                  helperText={
                                    formik.touched.licence_front &&
                                    formik.errors.licence_front
                                  }
                                />
                              )}

                              {formik.values.licence_front_url &&
                                formik.values.licence_front && (
                                  <Card sx={{ width: "max-content" }}>
                                    <CardContent
                                      sx={{
                                        pb: "10px !important",
                                        pt: "30px !important",
                                        px: "10px !important",
                                      }}
                                    >
                                      <Box
                                        sx={{
                                          position: "absolute",
                                          top: 5,
                                          right: 6,
                                        }}
                                      >
                                        <Card sx={{ borderRadius: "50%" }}>
                                          <IconButton
                                            size="small"
                                            onClick={() => {
                                              formik.setFieldValue(
                                                "licence_front",
                                                ""
                                              );
                                              formik.setFieldValue(
                                                "licence_front_url",
                                                ""
                                              );
                                            }}
                                          >
                                            <Close fontSize="small" />
                                          </IconButton>
                                        </Card>
                                      </Box>
                                      <Box
                                        component="img"
                                        style={{ margin: "10px" }}
                                        src={formik.values.licence_front_url}
                                        alt={formik.values.licence_front.name}
                                        width="100px"
                                        height="100px"
                                        thumbnail
                                      />
                                    </CardContent>
                                  </Card>
                                )}
                            </Stack>
                          </Grid>
                          <Grid item md={4}>
                            <Stack textAlign={"center"}>
                              <Typography textAlign="left" variant="p">
                                Driver Licence Back
                              </Typography>
                              {!formik.values.licence_back && (
                                <TextBox
                                  fullWidth
                                  isAdditional={true}
                                  textBoxSx={{
                                    "& .MuiInput-root:after": {
                                      borderBottom: "0px !important",
                                    },
                                    "& .MuiInput-root:before": {
                                      borderBottom: "0px !important",
                                      content: '""',
                                    },
                                  }}
                                  type="file"
                                  size="small"
                                  value=""
                                  name="licence_back"
                                  onChange={(e) => {
                                    formik.setFieldValue(
                                      "licence_back",
                                      e.target.files[0]
                                    );
                                    formik.setFieldValue(
                                      "licence_back_url",
                                      URL.createObjectURL(e.target.files[0])
                                    );
                                  }}
                                  helperText={
                                    formik.touched.licence_back &&
                                    formik.errors.licence_back
                                  }
                                />
                              )}

                              {formik.values.licence_back_url &&
                                formik.values.licence_back && (
                                  <Card sx={{ width: "max-content" }}>
                                    <CardContent
                                      sx={{
                                        pb: "10px !important",
                                        pt: "30px !important",
                                        px: "10px !important",
                                      }}
                                    >
                                      <Box
                                        sx={{
                                          position: "absolute",
                                          top: 5,
                                          right: 6,
                                        }}
                                      >
                                        <Card sx={{ borderRadius: "50%" }}>
                                          <IconButton
                                            size="small"
                                            onClick={() => {
                                              formik.setFieldValue(
                                                "licence_back",
                                                ""
                                              );
                                              formik.setFieldValue(
                                                "licence_back_url",
                                                ""
                                              );
                                            }}
                                          >
                                            <Close fontSize="small" />
                                          </IconButton>
                                        </Card>
                                      </Box>
                                      <Box
                                        component="img"
                                        style={{ margin: "10px" }}
                                        src={formik.values.licence_back_url}
                                        alt={formik.values.licence_back.name}
                                        width="100px"
                                        height="100px"
                                        thumbnail
                                      />
                                    </CardContent>
                                  </Card>
                                )}
                            </Stack>
                          </Grid>
                          <Grid item md={4}>
                            <Stack textAlign={"center"}>
                              <Typography textAlign="left" variant="p">
                                Address Proof
                              </Typography>
                              {!formik.values.address_proof && (
                                <TextBox
                                  fullWidth
                                  isAdditional={true}
                                  textBoxSx={{
                                    "& .MuiInput-root:after": {
                                      borderBottom: "0px !important",
                                    },
                                    "& .MuiInput-root:before": {
                                      borderBottom: "0px !important",
                                      content: '""',
                                    },
                                  }}
                                  type="file"
                                  size="small"
                                  value=""
                                  name="address_proof"
                                  onChange={(e) => {
                                    formik.setFieldValue(
                                      "address_proof",
                                      e.target.files[0]
                                    );
                                    formik.setFieldValue(
                                      "address_proof_url",
                                      URL.createObjectURL(e.target.files[0])
                                    );
                                  }}
                                  helperText={
                                    formik.touched.address_proof &&
                                    formik.errors.address_proof
                                  }
                                />
                              )}

                              {formik.values.address_proof_url &&
                                formik.values.address_proof && (
                                  <Card sx={{ width: "max-content" }}>
                                    <CardContent
                                      sx={{
                                        pb: "10px !important",
                                        pt: "30px !important",
                                        px: "10px !important",
                                      }}
                                    >
                                      <Box
                                        sx={{
                                          position: "absolute",
                                          top: 5,
                                          right: 6,
                                        }}
                                      >
                                        <Card sx={{ borderRadius: "50%" }}>
                                          <IconButton
                                            size="small"
                                            onClick={() => {
                                              formik.setFieldValue(
                                                "address_proof",
                                                ""
                                              );
                                              formik.setFieldValue(
                                                "address_proof_url",
                                                ""
                                              );
                                            }}
                                          >
                                            <Close fontSize="small" />
                                          </IconButton>
                                        </Card>
                                      </Box>
                                      <Box
                                        component="img"
                                        style={{ margin: "10px" }}
                                        src={formik.values.address_proof_url}
                                        alt={formik.values.address_proof.name}
                                        width="100px"
                                        height="100px"
                                        thumbnail
                                      />
                                    </CardContent>
                                  </Card>
                                )}
                            </Stack>
                          </Grid>
                          <Grid item md={4}>
                            <Stack textAlign={"center"}>
                              <Typography textAlign="left" variant="p">
                                Insurance Certificate
                              </Typography>
                              {!formik.values.insurance_cert && (
                                <TextBox
                                  fullWidth
                                  isAdditional={true}
                                  textBoxSx={{
                                    "& .MuiInput-root:after": {
                                      borderBottom: "0px !important",
                                    },
                                    "& .MuiInput-root:before": {
                                      borderBottom: "0px !important",
                                      content: '""',
                                    },
                                  }}
                                  type="file"
                                  size="small"
                                  value=""
                                  name="insurance_cert"
                                  onChange={(e) => {
                                    formik.setFieldValue(
                                      "insurance_cert",
                                      e.target.files[0]
                                    );
                                    formik.setFieldValue(
                                      "insurance_cert_url",
                                      URL.createObjectURL(e.target.files[0])
                                    );
                                  }}
                                  helperText={
                                    formik.touched.insurance_cert &&
                                    formik.errors.insurance_cert
                                  }
                                />
                              )}

                              {formik.values.insurance_cert_url &&
                                formik.values.insurance_cert && (
                                  <Card sx={{ width: "max-content" }}>
                                    <CardContent
                                      sx={{
                                        pb: "10px !important",
                                        pt: "30px !important",
                                        px: "10px !important",
                                      }}
                                    >
                                      <Box
                                        sx={{
                                          position: "absolute",
                                          top: 5,
                                          right: 6,
                                        }}
                                      >
                                        <Card sx={{ borderRadius: "50%" }}>
                                          <IconButton
                                            size="small"
                                            onClick={() => {
                                              formik.setFieldValue(
                                                "insurance_cert",
                                                ""
                                              );
                                              formik.setFieldValue(
                                                "insurance_cert_url",
                                                ""
                                              );
                                            }}
                                          >
                                            <Close fontSize="small" />
                                          </IconButton>
                                        </Card>
                                      </Box>
                                      <Box
                                        component="img"
                                        style={{ margin: "10px" }}
                                        src={formik.values.insurance_cert_url}
                                        alt={formik.values.insurance_cert.name}
                                        width="100px"
                                        height="100px"
                                        thumbnail
                                      />
                                    </CardContent>
                                  </Card>
                                )}
                            </Stack>
                          </Grid>
                          <Grid item md={4}>
                            <Stack textAlign={"center"}>
                              <Typography textAlign="left" variant="p">
                               good in Transit Certificate
                              </Typography>
                              {!formik.values.transit_cert && (
                                <TextBox
                                  fullWidth
                                  isAdditional={true}
                                  textBoxSx={{
                                    "& .MuiInput-root:after": {
                                      borderBottom: "0px !important",
                                    },
                                    "& .MuiInput-root:before": {
                                      borderBottom: "0px !important",
                                      content: '""',
                                    },
                                  }}
                                  type="file"
                                  size="small"
                                  value=""
                                  name="transit_cert"
                                  onChange={(e) => {
                                    formik.setFieldValue(
                                      "transit_cert",
                                      e.target.files[0]
                                    );
                                    formik.setFieldValue(
                                      "transit_cert_url",
                                      URL.createObjectURL(e.target.files[0])
                                    );
                                  }}
                                  helperText={
                                    formik.touched.transit_cert &&
                                    formik.errors.transit_cert
                                  }
                                />
                              )}

                              {formik.values.transit_cert_url &&
                                formik.values.transit_cert && (
                                  <Card sx={{ width: "max-content" }}>
                                    <CardContent
                                      sx={{
                                        pb: "10px !important",
                                        pt: "30px !important",
                                        px: "10px !important",
                                      }}
                                    >
                                      <Box
                                        sx={{
                                          position: "absolute",
                                          top: 5,
                                          right: 6,
                                        }}
                                      >
                                        <Card sx={{ borderRadius: "50%" }}>
                                          <IconButton
                                            size="small"
                                            onClick={() => {
                                              formik.setFieldValue(
                                                "transit_cert",
                                                ""
                                              );
                                              formik.setFieldValue(
                                                "transit_cert_url",
                                                ""
                                              );
                                            }}
                                          >
                                            <Close fontSize="small" />
                                          </IconButton>
                                        </Card>
                                      </Box>
                                      <Box
                                        component="img"
                                        style={{ margin: "10px" }}
                                        src={formik.values.transit_cert_url}
                                        alt={formik.values.transit_cert.name}
                                        width="100px"
                                        height="100px"
                                        thumbnail
                                      />
                                    </CardContent>
                                  </Card>
                                )}
                            </Stack>
                          </Grid>{" "}
                          <Grid item md={4}>
                            <Stack textAlign={"center"}>
                              <Typography textAlign="left" variant="p">
                               public Liability Certificate
                              </Typography>
                              {!formik.values.liability_cert && (
                                <TextBox
                                  fullWidth
                                  isAdditional={true}
                                  textBoxSx={{
                                    "& .MuiInput-root:after": {
                                      borderBottom: "0px !important",
                                    },
                                    "& .MuiInput-root:before": {
                                      borderBottom: "0px !important",
                                      content: '""',
                                    },
                                  }}
                                  type="file"
                                  size="small"
                                  value=""
                                  name="liability_cert"
                                  onChange={(e) => {
                                    formik.setFieldValue(
                                      "liability_cert",
                                      e.target.files[0]
                                    );
                                    formik.setFieldValue(
                                      "liability_cert_url",
                                      URL.createObjectURL(e.target.files[0])
                                    );
                                  }}
                                  helperText={
                                    formik.touched.liability_cert &&
                                    formik.errors.liability_cert
                                  }
                                />
                              )}

                              {formik.values.liability_cert_url &&
                                formik.values.liability_cert && (
                                  <Card sx={{ width: "max-content" }}>
                                    <CardContent
                                      sx={{
                                        pb: "10px !important",
                                        pt: "30px !important",
                                        px: "10px !important",
                                      }}
                                    >
                                      <Box
                                        sx={{
                                          position: "absolute",
                                          top: 5,
                                          right: 6,
                                        }}
                                      >
                                        <Card sx={{ borderRadius: "50%" }}>
                                          <IconButton
                                            size="small"
                                            onClick={() => {
                                              formik.setFieldValue(
                                                "liability_cert",
                                                ""
                                              );
                                              formik.setFieldValue(
                                                "liability_cert_url",
                                                ""
                                              );
                                            }}
                                          >
                                            <Close fontSize="small" />
                                          </IconButton>
                                        </Card>
                                      </Box>
                                      <Box
                                        component="img"
                                        style={{ margin: "10px" }}
                                        src={formik.values.liability_cert_url}
                                        alt={formik.values.liability_cert.name}
                                        width="100px"
                                        height="100px"
                                        thumbnail
                                      />
                                    </CardContent>
                                  </Card>
                                )}
                            </Stack>
                          </Grid>{" "}
                          <Grid item md={4}>
                            <Stack textAlign={"center"}>
                              <Typography textAlign="left" variant="p">
                                Vehicle Certificate
                              </Typography>
                              {!formik.values.vehicle_cert && (
                                <TextBox
                                  fullWidth
                                  isAdditional={true}
                                  textBoxSx={{
                                    "& .MuiInput-root:after": {
                                      borderBottom: "0px !important",
                                    },
                                    "& .MuiInput-root:before": {
                                      borderBottom: "0px !important",
                                      content: '""',
                                    },
                                  }}
                                  type="file"
                                  size="small"
                                  value=""
                                  name="vehicle_cert"
                                  onChange={(e) => {
                                    formik.setFieldValue(
                                      "vehicle_cert",
                                      e.target.files[0]
                                    );
                                    formik.setFieldValue(
                                      "vehicle_cert_url",
                                      URL.createObjectURL(e.target.files[0])
                                    );
                                  }}
                                  helperText={
                                    formik.touched.vehicle_cert &&
                                    formik.errors.vehicle_cert
                                  }
                                />
                              )}

                              {formik.values.vehicle_cert_url &&
                                formik.values.vehicle_cert && (
                                  <Card sx={{ width: "max-content" }}>
                                    <CardContent
                                      sx={{
                                        pb: "10px !important",
                                        pt: "30px !important",
                                        px: "10px !important",
                                      }}
                                    >
                                      <Box
                                        sx={{
                                          position: "absolute",
                                          top: 5,
                                          right: 6,
                                        }}
                                      >
                                        <Card sx={{ borderRadius: "50%" }}>
                                          <IconButton
                                            size="small"
                                            onClick={() => {
                                              formik.setFieldValue(
                                                "vehicle_cert",
                                                ""
                                              );
                                              formik.setFieldValue(
                                                "vehicle_cert_url",
                                                ""
                                              );
                                            }}
                                          >
                                            <Close fontSize="small" />
                                          </IconButton>
                                        </Card>
                                      </Box>
                                      <Box
                                        component="img"
                                        style={{ margin: "10px" }}
                                        src={formik.values.vehicle_cert_url}
                                        alt={formik.values.vehicle_cert.name}
                                        width="100px"
                                        height="100px"
                                        thumbnail
                                      />
                                    </CardContent>
                                  </Card>
                                )}
                            </Stack>
                          </Grid>{" "}
                          <Grid item md={4}>
                            <Stack textAlign={"center"}>
                              <Typography textAlign="left" variant="p">
                                V5c Certificate
                              </Typography>
                              {!formik.values.v5c_cert && (
                                <TextBox
                                  fullWidth
                                  isAdditional={true}
                                  textBoxSx={{
                                    "& .MuiInput-root:after": {
                                      borderBottom: "0px !important",
                                    },
                                    "& .MuiInput-root:before": {
                                      borderBottom: "0px !important",
                                      content: '""',
                                    },
                                  }}
                                  type="file"
                                  size="small"
                                  value=""
                                  name="v5c_cert"
                                  onChange={(e) => {
                                    formik.setFieldValue(
                                      "v5c_cert",
                                      e.target.files[0]
                                    );
                                    formik.setFieldValue(
                                      "v5c_cert_url",
                                      URL.createObjectURL(e.target.files[0])
                                    );
                                  }}
                                  helperText={
                                    formik.touched.v5c_cert &&
                                    formik.errors.v5c_cert
                                  }
                                />
                              )}

                              {formik.values.v5c_cert_url &&
                                formik.values.v5c_cert && (
                                  <Card sx={{ width: "max-content" }}>
                                    <CardContent
                                      sx={{
                                        pb: "10px !important",
                                        pt: "30px !important",
                                        px: "10px !important",
                                      }}
                                    >
                                      <Box
                                        sx={{
                                          position: "absolute",
                                          top: 5,
                                          right: 6,
                                        }}
                                      >
                                        <Card sx={{ borderRadius: "50%" }}>
                                          <IconButton
                                            size="small"
                                            onClick={() => {
                                              formik.setFieldValue(
                                                "v5c_cert",
                                                ""
                                              );
                                              formik.setFieldValue(
                                                "v5c_cert_url",
                                                ""
                                              );
                                            }}
                                          >
                                            <Close fontSize="small" />
                                          </IconButton>
                                        </Card>
                                      </Box>
                                      <Box
                                        component="img"
                                        style={{ margin: "10px" }}
                                        src={formik.values.v5c_cert_url}
                                        alt={formik.values.v5c_cert.name}
                                        width="100px"
                                        height="100px"
                                        thumbnail
                                      />
                                    </CardContent>
                                  </Card>
                                )}
                            </Stack>
                          </Grid>{" "}
                          <Grid item md={4}>
                            <Stack textAlign={"center"}>
                              <Typography textAlign="left" variant="p">
                                Dvia Certificate
                              </Typography>
                              {!formik.values.dvia_cert && (
                                <TextBox
                                  fullWidth
                                  isAdditional={true}
                                  textBoxSx={{
                                    "& .MuiInput-root:after": {
                                      borderBottom: "0px !important",
                                    },
                                    "& .MuiInput-root:before": {
                                      borderBottom: "0px !important",
                                      content: '""',
                                    },
                                  }}
                                  type="file"
                                  size="small"
                                  value=""
                                  name="dvia_cert"
                                  onChange={(e) => {
                                    formik.setFieldValue(
                                      "dvia_cert",
                                      e.target.files[0]
                                    );
                                    formik.setFieldValue(
                                      "dvia_cert_url",
                                      URL.createObjectURL(e.target.files[0])
                                    );
                                  }}
                                  helperText={
                                    formik.touched.dvia_cert &&
                                    formik.errors.dvia_cert
                                  }
                                />
                              )}

                              {formik.values.dvia_cert_url &&
                                formik.values.dvia_cert && (
                                  <Card sx={{ width: "max-content" }}>
                                    <CardContent
                                      sx={{
                                        pb: "10px !important",
                                        pt: "30px !important",
                                        px: "10px !important",
                                      }}
                                    >
                                      <Box
                                        sx={{
                                          position: "absolute",
                                          top: 5,
                                          right: 6,
                                        }}
                                      >
                                        <Card sx={{ borderRadius: "50%" }}>
                                          <IconButton
                                            size="small"
                                            onClick={() => {
                                              formik.setFieldValue(
                                                "dvia_cert",
                                                ""
                                              );
                                              formik.setFieldValue(
                                                "dvia_cert_url",
                                                ""
                                              );
                                            }}
                                          >
                                            <Close fontSize="small" />
                                          </IconButton>
                                        </Card>
                                      </Box>
                                      <Box
                                        component="img"
                                        style={{ margin: "10px" }}
                                        src={formik.values.dvia_cert_url}
                                        alt={formik.values.dvia_cert.name}
                                        width="100px"
                                        height="100px"
                                        thumbnail
                                      />
                                    </CardContent>
                                  </Card>
                                )}
                            </Stack>
                          </Grid>
                          <Grid item md={4}>
                            <Stack textAlign={"center"}>
                              <Typography textAlign="left" variant="p">
                                Nationality Proof Certificate
                              </Typography>
                              {!formik.values.nationality_cert && (
                                <TextBox
                                  fullWidth
                                  isAdditional={true}
                                  textBoxSx={{
                                    "& .MuiInput-root:after": {
                                      borderBottom: "0px !important",
                                    },
                                    "& .MuiInput-root:before": {
                                      borderBottom: "0px !important",
                                      content: '""',
                                    },
                                  }}
                                  type="file"
                                  size="small"
                                  value=""
                                  name="nationality_cert"
                                  onChange={(e) => {
                                    formik.setFieldValue(
                                      "nationality_cert",
                                      e.target.files[0]
                                    );
                                    formik.setFieldValue(
                                      "nationality_cert_url",
                                      URL.createObjectURL(e.target.files[0])
                                    );
                                  }}
                                  helperText={
                                    formik.touched.nationality_cert &&
                                    formik.errors.nationality_cert
                                  }
                                />
                              )}

                              {formik.values.nationality_cert_url &&
                                formik.values.nationality_cert && (
                                  <Card sx={{ width: "max-content" }}>
                                    <CardContent
                                      sx={{
                                        pb: "10px !important",
                                        pt: "30px !important",
                                        px: "10px !important",
                                      }}
                                    >
                                      <Box
                                        sx={{
                                          position: "absolute",
                                          top: 5,
                                          right: 6,
                                        }}
                                      >
                                        <Card sx={{ borderRadius: "50%" }}>
                                          <IconButton
                                            size="small"
                                            onClick={() => {
                                              formik.setFieldValue(
                                                "nationality_cert",
                                                ""
                                              );
                                              formik.setFieldValue(
                                                "nationality_cert_url",
                                                ""
                                              );
                                            }}
                                          >
                                            <Close fontSize="small" />
                                          </IconButton>
                                        </Card>
                                      </Box>
                                      <Box
                                        component="img"
                                        style={{ margin: "10px" }}
                                        src={formik.values.nationality_cert_url}
                                        alt={
                                          formik.values.nationality_cert.name
                                        }
                                        width="100px"
                                        height="100px"
                                        thumbnail
                                      />
                                    </CardContent>
                                  </Card>
                                )}
                            </Stack>
                          </Grid>
                        </Grid>
                        <Stack direction={"row"} spacing={4} mt={4}>
                          <Box>
                            <Button
                              type="submit"
                              fullWidth
                              variant="contained"
                              color="primary"
                            >
                              <Typography px="1.5em">Submit</Typography>
                            </Button>
                          </Box>
                          <Box>
                            <Button
                              fullWidth
                              variant="contained"
                              color="dark"
                              onClick={formik.resetForm}
                            >
                              <Typography
                                px="2.1em"
                                component={Link}
                                href={"/dashboard/company/driver/list"}
                                sx={{ textDecoration: "none", color: "white" }}
                              >
                                Cancel
                              </Typography>
                            </Button>
                          </Box>
                        </Stack>
                      </Box>
                    </Container>
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

export default DriverJobForm;
