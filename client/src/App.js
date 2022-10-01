import { Route, Routes } from "react-router-dom";
import "./App.css";
 import MainPage from "./components/MainPage";
 import MainNav from "./components/MainPageContent/MainNav";
import Profile from "./screen/Profile";
import LandingPage from "./testing/LandingPage";
import AdminProfile from './screen/AdminProfile'
function App() {
  return (
    <div className="App">

      <MainNav />
      {/* <Routes>
        <Route path="/" element={<MainPage />}></Route>
        <Route path="/Home" element={<LandingPage />}></Route>
        <Route path="/Profile" element={<Profile />}></Route>
      </Routes> */}
      <AdminProfile></AdminProfile>
    </div>
  );
}

export default App;
