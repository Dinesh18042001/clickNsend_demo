import AuthGuard from "@/auth/AuthGuard";
import { useAuthContext } from "@/auth/useAuthContext";
import SubscriptionDialog from "@/components/dialog/subscriptionDialog";
import { TextBox } from "@/components/form";
import { PrimaryWebLayout } from "@/layout";
import Profile from "@/sections/myProfile";
import axiosInstance from "@/utils/axios";
import { Close } from "@mui/icons-material";
import {
  Box,
  Card,
  CardContent,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import { useSnackbar } from "notistack";  import Alert from '@mui/material/Alert';
import React from "react";

const MyProfilePage = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [loader, setLoader] = React.useState(false);
  const [data, setData] = React.useState({});
  const { user } = useAuthContext();
  const formik = useFormik({
    initialValues: {
      user_name: "",
      user_type: "driver",
      email: "",
      mobile: "",
      plan_name: "",
      company_certificate: "",
      company_certificate_url: "",
      company_vat: "",
      company_vat_url: "",
      profile_img: "",
      licence_front: "",
      licence_back: "",
      profile_img_url: "",
      licence_front_url: "",
      licence_back_url: "",
      address_proof: "",
      address_proof_url: "",
      insurance_cert: "",
      insurance_cert_url: "",
      transit_cert: "",
      transit_cert_url: "",
      liability_cert: "",
      liability_cert_url: "",
      vehicle_cert: "",
      vehicle_cert_url: "",
      v5c_cert: "",
      v5c_cert_url: "",
      dvia_cert: "",
      dvia_cert_url: "",
      nationality_cert: "",
      nationality_cert_url: "",
    },
    validate: (values) => {},
    onSubmit: async (values) => {
      let formData = new FormData();
      formData.append("user_name", values?.user_name);
      formData.append("user_type", values?.user_type);
      formData.append("email", values?.email);
      formData.append("mobile", values?.mobile);
      formData.append("profile_img", values?.profile_img);
      formData.append("plan_name", values?.plan_name);
      formData.append("licence_front", values?.licence_front);
      formData.append("licence_back", values?.licence_back);
      formData.append("address_proof", values?.address_proof);
      formData.append("insurance_cert", values?.insurance_cert);
      formData.append("transit_cert", values?.transit_cert);
      formData.append("liability_cert", values?.liability_cert);
      formData.append("vehicle_cert", values?.vehicle_cert);
      formData.append("v5c_cert", values?.v5c_cert);
      formData.append("dvia_cert", values?.dvia_cert);
      formData.append("nationality_cert", values?.nationality_cert);
      formData = formData;

      await axiosInstance
        .post(`/api/auth/profile/update-driver-profile/${user?.id}`, formData)
        .then((response) => {
          if (response?.status === 200) {
            enqueueSnackbar(
            <Alert
              style={{
                width: "100%",
                padding: "30px",
                backdropFilter: "blur(8px)",
                background: "#ff7533 ",
                fontSize: "19px",
                fontWeight: 800,
                lineHeight: "30px"
              }}
              icon={false}
              severity="success"
            >
              {response?.data?.message}
            </Alert>,
            {
              variant: "success",
              iconVariant: true,
              anchorOrigin: {
                vertical: "top",
                horizontal: "center",
              },
            }
          );
            getProfile();
          } else {
             // error
        enqueueSnackbar(
          <Alert
            style={{
              width: "100%",
              padding: "30px",
              filter: blur("8px"),
              background: "#ffe9d5 ",
              fontSize: "19px",
              fontWeight: 800,
              lineHeight: "30px",
            }}
            icon={false}
            severity="error"
          >
            {response?.data?.error}
          </Alert>,
          {
            variant: "error",
            iconVariant: true,
            anchorOrigin: {
              vertical: "top",
              horizontal: "center",
            },
          }
        );
          }
        })
        .catch((error) => {
          const { response } = error;
          if (response.status === 422) {
            console.log("response", response.data.error);
            // eslint-disable-next-line no-unused-vars
            for (const [key] of Object.entries(values)) {
              if (response.data.error[key]) {
                setErrors({ [key]: response.data.error[key][0] });
              }
            }
          }
          if (response?.data?.status === 406) {
             // error
        enqueueSnackbar(
          <Alert
            style={{
              width: "100%",
              padding: "30px",
              filter: blur("8px"),
              background: "#ffe9d5 ",
              fontSize: "19px",
              fontWeight: 800,
              lineHeight: "30px",
            }}
            icon={false}
            severity="error"
          >
            {response?.data?.error}
          </Alert>,
          {
            variant: "error",
            iconVariant: true,
            anchorOrigin: {
              vertical: "top",
              horizontal: "center",
            },
          }
        );
          }
        });
    },
  });

  async function getProfile() {
    setLoader(true);
    await axiosInstance
      .get("api/auth/profile/my-profile")
      .then((response) => {
        if (response.status === 200) {
          setLoader(false);
          setData(response?.data?.view_data);
          let newData = response?.data?.view_data;
          // for (const [key] of Object.entries(formik.values)) {
          formik.setFieldValue("user_name", newData?.profile?.user_name);

          formik.setFieldValue("email", newData?.email);

          formik.setFieldValue("mobile", newData?.mobile);

          formik.setFieldValue("plan_name", newData?.plan_name);

          formik.setFieldValue(
            "profile_img_url",
            `${newData?.profile?.base_url}${newData?.profile?.profile_img}`
          );

          formik.setFieldValue("profile_img", newData?.profile?.profile_img);

          formik.setFieldValue(
            "driving_license_url_front",
            `${newData?.profile?.base_url}${newData?.profile?.licence_front}`
          );

          formik.setFieldValue(
            "licence_front",
            newData?.profile?.licence_front
          );

          formik.setFieldValue(
            "driving_license_url_back",
            `${newData?.profile?.base_url}${newData?.profile?.licence_back}`
          );

          formik.setFieldValue("licence_back", newData?.profile?.licence_back);

          formik.setFieldValue(
            "address_proof_url",
            `${newData?.profile?.base_url}${newData?.profile?.address_proof}`
          );

          formik.setFieldValue(
            "address_proof",
            newData?.profile?.address_proof
          );

          formik.setFieldValue(
            "insurance_cert_url",
            `${newData?.profile?.base_url}${newData?.profile?.insurance_cert}`
          );

          formik.setFieldValue(
            "insurance_cert",
            newData?.profile?.insurance_cert
          );

          formik.setFieldValue(
            "transit_cert_url",
            `${newData?.profile?.base_url}${newData?.profile?.transit_cert}`
          );

          formik.setFieldValue("transit_cert", newData?.profile?.transit_cert);

          formik.setFieldValue(
            "liability_cert_url",
            `${newData?.profile?.base_url}${newData?.profile?.liability_cert}`
          );

          formik.setFieldValue(
            "liability_cert",
            newData?.profile?.liability_cert
          );

          formik.setFieldValue(
            "vehicle_cert_url",
            `${newData?.profile?.base_url}${newData?.profile?.vehicle_cert}`
          );

          formik.setFieldValue("vehicle_cert", newData?.profile?.vehicle_cert);

          formik.setFieldValue(
            "v5c_cert_url",
            `${newData?.profile?.base_url}${newData?.profile?.v5c_cert}`
          );

          formik.setFieldValue("v5c_cert", newData?.profile?.v5c_cert);

          formik.setFieldValue(
            "dvia_cert_url",
            `${newData?.profile?.base_url}${newData?.profile?.dvia_cert}`
          );

          formik.setFieldValue("dvia_cert", newData?.profile?.dvia_cert);

          formik.setFieldValue(
            "nationality_cert_url",
            `${newData?.profile?.base_url}${newData?.profile?.nationality_cert}`
          );

          formik.setFieldValue(
            "nationality_cert",
            newData?.profile?.nationality_cert
          );

          // }
        }
      })
      .catch((error) => {
        setLoader(false);
        console.log("ProfileError", error);
      });
  }
  React.useEffect(() => {
    getProfile();
  }, [user, user?.id]);

  // console.log("formik.values.licence_front", formik.values.licence_front.name)                                   

  const Content = () => {
    return (
      <Grid container spacing={4}>
        <Grid item md={4} sx={4} xs={4}>
          <Stack textAlign={"center"}>
            <Typography textAlign="left" variant="body2" component="p" mb={1}>
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
                  formik.setFieldValue("licence_front", e.target.files[0]);
                  formik.setFieldValue(
                    "licence_front_url",
                    URL.createObjectURL(e.target.files[0])
                  );
                }}
              />
            )}

            {formik.values.licence_front && (
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
                          formik.setFieldValue("licence_front", "");
                          formik.setFieldValue("licence_front_url", "");
                        }}
                      >
                        <Close fontSize="small" />
                      </IconButton>
                    </Card>
                  </Box>
                 

                        <Box
                                style={{ margin: "10px" }}
                                width="150px"
                                height="150px"
                                thumbnail
                              >
                                {formik?.values?.licence_front?.name?.toLowerCase()?.endsWith(".pdf") ? (
                                  <embed
                                    src={formik.values.licence_front_url}
                                    type="application/pdf"
                                    width="100%"
                                    height="100%"
                                  />
                                ) : (
                                  <img
                                    src={formik.values.licence_front_url}
                                    alt={formik.values.licence_front.name}
                                    style={{
                                      width: "100%",
                                      height: "100%",
                                      objectFit: "cover",
                                    }}
                                  />
                                )}
                              </Box>
                  
                </CardContent>
              </Card>
            )}
          </Stack>
        </Grid>
        <Grid item md={4} sx={4} xs={4}>
          <Stack textAlign={"center"}>
            <Typography textAlign="left" variant="body2" component="p" mb={1}>
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
                  formik.setFieldValue("licence_back", e.target.files[0]);
                  formik.setFieldValue(
                    "licence_back_url",
                    URL.createObjectURL(e.target.files[0])
                  );
                }}
                helperText={
                  formik.touched.licence_back && formik.errors.licence_back
                }
              />
            )}

            {formik.values.licence_back && (
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
                          formik.setFieldValue("licence_back", "");
                          formik.setFieldValue("licence_back_url", "");
                        }}
                      >
                        <Close fontSize="small" />
                      </IconButton>
                    </Card>
                  </Box>
                 
                  
                  <Box
                                style={{ margin: "10px" }}
                                width="150px"
                                height="150px"
                                thumbnail
                              >
                                {formik?.values?.licence_back?.name?.toLowerCase()?.endsWith(".pdf") ? (
                                  <embed
                                    src={formik.values.licence_back_url}
                                    type="application/pdf"
                                    width="100%"
                                    height="100%"
                                  />
                                ) : (
                                  <img
                                    src={formik.values.licence_back_url}
                                    alt={formik.values.licence_back.name}
                                    style={{
                                      width: "100%",
                                      height: "100%",
                                      objectFit: "cover",
                                    }}
                                  />
                                )}
                              </Box>
                </CardContent>
              </Card>
            )}
          </Stack>
        </Grid>
        <Grid item md={4} sx={4} xs={4}>
          <Stack textAlign={"center"}>
            <Typography textAlign="left" variant="body2" component="p" mb={1}>
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
                  formik.setFieldValue("address_proof", e.target.files[0]);
                  formik.setFieldValue(
                    "address_proof_url",
                    URL.createObjectURL(e.target.files[0])
                  );
                }}
                helperText={
                  formik.touched.address_proof && formik.errors.address_proof
                }
              />
            )}

            {formik.values.address_proof && (
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
                          formik.setFieldValue("address_proof", "");
                          formik.setFieldValue("address_proof_url", "");
                        }}
                      >
                        <Close fontSize="small" />
                      </IconButton>
                    </Card>
                  </Box>
                   <Box
                                style={{ margin: "10px" }}
                                width="150px"
                                height="150px"
                                thumbnail
                              >
                                {formik?.values?.address_proof?.name?.toLowerCase()?.endsWith(".pdf") ? (
                                  <embed
                                    src={formik.values.address_proof_url}
                                    type="application/pdf"
                                    width="100%"
                                    height="100%"
                                  />
                                ) : (
                                  <img
                                    src={formik.values.address_proof_url}
                                    alt={formik.values.address_proof.name}
                                    style={{
                                      width: "100%",
                                      height: "100%",
                                      objectFit: "cover",
                                    }}
                                  />
                                )}
                              </Box>
                </CardContent>
              </Card>
            )}
          </Stack>
        </Grid>
        <Grid item md={4} sx={4} xs={4}>
          <Stack textAlign={"center"}>
            <Typography textAlign="left" variant="body2" component="p" mb={1}>
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
                  formik.setFieldValue("insurance_cert", e.target.files[0]);
                  formik.setFieldValue(
                    "insurance_cert_url",
                    URL.createObjectURL(e.target.files[0])
                  );
                }}
                helperText={
                  formik.touched.insurance_cert && formik.errors.insurance_cert
                }
              />
            )}

            {formik.values.insurance_cert && (
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
                          formik.setFieldValue("insurance_cert", "");
                          formik.setFieldValue("insurance_cert_url", "");
                        }}
                      >
                        <Close fontSize="small" />
                      </IconButton>
                    </Card>
                  </Box>
                  <Box
                                style={{ margin: "10px" }}
                                width="150px"
                                height="150px"
                                thumbnail
                              >
                                {formik?.values?.insurance_cert?.name?.toLowerCase()?.endsWith(".pdf") ? (
                                  <embed
                                    src={formik.values.insurance_cert_url}
                                    type="application/pdf"
                                    width="100%"
                                    height="100%"
                                  />
                                ) : (
                                  <img
                                    src={formik.values.insurance_cert_url}
                                    alt={formik.values.insurance_cert.name}
                                    style={{
                                      width: "100%",
                                      height: "100%",
                                      objectFit: "cover",
                                    }}
                                  />
                                )}
                              </Box>
                  
                </CardContent>
              </Card>
            )}
          </Stack>
        </Grid>
        <Grid item md={4} sx={4} xs={4}>
          <Stack textAlign={"center"}>
            <Typography textAlign="left" variant="body2" component="p" mb={1}>
              Transit Certificate
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
                  formik.setFieldValue("transit_cert", e.target.files[0]);
                  formik.setFieldValue(
                    "transit_cert_url",
                    URL.createObjectURL(e.target.files[0])
                  );
                }}
                helperText={
                  formik.touched.transit_cert && formik.errors.transit_cert
                }
              />
            )}

            {formik.values.transit_cert && (
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
                          formik.setFieldValue("transit_cert", "");
                          formik.setFieldValue("transit_cert_url", "");
                        }}
                      >
                        <Close fontSize="small" />
                      </IconButton>
                    </Card>
                  </Box>
                  <Box
                                style={{ margin: "10px" }}
                                width="150px"
                                height="150px"
                                thumbnail
                              >
                                {formik?.values?.transit_cert?.name?.toLowerCase()?.endsWith(".pdf") ? (
                                  <embed
                                    src={formik.values.transit_cert_url}
                                    type="application/pdf"
                                    width="100%"
                                    height="100%"
                                  />
                                ) : (
                                  <img
                                    src={formik.values.transit_cert_url}
                                    alt={formik.values.transit_cert.name}
                                    style={{
                                      width: "100%",
                                      height: "100%",
                                      objectFit: "cover",
                                    }}
                                  />
                                )}
                              </Box>
                  
                </CardContent>
              </Card>
            )}
          </Stack>
        </Grid>{" "}
        <Grid item md={4} sx={4} xs={4}>
          <Stack textAlign={"center"}>
            <Typography textAlign="left" variant="body2" component="p" mb={1}>
              Liability Certificate
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
                  formik.setFieldValue("liability_cert", e.target.files[0]);
                  formik.setFieldValue(
                    "liability_cert_url",
                    URL.createObjectURL(e.target.files[0])
                  );
                }}
                helperText={
                  formik.touched.liability_cert && formik.errors.liability_cert
                }
              />
            )}

            {formik.values.liability_cert && (
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
                          formik.setFieldValue("liability_cert", "");
                          formik.setFieldValue("liability_cert_url", "");
                        }}
                      >
                        <Close fontSize="small" />
                      </IconButton>
                    </Card>
                  </Box>
                  <Box
                                style={{ margin: "10px" }}
                                width="150px"
                                height="150px"
                                thumbnail
                              >
                                {formik?.values?.liability_cert?.name?.toLowerCase()?.endsWith(".pdf") ? (
                                  <embed
                                    src={formik.values.liability_cert_url}
                                    type="application/pdf"
                                    width="100%"
                                    height="100%"
                                  />
                                ) : (
                                  <img
                                    src={formik.values.liability_cert_url}
                                    alt={formik.values.liability_cert.name}
                                    style={{
                                      width: "100%",
                                      height: "100%",
                                      objectFit: "cover",
                                    }}
                                  />
                                )}
                              </Box>
                  
                </CardContent>
              </Card>
            )}
          </Stack>
        </Grid>{" "}
        <Grid item md={4} sx={4} xs={4}>
          <Stack textAlign={"center"}>
            <Typography textAlign="left" variant="body2" component="p" mb={1}>
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
                  formik.setFieldValue("vehicle_cert", e.target.files[0]);
                  formik.setFieldValue(
                    "vehicle_cert_url",
                    URL.createObjectURL(e.target.files[0])
                  );
                }}
                helperText={
                  formik.touched.vehicle_cert && formik.errors.vehicle_cert
                }
              />
            )}

            {formik.values.vehicle_cert && (
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
                          formik.setFieldValue("vehicle_cert", "");
                          formik.setFieldValue("vehicle_cert_url", "");
                        }}
                      >
                        <Close fontSize="small" />
                      </IconButton>
                    </Card>
                  </Box>
                  <Box
                                style={{ margin: "10px" }}
                                width="150px"
                                height="150px"
                                thumbnail
                              >
                                {formik?.values?.vehicle_cert?.name?.toLowerCase()?.endsWith(".pdf") ? (
                                  <embed
                                    src={formik.values.vehicle_cert_url}
                                    type="application/pdf"
                                    width="100%"
                                    height="100%"
                                  />
                                ) : (
                                  <img
                                    src={formik.values.vehicle_cert_url}
                                    alt={formik.values.vehicle_cert.name}
                                    style={{
                                      width: "100%",
                                      height: "100%",
                                      objectFit: "cover",
                                    }}
                                  />
                                )}
                              </Box>
                  
                </CardContent>
              </Card>
            )}
          </Stack>
        </Grid>{" "}
        <Grid item md={4} sx={4} xs={4}>
          <Stack textAlign={"center"}>
            <Typography textAlign="left" variant="body2" component="p" mb={1}>
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
                  formik.setFieldValue("v5c_cert", e.target.files[0]);
                  formik.setFieldValue(
                    "v5c_cert_url",
                    URL.createObjectURL(e.target.files[0])
                  );
                }}
                helperText={formik.touched.v5c_cert && formik.errors.v5c_cert}
              />
            )}

            {formik.values.v5c_cert && (
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
                          formik.setFieldValue("v5c_cert", "");
                          formik.setFieldValue("v5c_cert_url", "");
                        }}
                      >
                        <Close fontSize="small" />
                      </IconButton>
                    </Card>
                  </Box>
                    <Box
                                style={{ margin: "10px" }}
                                width="150px"
                                height="150px"
                                thumbnail
                              >
                                {formik?.values?.v5c_cert?.name?.toLowerCase()?.endsWith(".pdf") ? (
                                  <embed
                                    src={formik.values.v5c_cert_url}
                                    type="application/pdf"
                                    width="100%"
                                    height="100%"
                                  />
                                ) : (
                                  <img
                                    src={formik.values.v5c_cert_url}
                                    alt={formik.values.v5c_cert.name}
                                    style={{
                                      width: "100%",
                                      height: "100%",
                                      objectFit: "cover",
                                    }}
                                  />
                                )}
                              </Box>
                </CardContent>
              </Card>
            )}
          </Stack>
        </Grid>
        <Grid item md={4} sx={4} xs={4}>
          <Stack textAlign={"center"}>
            <Typography textAlign="left" variant="body2" component="p" mb={1}>
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
                  formik.setFieldValue("dvia_cert", e.target.files[0]);
                  formik.setFieldValue(
                    "dvia_cert_url",
                    URL.createObjectURL(e.target.files[0])
                  );
                }}
                helperText={formik.touched.dvia_cert && formik.errors.dvia_cert}
              />
            )}

            {formik.values.dvia_cert && (
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
                          formik.setFieldValue("dvia_cert", "");
                          formik.setFieldValue("dvia_cert_url", "");
                        }}
                      >
                        <Close fontSize="small" />
                      </IconButton>
                    </Card>
                  </Box>
                  <Box
                                style={{ margin: "10px" }}
                                width="150px"
                                height="150px"
                                thumbnail
                              >
                                {formik?.values?.dvia_cert?.name?.toLowerCase()?.endsWith(".pdf") ? (
                                  <embed
                                    src={formik.values.dvia_cert_url}
                                    type="application/pdf"
                                    width="100%"
                                    height="100%"
                                  />
                                ) : (
                                  <img
                                    src={formik.values.dvia_cert_url}
                                    alt={formik.values.dvia_cert.name}
                                    style={{
                                      width: "100%",
                                      height: "100%",
                                      objectFit: "cover",
                                    }}
                                  />
                                )}
                              </Box>
                  
                </CardContent>
              </Card>
            )}
          </Stack>
        </Grid>
        <Grid item md={4} sx={4} xs={4}>
          <Stack textAlign={"center"}>
            <Typography textAlign="left" variant="body2" component="p" mb={1}>
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
                  formik.setFieldValue("nationality_cert", e.target.files[0]);
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

            {formik.values.nationality_cert && (
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
                          formik.setFieldValue("nationality_cert", "");
                          formik.setFieldValue("nationality_cert_url", "");
                        }}
                      >
                        <Close fontSize="small" />
                      </IconButton>
                    </Card>
                  </Box>
                  <Box
                                style={{ margin: "10px" }}
                                width="150px"
                                height="150px"
                                thumbnail
                              >
                                {formik?.values?.nationality_cert?.name?.toLowerCase()?.endsWith(".pdf") ? (
                                  <embed
                                    src={formik.values.nationality_cert_url}
                                    type="application/pdf"
                                    width="100%"
                                    height="100%"
                                  />
                                ) : (
                                  <img
                                    src={formik.values.nationality_cert_url}
                                    alt={formik.values.nationality_cert.name}
                                    style={{
                                      width: "100%",
                                      height: "100%",
                                      objectFit: "cover",
                                    }}
                                  />
                                )}
                              </Box>
                  
                </CardContent>
              </Card>
            )}
          </Stack>
        </Grid>
      </Grid>
    );
  };

  return (
    <>
      <Profile formik={formik} data={data} loader={loader} Content={Content} />
      <SubscriptionDialog />
    </>
  );
};

MyProfilePage.getLayout = function getLayout(page) {
  return (
    <PrimaryWebLayout>
      <AuthGuard>{page}</AuthGuard>
    </PrimaryWebLayout>
  );
};
export default MyProfilePage;
