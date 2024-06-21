import AuthGuard from "@/auth/AuthGuard";
import SubscriptionDialog from "@/components/dialog/subscriptionDialog";
import { PrimaryWebLayout } from "@/layout";
import JobList from "@/sections/dashboard/driverDashboard/joblisting";
import { useFormik } from "formik";

const JobListing = () => {
  const formik = useFormik({});
  return (
    <AuthGuard>
      <JobList formik={formik} />
      <SubscriptionDialog />

    </AuthGuard>
  );
};

JobListing.getLayout = function getLayout(page) {
  return <PrimaryWebLayout>{page}</PrimaryWebLayout>;
};
export default JobListing;
