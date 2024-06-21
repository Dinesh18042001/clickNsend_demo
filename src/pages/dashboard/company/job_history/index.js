import AuthGuard from "@/auth/AuthGuard";
import SubscriptionDialog from "@/components/dialog/subscriptionDialog";
import { PrimaryWebLayout } from "@/layout";
import JobHistory from "@/sections/dashboard/customerCompanyDashBoard/jobhistory";
// import compamyJobHistory from "@/sections/dashboard/customerCompanyDashBoard/jobhistory";
import { useFormik } from "formik";
import { useAuthContext } from "@/auth/useAuthContext";

const JobHistoryPage = () => {
  const { user } = useAuthContext();
  const formik = useFormik({
    initialValues: {
      month: 0,
    },
  });

  console.log("user user user", user);
  return (
    <AuthGuard>
    <JobHistory formik={formik} />  

      
      <SubscriptionDialog />
    </AuthGuard>
  );
};

JobHistoryPage.getLayout = function getLayout(page) {
  return <PrimaryWebLayout>{page}</PrimaryWebLayout>;
};
export default JobHistoryPage;
