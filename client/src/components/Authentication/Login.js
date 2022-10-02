import React from "react";
import { FaGithub, FaGoogle, FaFacebook } from "react-icons/fa";

const Login = () => {
  return (
    <div className="w-full grid h-screen place-items-center">
      <div className="flex-center felx grid grid-cols-1 gap-4 m-auto bg-white rounded-lg border border-primaryBorder shadow-default py-10 px-10">
        <div className="font">Sign Up</div>
        <button className="border-2 h-9 border-midGreen rounded-lg flex flex-row items-center justify-between px-2 gap-2 hover:bg-ligthGreen">
          <FaGithub></FaGithub>Github
        </button>
        <button className="border-2 h-9 border-midGreen rounded-lg flex flex-row items-center justify-between px-2 gap-2 hover:bg-ligthGreen">
          <FaGoogle></FaGoogle>Google
        </button>
        <button className="border-2 h-9 border-midGreen rounded-lg flex flex-row items-center justify-between px-2 gap-2 hover:bg-ligthGreen">
          <FaFacebook></FaFacebook>Facbook
        </button>
      </div>
    </div>
  );
};

export default Login;
