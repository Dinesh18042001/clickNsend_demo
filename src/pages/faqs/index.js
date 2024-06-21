import { PrimaryWebLayout } from "@/layout";
import FaqsPage from "@/sections/faqs";
import { useFormik } from "formik";

const Faqs = () => {
  const formik = useFormik({});
  return <FaqsPage formik={formik} />;
};

Faqs.getLayout = function getLayout(page) {
  return <PrimaryWebLayout>{page}</PrimaryWebLayout>;
};
export default Faqs;
