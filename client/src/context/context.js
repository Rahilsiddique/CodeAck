import React, { createContext, useState } from "react";

// const initialState = {};

export const MainContext = createContext();

export const Provider = ({ children }) => {
  const [registration, setRegistration] = useState(false);
  const [profileEnter, setProfileEnter] = useState(false);

  return (
    <MainContext.Provider
      value={{
        registration,
        setRegistration,
        profileEnter,
        setProfileEnter
      }}
    >
      {children}
    </MainContext.Provider>
  );
};
