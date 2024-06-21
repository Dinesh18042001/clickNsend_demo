import React from "react";
import { PrimaryWebLayout } from "@/layout";
import { useFormik } from "formik";
import ContactSection from "@/sections/contact";
import axiosInstance from "@/utils/axios";
import { useSnackbar } from "notistack";  import Alert from '@mui/material/Alert';
const ContactUs = () => {
  const { enqueueSnackbar } = useSnackbar();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
    validate: (values) => {
      const errors = {};
      if (!values.name) {
        errors.name = "Name is Required";
      }
      if (!values.email) {
        errors.email = "Email is required";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
      ) {
        errors.email = "Invalid email address";
      }
    
      if (!values.subject) {
        errors.subject = "Number is required";
      } else if (values.subject.length >= 11) {
        errors.subject = "Enter valid number (Max 11 Digit)";
      }
      if (!values.message) {
        errors.message = "Name is Required";
      }
      return errors;
    },
    onSubmit: async (values, { setFieldError }) => {
      await axiosInstance
        .post("/api/front/contact-enquiry", values)
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
          }
          formik.resetForm();
        })
        .catch((error) => {
          const { response } = error;
          if (response.status === 422) {
            console.log("response", response.data.error);
            // eslint-disable-next-line no-unused-vars
            for (const [key, value] of Object.entries(values)) {
              if (response.data.error[key]) {
                setFieldError(key, response.data.error[key][0]);
              }
            }
          }
          if (response?.data?.status === 406) {
          }
        });
    },
  });

  return <ContactSection formik={formik} />;
};

ContactUs.getLayout = function getLayout(page) {
  return <PrimaryWebLayout>{page}</PrimaryWebLayout>;
};
export default ContactUs;
