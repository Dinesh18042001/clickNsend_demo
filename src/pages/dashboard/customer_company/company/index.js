import AuthGuard from "@/auth/AuthGuard";
import SubscriptionDialog from "@/components/dialog/subscriptionDialog";
import { PrimaryWebLayout } from "@/layout";
import CompanyDashboard from "@/sections/dashboard/companyDashboard";
import { useFormik } from "formik";

const DashboardPage = () => {
  const formik = useFormik({});
  return (
    <AuthGuard>
      <CompanyDashboard formik={formik} />
      <SubscriptionDialog />
    </AuthGuard>
  );
};

DashboardPage.getLayout = function getLayout(page) {
  return <PrimaryWebLayout>{page}</PrimaryWebLayout>;
};
export default DashboardPage;
