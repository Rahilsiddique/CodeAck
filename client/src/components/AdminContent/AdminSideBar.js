import React, { useContext } from "react";
import { MainContext } from "../../context/context";

const AdminSideBar = () => {
  const { adminSection, setAdminSection, sidebarContent } =
    useContext(MainContext);
  return (
    <div className="grid grid-cols-1 divide-y rounded-lg p-1 m-1 cursor-pointer">
      {Object.keys(sidebarContent)?.map((key) => (
        <div
          className={`${adminSection === key && "bg-amber-200 rounded-lg"}`}
          key={key}
          onClick={() => setAdminSection(key)}
        >
          {sidebarContent[key]}
        </div>
      ))}
    </div>
  );
};

export default AdminSideBar;
