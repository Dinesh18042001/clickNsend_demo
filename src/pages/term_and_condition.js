import { PrimaryWebLayout } from "@/layout";
import TermAndConditionSection from "@/sections/term_and_condition";
import { useFormik } from "formik";

const TermConditionPage = () => {
  const formik = useFormik({});
  return <TermAndConditionSection formik={formik} />;
};

TermConditionPage.getLayout = function getLayout(page) {
  return <PrimaryWebLayout>{page}</PrimaryWebLayout>;
};
export default TermConditionPage;
