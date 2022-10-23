import React from "react";

function ForgotPassword(props) {
var raw = "{\r\n    \"email\": \"masteraditya45@gmail.com\"\r\n}";

var requestOptions = {
  method: 'POST',
  body: raw,
  redirect: 'follow'
};

fetch("http://localhost:5000/users/auth/resetPassword", requestOptions)
  .then(response => response.json())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
  return (
    <div className=" w-full p-3  h-screen bg-white border-solid  ">
      <div className="max-w-[1240px]  mx-auto  grid md:grid-row-gap-8 p-7 w-[30%] gap-8  bg-[#c0c2c4] border-solid border-2 rounded-md border-[#05314f]">
        <div className="text-3xl px-1 border-solid border-2 rounded-md border-[#05314f]">
          Password Reset
        </div>

        <div className=" bg-[#bddadd] border-solid border-2 rounded-md border-[#05314f] p-4">
          <p>
            Forgotten your Password? Enter your e-mail address, and we'll send
            you an e-mail allowing you to reset it.
          </p>
        </div>
        <div>
          <input
            className="py-2  w-full border-solid border-2 rounded-md border-[#437843]"
            type="email"
            placeholder="e-mail address"
          ></input>
          <p className="text-[#eb282e]">Required</p>
        </div>

        <button className="bg-[#05314f] font-medium px-3 w-[200px] mx-auto py-3 rounded-md text-[white] ">
          Reset my Password{" "}
        </button>
      </div>
    </div>
  );
}

export default ForgotPassword;
