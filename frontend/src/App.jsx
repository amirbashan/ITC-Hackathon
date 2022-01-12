import "./App.css";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import MapPage from "./pages/MapPage";
import StartPage from "./pages/StartPage";
import ResultsPage from "./pages/ResultsPage";
import RatingPage from "./pages/RatingPage";

import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<StartPage />}></Route>
        <Route path="/signup" element={<RegisterPage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        {/* <Route path="/map" element={<MapPage />}></Route> */}
        <Route path="/results" element={<ResultsPage />}></Route>
        <Route path="/rating" element={<RatingPage />}></Route>
        <Route path="/map" element={<MapPage/>}></Route>
      </Routes>
    </>
  );
}

export default App;
