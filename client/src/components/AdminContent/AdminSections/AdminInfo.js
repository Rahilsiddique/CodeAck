import React from "react";

const AdminInfo = () => {
  return (
    <div className="border-2 content- rounded-lg flex flex-row">
      <div className="flex justify-center">
        <img
          src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50"
          alt="ayo"
          className="rounded-full m-2 h-24 w-24 content-center"
        />
      </div>
      <div className="flex items-center">Name</div>
    </div>
  );
};

export default AdminInfo;
