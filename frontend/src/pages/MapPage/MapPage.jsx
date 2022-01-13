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
      navigate( {pathname: '/results',
      search: `?lat=${latStart}&lng=${lngEnd}`})
      console.log(rideData);
    }
     navigate({
       pathname: "/results",
       search: `?lat=${latStart}&lng=${lngEnd}`,
     });
     console.log(rideData);
  }
  return (
    <div id="mapPage">
      {showmap1 && (
        <MyGoogleMap setlatStart={setlatStart} setlngStart={setlngStart} />
      )}
      {showmap2 && <MyGoogleMap2 setlatEnd={setlatEnd} setlngEnd={setlngEnd} />}
      {showmap1 && <Button onClick={handleNext}>next</Button>}
      {showmap2 && (
        <Button
          onClick={() => {
            setshowmap2(false);
          }}
        >
          next
        </Button>
      )}
      {!showmap1 && !showmap2 && (
        <>
          <Input
            type="time"
            placeholder="Choose ride time "
            onChange={(event) => {
              setrideTime(event.target.value);
            }}
          />
          <Button onClick={handleSubmit}>Just Search</Button>
          <Button onClick={handlePost}>Post my rid for matches</Button>
        </>
      )}
    </div>
  );
};

export default MapPage;
