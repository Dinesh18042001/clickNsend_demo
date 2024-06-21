import { PrimaryWebLayout } from "@/layout";
import TestimonialPage from "@/sections/testimonial/testimonialpage";
import { useFormik } from "formik";
const Testimonial = () => {
  const formik = useFormik({});
  return <TestimonialPage formik={formik} />;
};

Testimonial.getLayout = function getLayout(page) {
  return <PrimaryWebLayout>{page}</PrimaryWebLayout>;
};
export default Testimonial;