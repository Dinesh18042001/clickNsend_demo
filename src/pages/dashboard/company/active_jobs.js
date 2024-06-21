import AuthGuard from "@/auth/AuthGuard";
import SubscriptionDialog from "@/components/dialog/subscriptionDialog";
import { PrimaryWebLayout } from "@/layout";
import DashboardAddJob from "@/sections/dashboard/companyDashboard/activejobs";
import { useFormik } from "formik";

const DashboardPageNext = () => {
  const formik = useFormik({
    initialValues: {
      month: 0,
    },
  });
  return (
    <AuthGuard>
      <DashboardAddJob formik={formik} />
      <SubscriptionDialog />
    </AuthGuard>
  );
};

DashboardPageNext.getLayout = function getLayout(page) {
  return <PrimaryWebLayout>{page}</PrimaryWebLayout>;
};
export default DashboardPageNext;
