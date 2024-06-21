import AuthGuard from "@/auth/AuthGuard";
import { PrimaryWebLayout } from "@/layout";
import JobDeleteDetail from "@/sections/dashboard/customerDashboard/job_delete/delete_detail";

const ViewJobPage = () => {
  return (
    <AuthGuard>
      <JobDeleteDetail />
    </AuthGuard>
  );
};

ViewJobPage.getLayout = function getLayout(page) {
  return <PrimaryWebLayout>{page}</PrimaryWebLayout>;
};
export default ViewJobPage;
