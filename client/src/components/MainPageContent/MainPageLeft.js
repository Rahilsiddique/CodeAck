import React, { useContext } from "react";
import { MainContext } from "../../context/context";

const MainPageLeft = () => {
  const { registration, setRegistration } = useContext(MainContext);
  return (
    <div className="flex-1">
      <button
        onClick={() => setRegistration(!registration)}
        className="border-2 rounded-lg p-1 m-1"
      >
        exit contest
      </button>
      <div>MainPageLeft</div>
    </div>
  );
};

export default MainPageLeft;
