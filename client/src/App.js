//import { Route, Routes } from "react-router-dom";
import "./App.css";
<<<<<<< HEAD
import MainPage from "./components/MainPage";
import MainNav from "./components/MainPageContent/MainNav";
import AdminProfile from "./screen/AdminProfile";
import Profile from "./screen/Profile";
import LandingPage from "./testing/LandingPage";

=======
// import MainPage from "./components/MainPage";
 import MainNav from "./components/MainPageContent/MainNav";
// import Profile from "./screen/Profile";
// import LandingPage from "./testing/LandingPage";
import AdminProfile from './screen/AdminProfile'
>>>>>>> be175d276ee655585f6e0f45b0d76f7868fd9302
function App() {
  return (
    <div className="App">

      <MainNav />
      {/* <Routes>
        <Route path="/" element={<MainPage />}></Route>
        <Route path="/Home" element={<LandingPage />}></Route>
        <Route path="/Profile" element={<Profile />}></Route>
<<<<<<< HEAD
        <Route path="/Admin" element={<AdminProfile />}></Route>
      </Routes>
=======
      </Routes> */}
      <AdminProfile></AdminProfile>
>>>>>>> be175d276ee655585f6e0f45b0d76f7868fd9302
    </div>
  );
}

export default App;
