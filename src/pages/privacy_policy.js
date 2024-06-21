import { PrimaryWebLayout } from "@/layout";
import PrivacyPolicySection from "@/sections/privacy_policy";
import { Box } from "@mui/material";

const PrivacyPolicy = () => {
  return (
    <Box sx={{ py: 6 }}>
      <PrivacyPolicySection />
    </Box>
  );
};
PrivacyPolicy.getLayout = function getLayout(page) {
  return <PrimaryWebLayout>{page}</PrimaryWebLayout>;
};
export default PrivacyPolicy;
