import React from "react";

const MainPageRight = () => {
  const errors = [
    "this",
    "is",
    "Array",
    "of",
    "random",
    "words",
    "asdfasd",
    "fgfgteg",
    "qwerqwer"
  ];
  return (
    <div>
      <div className="flex justify-between p-1.5 border-2 rounded-lg">
        <div className="p-1">filler</div>
        <div className="border-2 border-purple-500 rounded-lg p-1">timer</div>
      </div>
      <div className="border-2 border-purple-400 rounded-lg m-1.5 p-1.5 flex justify-center h-80 items-center">
        Editor
      </div>
      <div className="border-2 border-yellow-400 m-1.5 p-1.5 flex rounded-lg flex-row-reverse">
        <button className="bg-green-400 hover:bg-green-500 rounded-lg p-1 m-1 px-2">
          Submit
        </button>
        <button className="bg-gray-300 hover:bg-gray-400 rounded-lg px-2 m-1 w-10">
          Run
        </button>
      </div>
      <div className="border-2 border-pink-400 rounded-lg p-1.5 m-1.5 h-44 overflow-scroll overflow-x-hidden">
        {errors.map((error) => (
          <div className="border-2 rounded-lg p-1.5 m-1.5">{error}</div>
        ))}
      </div>
    </div>
  );
};

export default MainPageRight;
