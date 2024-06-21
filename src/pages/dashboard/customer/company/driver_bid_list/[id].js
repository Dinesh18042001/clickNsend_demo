import AuthGuard from "@/auth/AuthGuard";
import SubscriptionDialog from "@/components/dialog/subscriptionDialog";
import { PrimaryWebLayout } from "@/layout";
import BidList from "@/sections/dashboard/companyDashboard/driverBidList";
import { useFormik } from "formik";

const JobListing = () => {
  const formik = useFormik({});
  return (
    <AuthGuard>
      <BidList formik={formik} />
      <SubscriptionDialog />
    </AuthGuard>
  );
};

JobListing.getLayout = function getLayout(page) {
  return <PrimaryWebLayout>{page}</PrimaryWebLayout>;
};
export default JobListing;
