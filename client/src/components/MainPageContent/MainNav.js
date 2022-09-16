import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { MainContext } from "../../context/context";

const MainNav = () => {
  const { setProfileEnter } = useContext(MainContext);

  return (
    <div className="border-2 border-blue-400 p-1.5 rounded-lg m-1 flex justify-between items-center">
      <Link to="/">
        <div className="mx-3 items-center cursor-pointer">navBar</div>
      </Link>
      <Link to="Profile">
        <div
          className="inline-flex overflow-hidden relative justify-center items-center w-10 h-10 bg-gray-100 rounded-full dark:bg-gray-600 cursor-pointer"
          onClick={() => setProfileEnter((e) => !e)}
        >
          <span class="font-medium text-gray-600 dark:text-gray-300">R</span>
        </div>
      </Link>
    </div>
  );
};

export default MainNav;
