import { PrimaryWebLayout } from "@/layout";
import Login from "@/sections/auth/login";
import React from "react";
import GuestGuard from "@/auth/GuestGuard";

const LoginPage = () => {
  return (
    <GuestGuard>
      <Login />
    </GuestGuard>
  );
};

LoginPage.getLayout = function getLayout(page) {
  return <PrimaryWebLayout>{page}</PrimaryWebLayout>;
};
export default LoginPage;
