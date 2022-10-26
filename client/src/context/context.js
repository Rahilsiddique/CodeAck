import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import React, { createContext, useState } from "react";

// const initialState = {};

export const MainContext = createContext();

export const Provider = ({ children }) => {
  const sidebarContent = {
    profile: "Profile",
    addContest: "Add Contest",
    makeAnnouncement: "Make Announcement",
  };
  const [registration, setRegistration] = useState(false);
  const [profileEnter, setProfileEnter] = useState(false);
  const [question, setQuestion] = useState([]);
  const [googleLoginPage, setGoogleLoginPage] = useState(null);
  const [isLogIn, setIsLogIn] = useState(false);
  const [adminSection, setAdminSection] = useState(
    Object.keys(sidebarContent)[0]
  );

  // userAuth data  ***Not Permanent***
  const userData =
    Object.keys(Cookies.get()).length === 0
      ? null
      : jwtDecode(Cookies.get().jwt);

  const [authData, setAuthData] = useState(userData);
  return (
    <MainContext.Provider
      value={{
        registration,
        setRegistration,
        profileEnter,
        setProfileEnter,
        adminSection,
        setAdminSection,
        sidebarContent,
        question,
        setQuestion,
        googleLoginPage,
        setGoogleLoginPage,
        isLogIn,
        setIsLogIn,
        authData,
        setAuthData,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};
