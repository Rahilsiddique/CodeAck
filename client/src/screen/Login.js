import React from "react";


function Login(props) {
    var raw = "{\r\n    \"username\": \"johny\",\r\n    \"password\": \"password\"\r\n}";

var requestOptions = {
  method: 'POST',
  body: raw,
  redirect: 'follow'
};

fetch("http://localhost:5000/users/auth/login", requestOptions)
  .then(response => response.json())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
  return (
    <div className="  w-full mx-auto max-w-[1300px] h-screen grid grid-cols-3 p-20 ]  ">
      <div className="bg-[#1D3557] rounded-l-lg ">
        <div className=" p-2  my-[7rem] ">
          <div className="text-[#F1FAEE]  items-center p-5  ">
            <span className=" font-semibold text-3xl tracking-tight p ">
              code
              <span className="text-[#E63946]">A</span>
              ck
            </span>
          </div>
          <p className="text-sm text-[white]  font-semibold">
            Where coders get to know their potential{" "}
          </p>
        </div>
      </div>

      <div className="bg-[white] pt-20 p-4 col-span-2 rounded-r-lg ">

        <form className='flex flex-col 
                    items-center justify-center '>
          <div
            className=" "
          >
            <div>
              <label
                forhtml="email"
                className="block text-sm font-semibold text-gray-800"
              >
                Email
              </label>
              <input
                type="email"
                placeholder="testing@gmail.com"
                className="block w-full px-4 py-2 mt-2 text-[#05314f] bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>

            <div>
              <label
                forhtml="password"
                className="block text-sm font-semibold text-gray-800"
              >
                Password
              </label>
              <input
                type="password"
                placeholder="Password"
                className="block w-full px-4 py-2 mt-2 text-[#4fa0d6] bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />

              <a
                        href="#"
                        className="text-xs text-[#4fa0d6] hover:underline"
                    >
                        Forget Password?
                    </a>
                    <div className="mt-6">
                        <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-[#1D3557] rounded-md hover:bg-[#1D3557] focus:outline-none focus:bg-[#1D3557]">
                            Login
                        </button>
                      </div>
            </div>
          </div>
        </form>
         <p className="mt-8 text-xs font-light text-center text-gray-700">
                    {" "}
                    Don't have an account?{" "}
                    <a
                        href="#"
                        className="font-medium text-[#4fa0d6] hover:underline"
                    >
                        Sign up
                    </a>
                </p>
      </div>
    </div>
  );
}

export default Login;
