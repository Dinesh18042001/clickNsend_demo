import AuthGuard from "@/auth/AuthGuard";
import { PrimaryWebLayout } from "@/layout";
import { useFormik } from "formik";
import { reject } from "lodash";

const PostJob = () => {
  const defaultPickupAddressValues = {
    address: "",
    date: "",
    time: "",
    quantity: "",
    image: "",
  };

  const defaultDeliveryAddressValues = {
    address: "",
    date: "",
    time: "",
  };

  const formik = useFormik({
    initialValues: {
      pick_up_address: [],
      delivery_address: [],
    },
    validate: (values) => {
      const errors = {};
      if (!values.title) {
        errors.title = "title is required";
      }
      return errors;
    },
    onSubmit: async (values, { setErrors }) => {
    },
  });

  const addPickupAddress = () => {
    formik.setFieldValue("pick_up_address", [
      ...(formik.values.pick_up_address || []),
      defaultPickupAddressValues,
    ]);
  };

  const removePickupAddress = (index) => {
    if (formik?.values?.pick_up_address) {
      const data = formik.values.pick_up_address.splice(index, 1);
      formik.setFieldValue(
        "pick_up_address",
        reject(formik.values.pick_up_address, data)
      );
    }
  };
  const addDeliveryAddress = () => {
    formik.setFieldValue("delivery_address", [
      ...(formik.values.delivery_address || []),
      defaultDeliveryAddressValues,
    ]);
  };

  const removeDeliveryAddress = (index) => {
    if (formik?.values?.delivery_address) {
      const data = formik.values.delivery_address.splice(index, 1);
      formik.setFieldValue(
        "delivery_address",
        reject(formik.values.delivery_address, data)
      );
    }
  };

  return (
    <AuthGuard>
    <p>not found</p>
    </AuthGuard>
  );
};

PostJob.getLayout = function getLayout(page) {
  return <PrimaryWebLayout>{page}</PrimaryWebLayout>;
};
export default PostJob;
