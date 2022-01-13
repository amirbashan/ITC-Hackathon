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
  const [latEnd, setlatEnd] = useState(null);
  const [lngEnd, setlngEnd] = useState(null);
  function handleNext() {
    setshowmap1(false);
    setshowmap2(true);
  }

  function handleSubmit() {
    const rideData = {
      rideTime: rideTime,
      pickUp: { coordinates: [latStart, lngStart] },
      dropOff: { coordinates: [latEnd, lngEnd] },
    };
    console.log(rideData);
  }
  async function handlePost() {
    const rideData = {
      rideTime: rideTime,
      pickUp: { coordinates: [latStart, lngStart] },
      dropOff: { coordinates: [latEnd, lngEnd] },
    };
    const res = await postRide(rideData);
    if (res) {
      console.log(res);
      //   alert("you succusfully posted a ride!");
      navigate(`/results`);
      console.log(rideData);
    }
  }
  return (
    <div id="mapPage">
      {showmap1 && 
      <MyGoogleMap setlatStart={setlatStart} setlngStart={setlngStart} />}
      {showmap2 && <MyGoogleMap2 setlatEnd={setlatEnd} setlngEnd={setlngEnd} />}
      {showmap1 && 
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
          flexGrow:1,
          fontWeight:700
          }}
          onClick={handleNext}>Next</Button>
        </div>
      }
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
            flexGrow:1,
            fontWeight:700
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
              '@media only screen and (max-width: 450px)':{
                fontSize:"60px",
                height:"100px"
              },
              fontSize: "100px",
              height: "200px",
              textAlign:"center"
            }}
            onChange={(event) => {
              setrideTime(event.target.value);
            }}
          />
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
            flexGrow:1,
            fontWeight:700
          }}
          onClick={handleSubmit}>Just Search</Button>
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
            flexGrow:1,
            fontWeight:700
          }}onClick={handlePost}>Post my ride for matches</Button>
        </div>
      )}
    </div>
  );
};

export default MapPage;
