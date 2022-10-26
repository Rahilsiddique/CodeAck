import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { MainContext } from "../../context/context";
import Profile from "../../screen/Profile";

const MainNav = () => {
  const { setProfileEnter, profileEnter, authData } = useContext(MainContext);

  return (
    <>
      <div className="border-2 border-midGreen bg-whiteLike p-1.5 rounded-lg m-1 flex justify-between items-center">
        <div className="mx-3 items-center cursor-pointer">navBar</div>
        <div
          className="inline-flex overflow-hidden relative justify-center items-center w-10 h-10 bg-gray-100 rounded-full dark:bg-gray-600 cursor-pointer"
          onClick={() => setProfileEnter((e) => !e)}
        >
          <span class="font-medium text-gray-600 dark:text-gray-300">
            {authData?.userdata.username[0]}
          </span>
        </div>
      </div>
      {profileEnter ? <Profile /> : null}
    </>
  );
};

export default MainNav;
