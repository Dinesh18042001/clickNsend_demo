// import AuthGuard from "@/auth/AuthGuard";
// import SubscriptionDialog from "@/components/dialog/subscriptionDialog";
// import { PrimaryWebLayout } from "@/layout";
// import CompanyDashboard from "@/sections/dashboard/companyDashboard";
// import { useFormik } from "formik";

// const DashboardPage = () => {
//   const formik = useFormik({});
//   return (
//     <AuthGuard>
//       <CompanyDashboard formik={formik} />
//       <SubscriptionDialog />
//     </AuthGuard>
//   );
// };

// DashboardPage.getLayout = function getLayout(page) {
//   return (
//     <PrimaryWebLayout>
//       {page}
//     </PrimaryWebLayout>
//   );
// };
// export default DashboardPage;




import { useState, useEffect } from "react";
import AuthGuard from "@/auth/AuthGuard";
import SubscriptionDialog from "@/components/dialog/subscriptionDialog";
import { PrimaryWebLayout } from "@/layout";
import CompanyDashboard from "@/sections/dashboard/companyDashboard";
import CustomerCompanyDashboard from "@/sections/dashboard/customerCompanyDashBoard";
import { useFormik } from "formik";

// Mock function to simulate fetching user data
const fetchUserData = (userType, companyType) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        user_type: userType,
        company_type: companyType,
      });
    }, 1000);
  });
};

const DashboardPage = () => {
  const [userData, setUserData] = useState(null);
  const formik = useFormik({});

  useEffect(() => {
    const userType = "company";

    // Fetch data for driver scenario
    const companyTypeDriver = "driver";
    fetchUserData(userType, companyTypeDriver)
      .then((data) => {
        console.log("Fetched user data for driver:", data);
        setUserData(data);
      })
      .catch((error) => console.error("Error fetching user data for driver:", error));

    // Fetch data for customer scenario
    const companyTypeCustomer = "customer";
    fetchUserData(userType, companyTypeCustomer)
      .then((data) => {
        console.log("Fetched user data for customer:", data);
        setUserData(data);
      })
      .catch((error) => console.error("Error fetching user data for customer:", error));
  }, []);

  if (!userData) {
    return <div>Loading...</div>; // or some kind of loading spinner
  }

  {console.log(userData,"userdata") }
  return (
    <AuthGuard>
      {userData.user_type === "company" && userData.company_type === "driver" && (
        <CompanyDashboard formik={formik} />
      )}
      {userData.user_type === "company" && userData.company_type === "customer" && (
        <CustomerCompanyDashboard formik={formik} />
      )}
      <SubscriptionDialog />
    </AuthGuard>
  );
};

DashboardPage.getLayout = function getLayout(page) {
  return <PrimaryWebLayout>{page}</PrimaryWebLayout>;
};

export default DashboardPage;

