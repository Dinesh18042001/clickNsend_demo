import React, { useContext } from "react";
import { PrimaryWebLayout } from "@/layout";
import { useFormik } from "formik";
import JobPostForm from "@/sections/dashboard/customerDashboard/jobPostForm";

import { every, isEmpty, reject } from "lodash";
import axiosInstance from "@/utils/axios";
import { useSnackbar } from "notistack";  import Alert from '@mui/material/Alert';
import { useRouter } from "next/router";
import AuthGuard from "@/auth/AuthGuard";
import { useAuthContext } from "@/auth/useAuthContext";
import { StepperContext } from "@/components/stepper/stepperContext";
import SubscriptionDialog from "@/components/dialog/subscriptionDialog";

const PostJob = () => {
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const { id } = router.query;
  const { user } = useAuthContext();
  const { value, setValue } = useContext(StepperContext);
  const isLastStep = value === 3 - 1;

  const PickupAddress = {
    address: "",
    lat: 0,
    long: 0,
    type: "pickup",
    pin_code: "",
  };

  const DropAddress = {
    address: "",
    lat: 0,
    long: 0,
    type: "drop",
    pin_code: "",
  };

  const product = {
    product: {
      image: "",
      height: "",
      length: "",
      width: "",
      material: "",
      pickup_date: "",
      pickup_time: "",
      drop_date: "",
      drop_time: "",
    },
    address: [PickupAddress, DropAddress],
  };

  const itemsValidation = (values, errors) => {
    errors.items = [];
    let address = [];

    let itemObject = {};
    let addressObject = {};

    values?.items &&
      values?.items?.length > 0 &&
      values?.items.forEach((element, elementIndex) => {
        itemObject["product"] = {};

        if (element?.address?.length) {
          element.address.forEach((addressElement, addressIndex) => {
            // itemObject["address"]["index"] = elementIndex;
            if (!addressElement?.address) {
              addressObject = {
                address: "Address is required",
                index: addressIndex,
              };
            } else {
              addressObject = {
                address: "",
                index: addressIndex,
              };
            }

            if (!addressElement?.pin_code) {
              addressObject = {
                ...addressObject,
                pin_code: "Post Code is required",
                index: addressIndex,
              };
            } else if (
              addressElement?.pin_code?.length < 5 ||
              addressElement?.pin_code?.length > 8
            ) {
              addressObject = {
                ...addressObject,
                pin_code: "Min 5 digit and Max 8 digit is required",
                index: addressIndex,
              };
            } else {
              addressObject = {
                ...addressObject,
                pin_code: "",
                index: addressIndex,
              };
            }
            address.push(addressObject);
            itemObject["address"] = address;
            addressObject = {};
          });
        }

        itemObject["product"]["index"] = elementIndex;

        if (!element?.product?.image) {
          itemObject["product"]["image"] = "Image is required";
        } else {
          itemObject["product"]["image"] = "";
        }

        if (!element?.product?.height) {
          itemObject["product"]["height"] = "Height is required";
        } else {
          itemObject["product"]["height"] = "";
        }

        if (!element?.product?.length) {
          itemObject["product"]["length"] = "Length is required";
        } else {
          itemObject["product"]["length"] = "";
        }

        if (!element?.product?.width) {
          itemObject["product"]["width"] = "Width is required";
        } else {
          itemObject["product"]["width"] = "";
        }

        if (!element?.product?.material) {
          itemObject["product"]["material"] = "Material is required";
        } else {
          itemObject["product"]["material"] = "";
        }

        if (!element?.product?.pickup_date) {
          itemObject["product"]["pickup_date"] = "Pickup date is required";
        } else {
          itemObject["product"]["pickup_date"] = "";
        }

        if (!element?.product?.pickup_time) {
          itemObject["product"]["pickup_time"] = "Pickup time is required";
        } else {
          itemObject["product"]["pickup_time"] = "";
        }

        if (!element?.product?.drop_date) {
          itemObject["product"]["drop_date"] = "Delivery date is required";
        } else {
          itemObject["product"]["drop_date"] = "";
        }

        if (!element?.product?.drop_time) {
          itemObject["product"]["drop_time"] = "Delivery time is required";
        } else {
          itemObject["product"]["drop_time"] = "";
        }

        if (!element?.product?.quantity) {
          itemObject["product"]["quantity"] = "Quantity is required";
        } else {
          itemObject["product"]["quantity"] = "";
        }

        errors.items.push({
          ...itemObject,
          address: address,
        });
        itemObject = {};
        address = [];
        addressObject = {};
      });

    if (errors?.items?.length) {
      let isAllProductEmpty = every(errors?.items, (product) => {
        let isProduct = false;
        let address = false;

        if (product?.address) {
          address = every(product?.address, (address) => !address?.address);
        }

        isProduct =
          isEmpty(product?.product?.image) &&
          isEmpty(product?.product?.height) &&
          isEmpty(product?.product?.length) &&
          isEmpty(product?.product?.width) &&
          isEmpty(product?.product?.material) &&
          isEmpty(product?.product?.pickup_date) &&
          isEmpty(product?.product?.pickup_time) &&
          isEmpty(product?.product?.drop_date) &&
          isEmpty(product?.product?.drop_time);

        if (isProduct && address) {
          return true;
        }
        return false;
      });
      if (isAllProductEmpty) {
        errors = delete errors.items;
      }
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      user_id: user?.id,
      created_by: user?.user_type ,
      name: "",
      vehicle: 0,
      vehical_type: 0,
      items: [product],
      // budget: "",
      description: "",
    },

    validate: (values) => {
      const errors = {};
      if (!values.name) {
        errors.name = "Job Title is required";
      }

      if (values?.items?.length) {
        itemsValidation(values, errors);
      }
      if (!values.vehicle) {
        errors.vehicle = "Vehicle is required";
      }
      if (!values.vehical_type) {
        errors.vehical_type = "Vehicle Type is required";
      }

      // if (!values.budget) {
      //   errors.budget = "Job budget is required";
      // }
      if (!values.description) {
        errors.description = "Description is required";
      }

      return errors;
    },
    onSubmit: async (values, { setErrors, setFieldValue }) => {
      let url, method;
console.log('values values',values)
      if (id === "create") {
        url = "/api/auth/jobs/add";
        method = "POST";
      } else {
        url = `/api/auth/jobs/update/${id}`;
        method = "POST";
      }
      if (id !== "create") {
        values["items"] = JSON.stringify(values?.items);
        await axiosInstance
          .request({
            url: url,
            method: method,
            data: values,
          })
          .then((response) => {
            if (response?.status === 200) {
              setFieldValue("items", JSON.parse(values?.items));
              router.push(`/dashboard/${user?.user_type}/job_posted`);
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
              setFieldValue("items", JSON.parse(values?.items));
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
            setFieldValue("items", JSON.parse(values?.items));
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
      } else {
        if (isLastStep) {
          values["items"] = JSON.stringify(values?.items);
          await axiosInstance
            .request({
              url: url,
              method: method,
              data: values,
            })
            .then((response) => {
              if (response?.status === 200) {
                setFieldValue("items", JSON.parse(values?.items));
                router.push("/dashboard/customer/job_posted");
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
                setFieldValue("items", JSON.parse(values?.items));
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
              setFieldValue("items", JSON.parse(values?.items));
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
        } else {
          setValue(value + 1);
        }
      }
    },
  });

  React.useEffect(() => {
    formik.setFieldValue("user_id", user?.id);
  }, [user, user?.id]);
  const addProduct = () => {
    formik.setFieldValue("items", [...(formik.values.items || []), product]);
  };
  const removesAddress = (productIndex,id) => {
    console.log(formik.values.items[productIndex].address,id,"sdfa")
    // Clone the current items to avoid direct state mutation
    const updatedItems = [...formik.values.items];
    const product = updatedItems[productIndex];
  
    if (product && product.address) {
      // Keep only addresses that are not marked as new
      const retainedAddresses = product.address.filter(address => address.id!==id);
  
      // Update the product's addresses with those that are retained
      product.address = retainedAddresses;
  
      // Update the items array with the modified product
      formik.setFieldValue("items", updatedItems);
    }
  };
  
  
  // const addSingleAddress = () => {
  //   formik.setFieldValue("items", [...(formik.values.items || []),DropAddress]);
  // };
  const addSingleAddress = () => {
    const updatedItems = formik.values.items.map(product => {
      // Ensure the product has an initialized address array
      if (!product.address) {
        product.address = [];
      }
  
      // Add both a pickup and a delivery address
      const newPickupAddress = { ...PickupAddress,isNew: true,id: product.address.length+1 };
      product.address.push(newPickupAddress);
  
      return product;
    });
  
    // Update the formik state with the updated items
    formik.setFieldValue("items", updatedItems,);
  };

  const addSingleAddress1 = () => {
    const updatedItems = formik.values.items.map(product => {
      // Ensure the product has an initialized address array
      if (!product.address) {
        product.address = [];
      }
  
      // Add both a pickup and a delivery address
      //const newPickupAddress = { ...PickupAddress,isNew: true };
      const newDeliveryAddress = { ...DropAddress,isNew: true , id:product.address.length+1};
      product.address.push(newDeliveryAddress);
  
      return product;
    });
  
    // Update the formik state with the updated items
    formik.setFieldValue("items", updatedItems);
  };
  
  

  const addAddress = ({ productItem, productIndex }) => {
  // console.log(productIndex,"productItem", productItem);
    
    formik.setFieldValue(`items[${productIndex}].address`, [
      ...(productItem.address || []),
      address,
    ]);
  };
  
  const removeProduct = (index) => {
    if (formik?.values?.items) {
      const data = formik.values.items.splice(index, 1);
      formik.setFieldValue("items", reject(formik.values.items, data));
    }
  };

  const removeAddress = (productIndex, addressIndex) => {
    if (formik?.values?.items) {
      const data = formik.values.items[productIndex]?.address.splice(
        addressIndex,
        1
      );
      formik.setFieldValue(
        `items[${productIndex}].address`,
        reject(formik.values.items[productIndex]?.address, data)
      );
    }
  };


  const bindData = async () => {
    await axiosInstance
      .get(`/api/auth/master/jobs/edit/${id}`)
      .then((response) => {
        if (response.status === 200) {
          if (response?.data?.view_data) {
            let newData = response?.data?.view_data;
            for (const [key] of Object.entries(formik.values)) {
              formik.setFieldValue([key], newData[key]);
            }
          }
        }
      });
  };

  React.useEffect(() => {
    if (id && id !== "create") {
      bindData();
    }
  }, [id]);

  console.log("formik", formik);

  return (
    <AuthGuard>
      <JobPostForm
        addProduct={addProduct}
        addSingleAddress={addSingleAddress}
        addSingleAddress1={addSingleAddress1}
        removeProduct={removeProduct}
        removesAddress={removesAddress}
        removeAddress={removeAddress}
        formik={formik}
      />
       <SubscriptionDialog />
    </AuthGuard>
  );
};

PostJob.getLayout = function getLayout(page) {
  return <PrimaryWebLayout>{page}</PrimaryWebLayout>;
};
export default PostJob;
