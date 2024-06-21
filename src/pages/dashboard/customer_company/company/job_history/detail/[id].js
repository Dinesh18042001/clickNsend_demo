import { PrimaryWebLayout } from "@/layout";
import AuthGuard from "@/auth/AuthGuard";
import ViewJobHistory from "@/sections/dashboard/companyDashboard/viewJobHistory";
import SubscriptionDialog from "@/components/dialog/subscriptionDialog";

const ViewJobPage = () => {
  return (
    <AuthGuard>

      <ViewJobHistory />
      <SubscriptionDialog />
    </AuthGuard>
  );
};

ViewJobPage.getLayout = function getLayout(page) {
  return <PrimaryWebLayout>{page}</PrimaryWebLayout>;
};
export default ViewJobPage;
