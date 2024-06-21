// import GuestGuard from "@/auth/GuestGuard";
// import { useAuthContext } from "@/auth/useAuthContext";
// import { PrimaryWebLayout } from "@/layout";
// import Register from "@/sections/auth/register";
// import axiosInstance from "@/utils/axios";
// import { useFormik } from "formik";
// import { useRouter } from "next/router";
// import { useSnackbar } from "notistack";  import Alert from '@mui/material/Alert';
// import React from "react";

// const RegisterPage = () => {
//   const router = useRouter();
//   const { register } = useAuthContext();
//   const { enqueueSnackbar } = useSnackbar();
//   const [open, setOpen] = React.useState(false);
//   const handleOpenClose = () => {
//     setOpen(!open);
//   };

//   const formik = useFormik({
//     initialValues: {
//       user_name: "",
//       user_type: "customer",
//       email: "",
//       mobile: "",
//       term: "no",
//       password: "",
//       password_confirmation: "",
//       company_certificate: "",
//       company_certificate_url: "",
//       company_vat: "",
//       company_vat_url: "",
//     },
//     validate: (values) => {
//       const errors = {};
//       const passwordRegex =
//         /^(?=.\d)(?=.[!@#$%^&])(?=.[a-z])(?=.*[A-Z]).{8,16}$/;

//       if (!values.user_name) {
//         errors.user_name = "User name is required";
//       }

//       if (!values.email) {
//         errors.email = "Email is required";
//       } else if (
//         !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
//       ) {
//         errors.email = "Invalid email address";
//       }

//       if (!values.mobile) {
//         errors.mobile = "Phone is required";
//       } else if (!/^\d{10,11}$/.test(values.mobile)) {
//         errors.mobile = "Please enter a valid 10 or 11-digit number";
//       }

//       if (!values.password) {
//         errors.password = "Password is required";
//       } else if (!passwordRegex.test(values.password)) {
//         errors.password =
//           "Min 8 letter password, with at least a symbol, upper and lower case letters and a number";
//       }

//       if (!values.password_confirmation) {
//         errors.password_confirmation = "Confirm password is required";
//       } else if (!passwordRegex.test(values.password_confirmation)) {
//         errors.password_confirmation =
//           "Min 8 letter password, with at least a symbol, upper and lower case letters and a number";
//       } else if (
//         values.password &&
//         values.password_confirmation &&
//         values.password != values.password_confirmation
//       ) {
//         errors.password_confirmation = "Password didn't match.";
//       }

//       if (values.user_type === "company" && !values.company_certificate) {
//         errors.company_certificate = "Company Certificate is required";
//       }
//       if (values.user_type === "company" && !values.company_vat) {
//         errors.company_vat = "Company Vat is required";
//       }

//       if (values.term == "no") {
//         errors.term = "T&C is required";
//       }

//       return errors;
//     },
//     onSubmit: async (values, { setErrors }) => {
//       let url, formData;
    
//       if (values.user_type === "customer") {
//         url = "/api/user/cust-register";
//         let customerData = new FormData();
//         customerData.append("user_name", values?.user_name);
//         customerData.append("user_type", values?.user_type);
//         customerData.append("email", values?.email);
//         customerData.append("mobile", values?.mobile);
//         customerData.append("term", values?.term);
//         customerData.append("password", values?.password);
//         // Add this
//         customerData.append("company_type", 'customer');
    
//         customerData.append(
//           "password_confirmation",
//           values?.password_confirmation
//         );
//         formData = customerData;
//       } else {
//         url = "/api/user/company-register";
//         let companyData = new FormData();
//         companyData.append("user_name", values?.user_name);
//         companyData.append("user_type", values?.user_type);
//         companyData.append("email", values?.email);
//         // Corrected line
//         companyData.append("company_type", 'customer');
//         companyData.append("mobile", values?.mobile);
//         companyData.append("term", values?.term);
//         companyData.append("password", values?.password);
//         companyData.append(
//           "password_confirmation",
//           values?.password_confirmation
//         );
//         companyData.append("company_certificate", values?.company_certificate);
//         companyData.append("company_vat", values?.company_vat);
//         formData = companyData;
//       }

      
//       await axiosInstance
//         .post(url, formData)
//         .then((response) => {
//           if (response?.status === 200) {
//             formik.resetForm();
//             router.push("/auth/login");
//             enqueueSnackbar(
//             <Alert
//               style={{
//                 width: "100%",
//                 padding: "30px",
//                 backdropFilter: "blur(8px)",
//                 background: "#ff7533 ",
//                 fontSize: "19px",
//                 fontWeight: 800,
//                 lineHeight: "30px"
//               }}
//               icon={false}
//               severity="success"
//             >
//               {response?.data?.message}
//             </Alert>,
//             {
//               variant: "success",
//               iconVariant: true,
//               anchorOrigin: {
//                 vertical: "top",
//                 horizontal: "center",
//               },
//             }
//           );
//           } else {
//              // error
//         enqueueSnackbar(
//           <Alert
//             style={{
//               width: "100%",
//               padding: "30px",
//               filter: blur("8px"),
//               background: "#ffe9d5 ",
//               fontSize: "19px",
//               fontWeight: 800,
//               lineHeight: "30px",
//             }}
//             icon={false}
//             severity="error"
//           >
//             {response?.data?.error}
//           </Alert>,
//           {
//             variant: "error",
//             iconVariant: true,
//             anchorOrigin: {
//               vertical: "top",
//               horizontal: "center",
//             },
//           }
//         );
//           }
//         })
//         .catch((error) => {
//           const { response } = error;
//           if (response.status === 422) {
//             // eslint-disable-next-line no-unused-vars
//             for (const [key, value] of Object.entries(values)) {
//               if (response.data.error[key]) {
//                 setErrors({ [key]: response.data.error[key][0] });
//               }
//             }
//           }
//           if (response?.data?.status === 406) {
//              // error
//         enqueueSnackbar(
//           <Alert
//             style={{
//               width: "100%",
//               padding: "30px",
//               filter: blur("8px"),
//               background: "#ffe9d5 ",
//               fontSize: "19px",
//               fontWeight: 800,
//               lineHeight: "30px",
//             }}
//             icon={false}
//             severity="error"
//           >
//             {response?.data?.error}
//           </Alert>,
//           {
//             variant: "error",
//             iconVariant: true,
//             anchorOrigin: {
//               vertical: "top",
//               horizontal: "center",
//             },
//           }
//         );
//           }
//         });
//     },
    
