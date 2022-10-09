import React, { useContext, useEffect, useState } from "react";
import { FaGithub, FaGoogle, FaFacebook } from "react-icons/fa";
import { MainContext } from "../../context/context";

const Login = () => {
  const { googleLoginPage, setGoogleLoginPage, setIsLogIn, isLogin } =
    useContext(MainContext);

  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };
  useEffect(() => {
    fetch("http://localhost:5000/users/auth/google", requestOptions)
      .then((response) => response.text())
      .then((result) => setGoogleLoginPage(result))
      .catch((error) => console.log("error", error));
  }, [isLogin]);

  const doLogin = () => {
    setIsLogIn((prev) => !prev);
    window.location.href = JSON.parse(googleLoginPage).url;
    console.log(JSON.parse(googleLoginPage).url);
  };
  return (
    <div className="w-full grid h-screen place-items-center bg-midGreen">
      <div className="flex-center felx grid grid-cols-1 gap-4 m-auto rounded-lg border border-primaryBorder shadow-default py-10 px-10 bg-whiteLike">
        <div className="font font-bold">Sign Up</div>
        <button className="border-2 h-9 border-ligthGreen rounded-lg flex flex-row items-center justify-between px-2 gap-2 hover:bg-ligthGreen">
          <FaGithub></FaGithub>Github
        </button>
        <button
          className="border-2 h-9 border-ligthGreen rounded-lg flex flex-row items-center justify-between px-2 gap-2 hover:bg-ligthGreen"
          onClick={doLogin}
        >
          <FaGoogle></FaGoogle>Google
        </button>
        <button className="border-2 h-9 border-ligthGreen rounded-lg flex flex-row items-center justify-between px-2 gap-2 hover:bg-ligthGreen">
          <FaFacebook></FaFacebook>Facbook
        </button>
      </div>
    </div>
  );
};

export default Login;
