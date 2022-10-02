import React, { useContext } from "react";
import { MainContext } from "../../../context/context";

const BeforeContest = () => {
  const { setRegistration, registration } = useContext(MainContext);
  return (
    <div className="w-full border-2 border-midGreen rounded-lg p-1.5 my-1">
      registration
      <button
        className="border-2 rounded-lg p-1 m-1"
        onClick={() => setRegistration(!registration)}
      >
        click to Register!
      </button>
    </div>
  );
};

export default BeforeContest;