//   });

//   return (
//     <GuestGuard>
//       <Register open={open} handleOpenClose={handleOpenClose} formik={formik} />
//     </GuestGuard>
//   );
// };

// RegisterPage.getLayout = function getLayout(page) {
//   return <PrimaryWebLayout>{page}</PrimaryWebLayout>;
// };
// export default RegisterPage;




import GuestGuard from "@/auth/GuestGuard";
import { useAuthContext } from "@/auth/useAuthContext";
import { PrimaryWebLayout } from "@/layout";
import Register from "@/sections/auth/register";
import axiosInstance from "@/utils/axios";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";  import Alert from '@mui/material/Alert';
import React from "react";

const RegisterPage = () => {
  const router = useRouter();
  const { register } = useAuthContext();
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = React.useState(false);
  const handleOpenClose = () => {
    setOpen(!open);
  };

  const formik = useFormik({
    initialValues: {
      user_name: "",
      user_type: "customer",
      email: "",
      mobile: "",
      term: "no",
      password: "",
      password_confirmation: "",
      company_certificate: "",
      company_certificate_url: "",
      company_vat: "",
      company_vat_url: "",
    },
    validate: (values) => {
      const errors = {};
      const passwordRegex =
        /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,16}$/;

      if (!values.user_name) {
        errors.user_name = "User name is required";
      }

      if (!values.email) {
        errors.email = "Email is required";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
      ) {
        errors.email = "Invalid email address";
      }

      if (!values.mobile) {
        errors.mobile = "Phone is required";
      } else if (!/^\d{10,11}$/.test(values.mobile)) {
        errors.mobile = "Please enter a valid 10 or 11-digit number";
      }

      if (!values.password) {
        errors.password = "Password is required";
      } else if (!passwordRegex.test(values.password)) {
        errors.password =
          "Min 8 letter password, with at least a symbol, upper and lower case letters and a number";
      }

      if (!values.password_confirmation) {
        errors.password_confirmation = "Confirm password is required";
      } else if (!passwordRegex.test(values.password_confirmation)) {
        errors.password_confirmation =
          "Min 8 letter password, with at least a symbol, upper and lower case letters and a number";
      } else if (
        values.password &&
        values.password_confirmation &&
        values.password != values.password_confirmation
      ) {
        errors.password_confirmation = "Password didn't match.";
      }

      if (values.user_type === "company" && !values.company_certificate) {
        errors.company_certificate = "Company Certificate is required";
      }
      if (values.user_type === "company" && !values.company_vat) {
        errors.company_vat = "Company Vat is required";
      }

      if (values.term == "no") {
        errors.term = "T&C is required";
      }

      return errors;
    },
    onSubmit: async (values, { setErrors }) => {
      let url, formData;
    
      if (values.user_type === "customer") {
        url = "/api/user/cust-register";
        let customerData = new FormData();
        customerData.append("user_name", values?.user_name);
        customerData.append("user_type", values?.user_type);
        customerData.append("email", values?.email);
        customerData.append("mobile", values?.mobile);
        customerData.append("term", values?.term);
        customerData.append("password", values?.password);
        // Add this
        customerData.append("company_type", 'customer');
    
        customerData.append(
          "password_confirmation",
          values?.password_confirmation
        );
        formData = customerData;
      } else {
        url = "/api/user/company-register";
        let companyData = new FormData();
        companyData.append("user_name", values?.user_name);
        companyData.append("user_type", values?.user_type);
        companyData.append("email", values?.email);
        // Corrected line
        companyData.append("company_type", 'customer');
        companyData.append("mobile", values?.mobile);
        companyData.append("term", values?.term);
        companyData.append("password", values?.password);
        companyData.append(
          "password_confirmation",
          values?.password_confirmation
        );
        companyData.append("company_certificate", values?.company_certificate);
        companyData.append("company_vat", values?.company_vat);
        formData = companyData;
      }

      
      await axiosInstance
        .post(url, formData)
        .then((response) => {
          if (response?.status === 200) {
            formik.resetForm();
            router.push("/auth/login");
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
        })
        .catch((error) => {
          const { response } = error;
          if (response.status === 422) {
            // eslint-disable-next-line no-unused-vars
            for (const [key, value] of Object.entries(values)) {
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

  return (
    <GuestGuard>
      <Register open={open} handleOpenClose={handleOpenClose} formik={formik} />
    </GuestGuard>
  );
};

RegisterPage.getLayout = function getLayout(page) {
  return <PrimaryWebLayout>{page}</PrimaryWebLayout>;
};
export default RegisterPage;

