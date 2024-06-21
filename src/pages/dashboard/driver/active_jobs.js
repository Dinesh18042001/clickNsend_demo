import AuthGuard from "@/auth/AuthGuard";
import SubscriptionDialog from "@/components/dialog/subscriptionDialog";
import { PrimaryWebLayout } from "@/layout";
import DashboardJobPost from "@/sections/dashboard/driverDashboard/activejobs";
import { useFormik } from "formik";

const DashboardPageNext = () => {
  const formik = useFormik({
    initialValues: {
      month: 0,
    },
  });
  return (
    <>
      <DashboardJobPost formik={formik} />
      <SubscriptionDialog />
    </>
  );
};

DashboardPageNext.getLayout = function getLayout(page) {
  return (
    <PrimaryWebLayout>
      <AuthGuard>{page} </AuthGuard>
    </PrimaryWebLayout>
  );
};
export default DashboardPageNext;
