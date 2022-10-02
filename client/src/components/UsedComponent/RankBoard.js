import React from "react";

const RankBoard = ({ rank, naam, points }) => {
  return (
    <div className="grid grid-cols-3 border-pink-600 border rounded-lg m-1 p-1">
      <>
        <div>{rank}</div>
        <div className="cursor-pointer">{naam}</div>
        <div>{points}</div>
      </>
    </div>
  );
};

export default RankBoard;
