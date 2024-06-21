import React from "react";
import NewBanner from "./newbanner";
import OurFleet from "./ourfleet";
import TotalDrivers from "./totaldrivers";
import ForCard from "./forcard";
import HelpfulHome from "./helpfulhome";
import NewTestimonial from "./newtestimonials";
import Faqs from "./faqs";
import Testimonials from "./testimonials";

const PrimaryHomePage = () => {
  return (
    <React.Fragment>
      <NewBanner />
      <OurFleet />
      <TotalDrivers />
      <ForCard />
      <HelpfulHome />
      <Faqs/>
      <Testimonials/>
      {/* <NewTestimonial /> */}
    </React.Fragment>
  );
};

export default PrimaryHomePage;
