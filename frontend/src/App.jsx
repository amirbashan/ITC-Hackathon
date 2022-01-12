import "./App.css";

import MiniNav from "./components/MiniNav";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import MapPage from "./pages/MapPage/MapPage";
import StartPage from "./pages/StartPage/StartPage";
import ResultsPage from "./pages/ResultsPage/ResultsPage";
import RatingPage from "./pages/RatingPage/RatingPage";
import Navbar from "./components/Navbar/Navbar";

import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      {/* <Navbar /> */}
      <MiniNav />
      <Routes>
        <Route path="/" element={<StartPage />}></Route>
        <Route path="/signup" element={<RegisterPage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/results" element={<ResultsPage />}></Route>
        <Route path="/rating" element={<RatingPage />}></Route>
        <Route path="/map" element={<MapPage />}></Route>
      </Routes>
    </>
  );
}

export default App;
