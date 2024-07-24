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
      address: "",
      user_type: "company",
      email: "",
      mobile: "",
      // profile_img: "",
      profile_img_url: "",
      company_certificate: "",
      company_vat: "",
      company_certificate_url: "",
      company_vat_url: "",
    },
    validate: (values) => {},
    onSubmit: async (values) => {
      let profileFormData = new FormData();
      profileFormData.append("user_type", values?.user_type);
      profileFormData.append("user_name", values?.user_name);
      profileFormData.append("email", values?.email);
      profileFormData.append("mobile", values?.mobile);
      // profileFormData.append("profile_img", values?.profile_img);
      profileFormData.append("company_certificate", values?.company_certificate);
      profileFormData.append("company_vat", values?.company_vat);


      const addressFormData = new FormData();
      addressFormData.append("address", values.address);
      addressFormData.append("state", values.state);
      addressFormData.append("city", values.city);
      addressFormData.append("zip_code", values.zip_code);
      addressFormData.append("lat", values.lat);
      addressFormData.append("long", values.long);
  

      try {

        const profileResponse = await axiosInstance.post(`/api/auth/profile/update-company-profile/${user?.id}`, profileFormData)
  
        if (profileResponse?.status === 200) {
          // succes
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
              {profileResponse?.data?.message}
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
        } else {
              // error
        enqueueSnackbar(
          <Alert
            style={{
              width: "100%",
              padding: "30px",
              filter: "blur(8px)",
              background: "#ffe9d5 ",
              fontSize: "19px",
              fontWeight: 800,
              lineHeight: "30px",
            }}
            icon={false}
            severity="error"
          >
            {profileResponse?.data?.error}
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

        await axiosInstance.post(`/api/auth/profile/update-address/${user?.id}`, addressFormData);     
        getProfile();
  
        // getProfile();
      } catch (error) {
        const { response } = error;
        if (response?.status === 422) {
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
      }
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
          console.log("newDatanewData", newData);
          // for (const [key] of Object.entries(formik.values)) {
          formik.setFieldValue("user_name", newData?.profile?.user_name);
          formik.setFieldValue("email", newData?.email);
          formik.setFieldValue("mobile", newData?.mobile);
          formik.setFieldValue(
            "profile_img",
            `${newData?.profile?.base_url}${newData?.profile?.profile_img}`
          );
          formik.setFieldValue(
            "profile_img_url",
            `${newData?.profile?.base_url}${newData?.profile?.profile_img}`
          );
          formik.setFieldValue("address", newData?.profile?.address);
          formik.setFieldValue("plan", newData?.plan?.plan_name);
          formik.setFieldValue(
            "company_certificate",
            newData?.profile?.company_certificate
          );
          formik.setFieldValue("company_vat", newData?.profile?.company_vat);

          formik.setFieldValue(
            "company_certificate_url",
            `${newData?.profile?.base_url}${newData?.profile?.company_certificate}`
          );
          formik.setFieldValue(
            "company_vat_url",
            `${newData?.profile?.base_url}${newData?.profile?.company_vat}`
          );
        }
      })
      .catch((error) => {
        setLoader(false);
        console.log("ProfileError", error);
      });
  }
  React.useEffect(() => {
    getProfile();
  }, []);

  console.log("datadata", loader);

  const Content = () => {
    return (
      <Box sx={{ mt: 2 }}>
        <Stack textAlign={"center"}>
          <Typography textAlign="left" variant="p">
            Company Certificate
          </Typography>
          {!formik.values.company_certificate && (
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
              name="company_certificate"
              onChange={(e) => {
                formik.setFieldValue("company_certificate", e.target.files[0]);
                formik.setFieldValue(
                  "company_certificate_url",
                  URL.createObjectURL(e.target.files[0])
                );
              }}
              helperText={
                formik.touched.company_certificate &&
                formik.errors.company_certificate
              }
            />
          )}

          {formik.values.company_certificate_url && (
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
                        formik.setFieldValue("company_certificate", "");
                        formik.setFieldValue("company_certificate_url", "");
                      }}
                    >
                      <Close fontSize="small" />
                    </IconButton>
                  </Card>
                </Box>
                <Box
                  component="img"
                  style={{ margin: "10px" }}

                  src={formik.values.company_certificate_url}
                  alt={formik.values?.company_certificate?.name}

                  width="150px"
                  height="150px"
                  thumbnail
                />
              </CardContent>
            </Card>
          )}
        </Stack>
        <Stack textAlign={"center"} mt={2}>
          <Typography textAlign="left" variant="p">
            Company VAT Certificate (Optional)
          </Typography>
          {!formik.values.company_vat && (
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
              name="company_vat"
              onChange={(e) => {
                formik.setFieldValue("company_vat", e.target.files[0]);
                formik.setFieldValue(
                  "company_vat_url",
                  URL.createObjectURL(e.target.files[0])
                );
              }}
              helperText={
                formik.touched.company_vat && formik.errors.company_vat
              }
            />
          )}

          {formik.values.company_vat_url && (
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
                        formik.setFieldValue("company_vat", "");
                        formik.setFieldValue("company_vat_url", "");
                      }}
                    >
                      <Close fontSize="small" />
                    </IconButton>
                  </Card>
                </Box>
                {/* demoimagetest */}
                <Box
                  component="img"
                  style={{ margin: "10px" }}
                  src={formik.values.company_vat_url}
                  alt={formik.values.company_vat?.name}
                  width="150px"
                  height="150px"
                  thumbnail
                />
              </CardContent>
            </Card>
          )}
        </Stack>
      </Box>
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
      {" "}
      <AuthGuard>{page}</AuthGuard>
    </PrimaryWebLayout>
  );
};
export default MyProfilePage;
