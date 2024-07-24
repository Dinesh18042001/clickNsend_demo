import AuthGuard from "@/auth/AuthGuard";
import SubscriptionDialog from "@/components/dialog/subscriptionDialog";
import { PrimaryWebLayout } from "@/layout";
// import ViewHistoryPDF from "@/sections/dashboard/driverDashboard/jobHistory/pdf";
import ViewHistoryPDF from "@/sections/dashboard/companyDashboard/driver/jobHistory/pdf";


const ViewJobPage = () => {
  return (
    <AuthGuard>
      <ViewHistoryPDF/>
      <SubscriptionDialog />

    </AuthGuard>
  );
};

ViewJobPage.getLayout = function getLayout(page) {
  return <PrimaryWebLayout>{page}</PrimaryWebLayout>;
};
export default ViewJobPage;
