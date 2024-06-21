import AuthGuard from "@/auth/AuthGuard";
import SubscriptionDialog from "@/components/dialog/subscriptionDialog";
import { PrimaryWebLayout } from "@/layout";
import ViewJobDetail from "@/sections/dashboard/driverDashboard/viewJob";
import { useFormik } from "formik";

const ViewJobPage = () => {
  const formik = useFormik({});
  return (
    <AuthGuard>
      <ViewJobDetail formik={formik} />
      <SubscriptionDialog />

    </AuthGuard>
  );
};

ViewJobPage.getLayout = function getLayout(page) {
  return <PrimaryWebLayout>{page}</PrimaryWebLayout>;
};
export default ViewJobPage;
