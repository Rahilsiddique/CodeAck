import React, { useState } from "react";
import { FaAlignCenter, FaAlignJustify } from "react-icons/fa";

const LandingPageNavbar = () => {
  const [navOn, setNavOn] = useState(false);
  return (
    <div className="w-full top-0 z-30 scroll-smooth">
      <nav className="flex items-center justify-between flex-wrap bg-[#1D3557] p-6 scroll-smooth">
        <div className="flex items-center flex-shrink-0 text-whiteLike mr-6 px-10">
          <span className="font-semibold text-3xl tracking-tight">
            co
            <span className="transition duration-300 hover:hidden">
              de<span className="text-crimsonLike">A</span>
            </span>
            ck
          </span>
        </div>
        <div
          className={`text-lg lg:w-auto justify-between px-10 lg:block ${
            navOn && "hidden"
          }`}
        >
          <a
            href="#home"
            className="block mt-4 lg:inline-block lg:mt-0 text-ligthGreen hover:text-crimsonLike px-5 transition duration-300"
          >
            Home
          </a>
          <a
            href="#about-us"
            className="block mt-4 lg:inline-block lg:mt-0 text-ligthGreen hover:text-crimsonLike px-5 transition duration-300"
          >
            About Us
          </a>
          <a
            href="#contact-us"
            className="block mt-4 lg:inline-block lg:mt-0 text-ligthGreen hover:text-crimsonLike px-5 transition duration-300"
          >
            Contact Us
          </a>
        </div>
        <div className={`lg:hidden`}>
          <FaAlignJustify
            color="crimson"
            onClick={() => setNavOn((prev) => !prev)}
          />
        </div>
      </nav>
    </div>
  );
};

export default LandingPageNavbar;
