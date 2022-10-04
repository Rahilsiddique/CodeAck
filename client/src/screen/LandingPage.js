import React from "react";
import ImageLanding from '../Assets/ImageLanding.png'
import Card from "../components/AdminSection/Card";
const LandingPage = () => {
  return (
    <div>
      <div className=' flex  items-center p-4 text-black'>
        <h1 className='  w-full text-3xl font-bold text-[#00df9a]'>CodeAck.</h1>
         <button className='bg-[#F1FAEE] font-medium px-3 w-[150px] mx-2 py-2 rounded-md  m-4 text-[#000300] '>Sign Up </button>
         <button className='bg-[#E63946] font-medium px-3 w-[150px] mx-2 py-2  rounded-md text-[#000300] '>Login </button>


      </div>


      <div className='grid md:grid-cols-2 h-screen gap-8  mx-auto max-w-[1240px] p-7 text-black'>
        <div className="">
         <Card />

        </div>
        <div >
          <img src={ImageLanding} alt ="/"/>
        </div>
      </div>
      



=======
import LandingPageHero from "../components/LandingPageContent/LandingPageHero";
import LandingPageNavbar from "../components/LandingPageContent/LandingPageNavbar";
import LandingPageAboutUs from "../components/LandingPageContent/LandingPageAboutUs";

const LandingPage = () => {
  return (
    <div>
      <LandingPageNavbar />
      <LandingPageHero />
      <LandingPageAboutUs />
>>>>>>> 4fbeb4aa499eca3276cb1424e45bfe05bb78c570
    </div>

  );
};

export default LandingPage;
