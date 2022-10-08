import React from "react";

const LandingPageFooter = () => {
  return (
    <footer className="p-2 bg-darkGreen shadow md:flex md:items-center md:justify-between md:p-2">
      <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
        © 2022{" "}
        <a href="https://flowbite.com/" className="hover:underline">
          codeAck™
        </a>
        . All Rights Reserved.
      </span>
    </footer>
  );
};

export default LandingPageFooter;
