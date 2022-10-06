import React from "react";
import LandingPageHero from "../components/LandingPageContent/LandingPageHero";
import LandingPageNavbar from "../components/LandingPageContent/LandingPageNavbar";
import LandingPageAboutUs from "../components/LandingPageContent/LandingPageAboutUs";
import LandingPageContact from "../components/LandingPageContent/LandingPageContact";
import LandingPageFooter from "../components/LandingPageContent/LandingPageFooter";

const LandingPage = () => {
  return (
    <div>
      <LandingPageNavbar />
      <LandingPageHero />
      <LandingPageAboutUs />
      <LandingPageContact />
      <LandingPageFooter />
    </div>
  );
};

export default LandingPage;
