import React from "react";
import RankBoard from "../../UsedComponent/RankBoard";

const LeaderBoard = () => {
  const studentData = [
    {
      Rank: 1,
      userName: "Mr.Crowley",
      points: 123
    },
    {
      Rank: 1,
      userName: "Mr.Crowley",
      points: 123
    },
    {
      Rank: 1,
      userName: "Mr.Crowley",
      points: 123
    },
    {
      Rank: 1,
      userName: "Mr.Crowley",
      points: 123
    }
  ];
  return (
    <div>
      <div className="grid grid-cols-3 font-medium">
        <div>rank</div>
        <div>Username</div>
        <div>points</div>
      </div>
      {studentData.map((data) => (
        <RankBoard rank={data.Rank} naam={data.userName} points={data.points} />
      ))}
    </div>
  );
};

export default LeaderBoard;
