import AuthGuard from "@/auth/AuthGuard";
import { PrimaryWebLayout } from "@/layout";
import ViewJobHistory from "@/sections/dashboard/customerDashboard/viewJobHistory";

const ViewJobPage = () => {
  return (
    <AuthGuard>
      <ViewJobHistory />
    </AuthGuard>
  );
};

ViewJobPage.getLayout = function getLayout(page) {
  return <PrimaryWebLayout>{page}</PrimaryWebLayout>;
};
export default ViewJobPage;
