import SubscriptionDialog from "@/components/dialog/subscriptionDialog";
import { PrimaryWebLayout } from "@/layout";
import DashboardCard from "@/module/dashboard/companyCard/dashboardCard";
import { Box, Card, CardContent, Container, Typography } from "@mui/material";
import { useFormik } from "formik";

const MoneySpendList = () => {
  const formik = useFormik({});
  return (
    <Box mt={10} mb={4}>
      <Container >
        <Box py={5}>
          <DashboardCard />
        
        <SubscriptionDialog />
        </Box>
        <Card>
          <CardContent>
            <Typography variant="h3" component="h3" textAlign="center">
              This Page is under development
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

MoneySpendList.getLayout = function getLayout(page) {
  return <PrimaryWebLayout>{page}</PrimaryWebLayout>;
};
export default MoneySpendList;
