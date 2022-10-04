import React from "react";

const LandingPageNavbar = () => {
  return (
    <div className="w-full sticky top-0 z-30 scroll-smooth">
      <nav className="flex items-center justify-between flex-wrap bg-[#1D3557] p-6 scroll-smooth">
        <div className="flex items-center flex-shrink-0 text-whiteLike mr-6 px-10 hover:scale-105 duration-300">
          <span className="font-semibold text-3xl tracking-tight">
            code<span className="text-crimsonLike">A</span>ck
          </span>
        </div>
        <div className="text-lg lg:w-auto justify-between px-10">
          <a
            href="#home"
            className="block mt-4 lg:inline-block lg:mt-0 text-ligthGreen hover:text-crimsonLike px-5"
          >
            Home
          </a>
          <a
            href="#about-us"
            className="block mt-4 lg:inline-block lg:mt-0 text-ligthGreen hover:text-crimsonLike px-5"
          >
            About Us
          </a>
          <a
            href="#contact-us"
            className="block mt-4 lg:inline-block lg:mt-0 text-ligthGreen hover:text-crimsonLike px-5"
          >
            Contact Us
          </a>
        </div>
      </nav>
    </div>
  );
};

export default LandingPageNavbar;
