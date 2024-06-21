import { PrimaryWebLayout } from "@/layout";
import { useFormik } from "formik";
import AuthGuard from "@/auth/AuthGuard";
import SubscriptionDialog from "@/components/dialog/subscriptionDialog";
import JobHistory from "@/sections/dashboard/driverDashboard/jobHistory";

const JobHistoryPage = () => {
  const formik = useFormik({
    initialValues: {
      month: 0,
    },
  });

  return (
    <AuthGuard>
      <JobHistory formik={formik}/>
      {/* <JobHistory formik={formik} />*/}
      <SubscriptionDialog />
    </AuthGuard>
  );
};

JobHistoryPage.getLayout = function getLayout(page) {
  return <PrimaryWebLayout>{page}</PrimaryWebLayout>;
};
export default JobHistoryPage;
