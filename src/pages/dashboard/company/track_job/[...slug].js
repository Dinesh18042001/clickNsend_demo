import AuthGuard from "@/auth/AuthGuard";
import SubscriptionDialog from "@/components/dialog/subscriptionDialog";
import { PrimaryWebLayout } from "@/layout";
import TrackJob from "@/sections/dashboard/companyDashboard/trackJob";
import { useFormik } from "formik";

const StartJobPage = () => {
  const formik = useFormik({
    initialValues: {
     
    },
  });
  return (
    <AuthGuard>
      <TrackJob formik={formik} />
      <SubscriptionDialog />
    </AuthGuard>
  );
};

StartJobPage.getLayout = function getLayout(page) {
  return <PrimaryWebLayout>{page}</PrimaryWebLayout>;
};
export default StartJobPage;
