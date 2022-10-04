import React from "react";
import LandingPageHero from "../components/LandingPageContent/LandingPageHero";
import LandingPageNavbar from "../components/LandingPageContent/LandingPageNavbar";
import LandingPageAboutUs from "../components/LandingPageContent/LandingPageAboutUs";

const LandingPage = () => {
  return (
    <div>
      <LandingPageNavbar />
      <LandingPageHero />
      <LandingPageAboutUs />
    </div>

  );
};

export default LandingPage;
