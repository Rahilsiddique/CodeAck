import React from "react";
import MainPageLeft from "../MainPageLeft";
import MainPageRight from "../MainPageRight";

const AfterContest = () => {
  return (
    <div className="grid md:grid-cols-2 divide-3 my-1">
      <div className="border-2 border-midGreen p-1.5 mr-0.5 rounded-lg">
        <MainPageLeft />
      </div>
      <div className="border-2 border-midGreen p-1.5 ml-0.5 rounded-lg">
        <MainPageRight />
      </div>
    </div>
  );
};

export default AfterContest;
