import React from "react";
import MainNav from "./MainPageContent/MainNav";
import MainPageLeft from "./MainPageContent/MainPageLeft";
import MainPageRight from "./MainPageContent/MainPageRight";

const MainPage = () => {
  return (
    <div>
      <MainNav />
      <div className="grid md:grid-cols-2 divide-3">
        <div className="border-2 border-red-500 p-1.5 m-1.5 rounded-lg">
          <MainPageLeft />
        </div>
        <div className="border-2 border-green-500 p-1.5 m-1.5 rounded-lg">
          <MainPageRight />
        </div>
      </div>
    </div>
  );
};

export default MainPage;
