import React, { useContext } from "react";
import AdminSideBar from "../components/AdminContent/AdminSideBar";
import { MainContext } from "../context/context";
import AdminContest from "../components/AdminContent/AdminSections/AdminContest";
import AdminInfo from "../components/AdminContent/AdminSections/AdminInfo";
import AdminAnnouncement from "../components/AdminContent/AdminSections/AdminAnnouncement";

const AdminProfile = () => {
  const { adminSection, sidebarContent } = useContext(MainContext);
  console.log(adminSection, sidebarContent);
  const generateAdminSection = () => {
    switch (sidebarContent[adminSection]) {
      case sidebarContent.profile:
        return <AdminInfo />;
      case sidebarContent.addContest:
        return <AdminContest />;
      case sidebarContent.makeAnnouncement:
        return <AdminAnnouncement />;
      default:
        return null;
    }
  };
  return (
    <div className="grid grid-cols-6 h-auto gap-2 border-green-200 border-2 m-2 p-1 rounded-lg">
      <div className="col-span-2 border-2 border-green-300 rounded-lg">
        <AdminSideBar />
      </div>
      <div className="col-span-4 border-2 border-green-300 rounded-lg md:grid-cols-1">
        {generateAdminSection()}
      </div>
    </div>
  );
};

export default AdminProfile;
