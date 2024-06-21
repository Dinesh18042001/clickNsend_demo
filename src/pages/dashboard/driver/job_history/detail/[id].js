import { PrimaryWebLayout } from "@/layout";
import ViewJobHistory from "@/sections/dashboard/driverDashboard/viewJobHistory";
import AuthGuard from "@/auth/AuthGuard";
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
