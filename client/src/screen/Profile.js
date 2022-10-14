import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import React, { useContext, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { MainContext } from "../context/context";

const Profile = () => {
  const { setProfileEnter } = useContext(MainContext);
  const [userData, setUserData] = useState(Cookies.get());
  userData = jwtDecode(Cookies.get());
  console.log(userData);
  return (
    <div className="border-2 border-whiteLike w-64 rounded-lg m-1 content-center flex flex-col absolute z-10 bg-ligthGreen top-0 right-0">
      <div className="flex justify-center">
        <img
          src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50"
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
      <div>Name</div>
      <div>Rank</div>
      <div>total no of contest attended</div>
    </div>
  );
};

export default Profile;
