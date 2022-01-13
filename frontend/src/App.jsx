import "./App.css";
import { useLocation } from "react-router-dom";

import MiniNav from "./components/MiniNav/MiniNav";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import MapPage from "./pages/MapPage/MapPage";
import StartPage from "./pages/StartPage/StartPage";
import ResultsPage from "./pages/ResultsPage/ResultsPage";
import RatingPage from "./pages/RatingPage/RatingPage";
import Navbar from "./components/Navbar/Navbar";
import UserNav from './components/UserNav/UserNav';
import ProfilePage from "./pages/ProfilePage";

import { Routes, Route } from "react-router-dom";

function App() {
  const { pathname } = useLocation();

  return (
    <>
      {pathname === "/" || pathname === "/signup" || pathname === "/login" ? 
      <>
      <Navbar/>
      <MiniNav />
      </>
       : 
      <>
        <Navbar />
        <UserNav />
      </> }
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<StartPage />}></Route>
        <Route path="/signup" element={<RegisterPage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/results" element={<ResultsPage />}></Route>
        <Route path="/myprofile" element={<ProfilePage />}></Route>
        <Route path="/rating" element={<RatingPage />}></Route>
        <Route path="/map" element={<MapPage />}></Route>
      </Routes>
    </>
  );
}

export default App;
