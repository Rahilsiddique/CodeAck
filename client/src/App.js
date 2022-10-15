import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import LandingPage from "./screen/LandingPage";
import AdminProfile from "./screen/AdminProfile";
import Login from "./components/Authentication/Login";
import MainPage from "./components/MainPage";
import Protected from "./components/ProtectedRoute/Protected";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/*" element={<LandingPage />}></Route>
        <Route
          path="/main"
          element={<Protected Component={MainPage} />}
        ></Route>
        <Route path="/Home" element={<LandingPage />}></Route>
        <Route
          path="/Admin"
          element={<Protected Component={AdminProfile} />}
        ></Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
    </div>
  );
}

export default App;
