import AuthGuard from "@/auth/AuthGuard";
import { PrimaryWebLayout } from "@/layout";
import SubscriptionsPage from "@/sections/dashboard/driverDashboard/subscription";
import { useFormik } from "formik";

const SubscriptionPage = () => {
  const formik = useFormik({});
  return (
    <AuthGuard>
      <SubscriptionsPage formik={formik} />
    </AuthGuard>
  );
};

SubscriptionPage.getLayout = function getLayout(page) {
  return <PrimaryWebLayout>{page}</PrimaryWebLayout>;
};
export default SubscriptionPage;
