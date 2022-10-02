import React from "react";

const Profile = () => {
  return (
    <div className="grid grid-cols-3 border-2 border-ligthGreen rounded-lg m-1">
      <div className="border-2 border-ligthGreen rounded-lg m-1 content-center flex flex-col">
        <div className="flex justify-center">
          <img
            src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50"
            alt="ayo"
            className="rounded-full m-2 h-24 w-24 content-center"
          />
        </div>
        <div>Name</div>
        <div>Rank</div>
      </div>
      <div className=" border-2 col-span-2 border-ligthGreen rounded-lg m-1">
        <div>total no of contest attended</div>
      </div>
    </div>
  );
};

export default Profile;
