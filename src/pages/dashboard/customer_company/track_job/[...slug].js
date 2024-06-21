import AuthGuard from "@/auth/AuthGuard";
import { PrimaryWebLayout } from "@/layout";
import TrackJob from "@/sections/dashboard/customerDashboard/trackJob";
import { useFormik } from "formik";

const StartJobPage = () => {
  const formik = useFormik({
    initialValues: {
     
    },
  });
  return (
    <AuthGuard>
      <TrackJob formik={formik} />
    </AuthGuard>
  );
};

StartJobPage.getLayout = function getLayout(page) {
  return <PrimaryWebLayout>{page}</PrimaryWebLayout>;
};
export default StartJobPage;
