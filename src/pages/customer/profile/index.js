import AuthGuard from "@/auth/AuthGuard";
import { useAuthContext } from "@/auth/useAuthContext";
import SubscriptionDialog from "@/components/dialog/subscriptionDialog";
import { PrimaryWebLayout } from "@/layout";
import Profile from "@/sections/myProfile";
import axiosInstance from "@/utils/axios";
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
      user_type: "customer",
      email: "",
      mobile: "",
      plan_name: "",
      profile_img: "",
      profile_img_url: "",
      state: "",
      city: "",
      zip_code: "",
      lat: "",
      long: "",
    },
  
    validate: (values) => {},
    onSubmit: async (values) => {
      const profileFormData = new FormData();
      profileFormData.append("user_name", values.user_name);
      profileFormData.append("user_type", values.user_type);
      profileFormData.append("email", values.email);
      profileFormData.append("mobile", values.mobile);
      profileFormData.append("profile_img", values.profile_img);
      profileFormData.append("plan_name", values.plan_name);
  
      const addressFormData = new FormData();
      addressFormData.append("address", values.address);
      addressFormData.append("state", values.state);
      addressFormData.append("city", values.city);
      addressFormData.append("zip_code", values.zip_code);
      addressFormData.append("lat", values.lat);
      addressFormData.append("long", values.long);
  
      try {
        const [profileResponse, addressResponse] = await Promise.all([
          axiosInstance.post(`/api/auth/profile/update-customer-profile/${user?.id}`, profileFormData),
          axiosInstance.post(`/api/auth/profile/update-address/${user?.id}`, addressFormData),
        ]);
        console.log('addressFormData',addressFormData,'profileFormData',profileFormData)
  
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
  
        if (addressResponse?.status === 200) {
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
  
        getProfile();
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
          for (const [key] of Object.entries(formik.values)) {
            if (key == "user_name") {
              formik.setFieldValue("user_name", newData?.profile?.user_name);
            } else if (key == "address") {
              formik.setFieldValue("address", newData?.profile?.address);
            }else if (key == "state") {
              formik.setFieldValue("state", newData?.profile?.state);
            }else if (key == "city") {
              formik.setFieldValue("city", newData?.profile?.city);
            }else if (key == "zip_code") {
              formik.setFieldValue("zip_code", newData?.profile?.zip_code);
            }else if (key == "lat") {
              formik.setFieldValue("lat", newData?.profile?.lat);
            }else if (key == "long") {
              formik.setFieldValue("long", newData?.profile?.long);
            } else if (key == "email") {
              formik.setFieldValue("email", newData?.email);
            }  else if (key == "mobile") {
              formik.setFieldValue("mobile", newData?.mobile);
            } else if (key == "profile_img") {
              formik.setFieldValue(
                "profile_img",
                `${newData?.profile?.base_url}${newData?.profile?.profile_img}`
              );
              formik.setFieldValue(
                "profile_img_url",
                `${newData?.profile?.base_url}${newData?.profile?.profile_img}`
              );
            } else if (key == "plan_name") {
              formik.setFieldValue("plan_name", newData?.plan_name);
            }
          }
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

  console.log('dataaaaaa',data)

  return (
    <>
      <Profile formik={formik} data={data} loader={loader}  />
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
