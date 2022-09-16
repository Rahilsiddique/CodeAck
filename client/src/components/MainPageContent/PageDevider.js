import React, { useContext } from "react";
import { useState } from "react";
import Announcement from "./ThreePages/Announcement";
import LeaderBoard from "./ThreePages/LeaderBoard";
import AfterContest from "./ThreePages/AfterContest";
import BeforeContest from "./ThreePages/BeforeContest";
import { MainContext } from "../../context/context";

const sections = {
  contest: "Contest",
  announcement: "Announcement",
  leaderBoard: "LeaderBoard"
};
const PageDevider = () => {
  const { registration } = useContext(MainContext);
  const [selectedSection, setSelectedSection] = useState(
    Object.keys(sections)[0]
  );

  const isRegistered = () => {
    return registration ? <AfterContest /> : <BeforeContest />;
  };
  const generateSection = () => {
    switch (sections[selectedSection]) {
      case sections.contest:
        return isRegistered();

      case sections.announcement:
        return <Announcement />;

      case sections.leaderBoard:
        return <LeaderBoard />;
      default:
        break;
    }
  };
  return (
    <div className="m-1">
      <div className="grid grid-cols-3 divide-x border-2 border-purple-700 rounded-lg p-1 m-1 cursor-pointer">
        {Object.keys(sections)?.map((key) => (
          <div
            className={`${
              selectedSection === key && "bg-amber-200 rounded-lg"
            }`}
            key={key}
            onClick={() => setSelectedSection(key)}
          >
            {sections[key]}
          </div>
        ))}
      </div>
      {generateSection()}
    </div>
  );
};

export default PageDevider;
