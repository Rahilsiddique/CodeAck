import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MainContext } from "../../context/context";
import MainPage from "../MainPage";

const Protected = ({ component }) => {
  const { isLogIn } = useContext(MainContext);
  const navigate = useNavigate();
  //   useEffect(() => {
  //     if (!isLogIn) {
  //       navigate("/login");
  //     }
  //   });
  return (
    <div>
      <MainPage />
    </div>
  );
};

export default Protected;
