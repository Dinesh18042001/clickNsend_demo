import AuthGuard from "@/auth/AuthGuard";
import SubscriptionDialog from "@/components/dialog/subscriptionDialog";
import { PrimaryWebLayout } from "@/layout";
import DashboardJobRequest from "@/sections/dashboard/driverDashboard/jobRequest";
import { useFormik } from "formik";

const JobRequestPage = () => {
  const formik = useFormik({});

  return (
    <AuthGuard>
      <DashboardJobRequest formik={formik} />
      <SubscriptionDialog/>
    </AuthGuard>
  );
};

JobRequestPage.getLayout = function getLayout(page) {
  return (
    <PrimaryWebLayout>
     {page}
    </PrimaryWebLayout>
  );
};
export default JobRequestPage;
