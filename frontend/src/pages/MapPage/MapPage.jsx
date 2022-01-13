import React, { useState } from "react";
import MyGoogleMap from "../../components/MyGoogleMap";
import MyGoogleMap2 from "../../components/mapEndpoint/MyGoogleMap2";
import { Button, Input } from "@chakra-ui/react";
import "./MapPage.css";
import { postRide } from "../../lib/AllDB";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";

const MapPage = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const [showmap1, setshowmap1] = useState(true);
  const [showmap2, setshowmap2] = useState(false);
  const [latStart, setlatStart] = useState(null);
  const [lngStart, setlngStart] = useState(null);
  const [rideTime, setrideTime] = useState(null);
  const [day, setDay] = useState(null);
  const [month, setMonth] = useState(null);
  const [year, setYear] = useState(null);
  const [latEnd, setlatEnd] = useState(null);
  const [lngEnd, setlngEnd] = useState(null);
  function handleNext() {
    setshowmap1(false);
    setshowmap2(true);
  }

  const fixTime = (year, month, day, time) => {
    let rideFix = year.toString() + "-";
    month < 10 ? (rideFix += "0" + month.toString() + "-") : (rideFix += month.toString() + "-");
    day < 10 ? (rideFix += "0" + day.toString()) : (rideFix += day.toString());
    rideFix += "T" + time + ":00.000Z";

    return rideFix;
  };

  function handleSubmit() {
    const rideFix = fixTime(year, month, day, rideTime);
    const rideData = {
      rideTime: rideFix,
      pickUp: { coordinates: [latStart, lngStart] },
      dropOff: { coordinates: [latEnd, lngEnd] },
    };
    console.log(rideFix);
  }
  async function handlePost() {
    const rideFix = fixTime(year, month, day, rideTime);
    const rideData = {
      rideTime: rideFix,
      pickUp: { coordinates: [lngStart, latStart] },
      dropOff: { coordinates: [lngEnd, latEnd] },
    };

    const res = await postRide(rideData);
    if (res) {
      console.log(res);
      navigate({
        pathname: "/results",
        search: `?lat=${latStart}&lng=${lngStart}&latEnd=${latEnd}&lngEnd=${lngEnd}`,
      });
      console.log(rideData);
    }
    navigate({
      pathname: "/results",
      search: `?lat=${latStart}&lng=${lngStart}&latEnd=${latEnd}&lngEnd=${lngEnd}`,
    });
    console.log(rideData);
  }
  return (
    <div id="mapPage">
      {showmap1 && <MyGoogleMap setlatStart={setlatStart} setlngStart={setlngStart} />}
      {showmap2 && <MyGoogleMap2 setlatEnd={setlatEnd} setlngEnd={setlngEnd} />}
      {showmap1 && (
        <div className="next-container">
          <Button
            sx={{
              backgroundColor: "#ffce54",
              color: "#fff",
              border: "none",
              textDecoration: "none",
              padding: "1rem",
              borderRadius: "1rem",
              display: "flex",
              justifyContent: "center",
              cursor: "pointer",
              fontSize: "1rem",
              flexGrow: 1,
              fontWeight: 700,
            }}
            onClick={handleNext}
          >
            Next
          </Button>
        </div>
      )}
      {showmap2 && (
        <div className="next-container">
          <Button
            onClick={() => {
              setshowmap2(false);
            }}
            sx={{
              backgroundColor: "#ffce54",
              color: "#fff",
              border: "none",
              textDecoration: "none",
              padding: "1rem",
              borderRadius: "1rem",
              display: "flex",
              justifyContent: "center",
              cursor: "pointer",
              fontSize: "1rem",
              flexGrow: 1,
              fontWeight: 700,
            }}
          >
            Next
          </Button>
        </div>
      )}
      {!showmap1 && !showmap2 && (
        <div className="timer-container desktop-wrapper center-margins">
          <Input
            type="time"
            placeholder="Choose ride time "
            sx={{
              "@media only screen and (max-width: 450px)": {
                fontSize: "60px",
                height: "100px",
              },
              fontSize: "100px",
              height: "200px",
              textAlign: "center",
            }}
            onChange={(event) => {
              setrideTime(event.target.value);
            }}
          />
          <div className="date-container">
              <input type="number" onChange={(e) => setDay(e.target.value)} value={day} placeholder="Day" className="form-control select-input " min="1" max="31" required />
              <input type="number" onChange={(e) => setMonth(e.target.value)} value={month} placeholder="Month" className="form-control select-input" min="1" max="12" required />
              <input
                type="number"
                onChange={(e) => setYear(e.target.value)}
                value={year}
                placeholder="Year"
                className="form-control select-input"
                min="2022"
                max="2027"
                required
              />
            </div>

          <Button
            sx={{
              backgroundColor: "#ffce54",
              color: "#fff",
              border: "none",
              textDecoration: "none",
              padding: "1rem",
              borderRadius: "1rem",
              display: "flex",
              justifyContent: "center",
              cursor: "pointer",
              fontSize: "1rem",
              flexGrow: 1,
              fontWeight: 700,
            }}
            onClick={handleSubmit}
          >
            Just Search
          </Button>
          <Button
            sx={{
              backgroundColor: "#ffce54",
              color: "#fff",
              border: "none",
              textDecoration: "none",
              padding: "1rem",
              borderRadius: "1rem",
              display: "flex",
              justifyContent: "center",
              cursor: "pointer",
              fontSize: "1rem",
              flexGrow: 1,
              fontWeight: 700,
            }}
            onClick={handlePost}
          >
            Post my ride for matches
          </Button>
        </div>
      )}
    </div>
  );
};

export default MapPage;
