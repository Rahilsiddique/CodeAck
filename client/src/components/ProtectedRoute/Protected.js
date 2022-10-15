import Cookies from "js-cookie";
import React, { useContext, useEffect } from "react";
import { Route, Navigate, Routes, useNavigate } from "react-router-dom";
import { MainContext } from "../../context/context";
import MainPage from "../MainPage";

const Protected = (props) => {
  const { Component } = props;
  const navigate = useNavigate();
  console.log(Object.keys(Cookies.get()).length === 0);
  useEffect(() => {
    if (Object.keys(Cookies.get()).length === 0) {
      navigate("/login");
    }
    if (Object.keys(Cookies.get()).length > 0) {
      navigate("/main");
    }
  }, []);
  return (
    <>
      <Component />
    </>
  );
};

export default Protected;
