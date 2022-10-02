import { type } from "@testing-library/user-event/dist/type";
import HTMLReactParser from "html-react-parser";
import { useContext, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
 import MainPage from "./components/MainPage";
 import MainNav from "./components/MainPageContent/MainNav";
import Profile from "./screen/Profile";
import LandingPage from "./testing/LandingPage";
import AdminProfile from './screen/AdminProfile'
import Login from "./components/Authentication/Login";
import MainPage from "./components/MainPage";
import MainNav from "./components/MainPageContent/MainNav";
import { MainContext } from "./context/context";
import AdminProfile from "./screen/AdminProfile";
import Profile from "./screen/Profile";
import LandingPage from "./testing/LandingPage";

function App() {
  const { isLogin } = useContext(MainContext);
  // const tempdel = JSON.stringify(googleLoginPage);

  return (
    <div className="App">
      {isLogin && <MainNav />}
      {/* {HTMLReactParser(tempdel)} */}
      <Routes>
        <Route path="/" element={<LandingPage />}></Route>
        <Route path="/main" element={<MainPage />}></Route>
        <Route path="/Home" element={<LandingPage />}></Route>
        <Route path="/Profile" element={<Profile />}></Route>
        <Route path="/Admin" element={<AdminProfile />}></Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
    </div>
  );
}

export default App;
