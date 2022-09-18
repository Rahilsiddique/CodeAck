import React, { useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { AiOutlineUser } from "react-icons/ai";
import { FcStatistics } from 'react-icons/fc';
import { MdOutlineDashboardCustomize } from 'react-icons/md';
import { GiRank3 } from 'react-icons/gi';
import CardComponent from "../components/AdminSection/Card";

const AdminProfile = () => {
  const [Rank, setRank] = useState(0);
  const menu = [
    { name: "UserProfile", link: "/", icon: AiOutlineUser },
    { name: "Statistic", link: "/", icon: FcStatistics },
    { name: " Contest DashBoard", link: "/", icon: MdOutlineDashboardCustomize },
    // { name: "Rating", link: "/", icon:  },
  ];

  return (
    <section className="flex gap-6 ">
      <div className="  bg-[#1D3557] min-h-screen w-72 text-gray-100 px-4">


        <div className=" py-3 flex justify-end">
          <HiMenuAlt3 size={26} className="cursor-pointer" />
        </div>

        <div className="mt-4 flex flex-col gap-4 relative ">
          <div className=" px-10 m-2 h-27 ">
            <img
              src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50"
              alt="ayo"
              className="rounded-full m-2 h-24 w-24 content-center px-1"
            />
            <div className="flex relative item-center gap-3.5 font-medium">
              <GiRank3 /><h2>{Rank}</h2>

            </div>
          </div>

          {menu?.map((menu, i) => (
            <div to={menu?.link} key={i} className="flex items-center text-sm gap-3.5 font-medium p-2   rounded-md ">
              <div className="hover:bg-grey-200">{React.createElement(menu?.icon, { size: "20" })}</div>
              <h2>{menu?.name}</h2>
            </div>
          ))}
        </div>
      </div>

      {/* home */}

      <div class="max-w-sm w-full lg:max-w-full lg:flex">
        <div class="h-48 lg:h-auto lg:w-55 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden m-5">
           <CardComponent/>
           <CardComponent/>
        </div>
      </div>
    </section>
  );
};

export default AdminProfile;
