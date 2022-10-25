import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import React, { useContext, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { MainContext } from "../context/context";

const Profile = () => {
  const { setProfileEnter, authData } = useContext(MainContext);
  return (
    <div className="border-2 border-whiteLike w-64 rounded-lg m-1 content-center flex flex-col absolute z-10 bg-ligthGreen top-0 right-0">
      <div className="flex justify-center">
        <img
          src={`${authData?.userdata.profilePicture}`}
          alt="ayo"
          className="rounded-full m-2 h-24 w-24 flexs justify-center"
        />
        <span
          className="items-right mt-3"
          onClick={() => setProfileEnter((e) => !e)}
        >
          <FaTimes />
        </span>
      </div>
      <div>{authData?.userdata.username}</div>
      <div>Rank</div>
      <div>total no of contest attended</div>
    </div>
  );
};

export default Profile;
