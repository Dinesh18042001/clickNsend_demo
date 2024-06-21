import React from "react";
import { PrimaryWebLayout } from "@/layout";
import { useFormik } from "formik";
import AuthGuard from "@/auth/AuthGuard";
import DriverJobListSection from "@/sections/dashboard/companyDashboard/driver/list";
import SubscriptionDialog from "@/components/dialog/subscriptionDialog";

const DriverJobList = () => {
  const formik = useFormik({
    initialValues: {
      month: 0,
    },
  });
  return (
    <AuthGuard>
      <DriverJobListSection formik={formik} />
      <SubscriptionDialog />
    </AuthGuard>
  );
};

DriverJobList.getLayout = function getLayout(page) {
  return <PrimaryWebLayout>{page}</PrimaryWebLayout>;
};
export default DriverJobList;
