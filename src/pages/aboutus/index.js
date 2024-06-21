import React from "react";
import { PrimaryWebLayout } from "@/layout";
import { useFormik } from "formik";
import AboutUs from "@/sections/about";
const AboutUsPage = () => {
  const formik = useFormik({});
  return <AboutUs formik={formik} />;
};

AboutUsPage.getLayout = function getLayout(page) {
  return <PrimaryWebLayout>{page}</PrimaryWebLayout>;
};
export default AboutUsPage;
