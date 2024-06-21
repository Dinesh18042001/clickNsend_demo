import AuthGuard from "@/auth/AuthGuard";
import SubscriptionDialog from "@/components/dialog/subscriptionDialog";
import { PrimaryWebLayout } from "@/layout";
import JobDelete from "@/sections/dashboard/customerDashboard/job_delete";
import { useFormik } from "formik";

const JobHistoryPage = () => {
  const formik = useFormik({
    initialValues: {
      month: 0,
    },
  });

  console.log("formikformik", formik);
  return (
    <AuthGuard>
      <JobDelete formik={formik} />
      <SubscriptionDialog />
    </AuthGuard>
  );
};

JobHistoryPage.getLayout = function getLayout(page) {
  return <PrimaryWebLayout>{page}</PrimaryWebLayout>;
};
export default JobHistoryPage;
