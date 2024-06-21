
const navConfig = [
  {
    title: "Home",
    path: "/",
    token: (token) => true,
    sx: { fontSize: '5rem' }
  },
  {
    title: "About us",
    path: "/aboutus",
    token: (token) => true,
  },

  // {
  //   title: "Dashboard",
  //   path: "/dashboard/customer/job_post",
  //   token: (token) => token,
  // },
  {
    title: "Testimonials",
    path: "/testimonial/testimonials",
    token: (token) => true,
  },
  {
    title: "FAQ",
    path: "/faqs",
    token: (token) => true,
  },
  {
    title: "Blogs",
    path: "/blogs",
    token: (token) => true,
  },
  // {
  //   title: "Contact Us",
  //   path: "/contact_us",
  //   token: (token) => true,
  // },
  // {
  //   title: "
  //   path: "/dashboard/customer/profile",
  //   token: (token) => token,
  // },
];

export default navConfig;
