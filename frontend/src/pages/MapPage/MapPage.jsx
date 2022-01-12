import React,{useState} from 'react'
import MyGoogleMap from '../../components/MyGoogleMap'
import MyGoogleMap2 from '../../components/mapEndpoint/MyGoogleMap2'

import { Button,Input } from "@chakra-ui/react";


const MapPage = () => {
    const [showmap1, setshowmap1] = useState(true)
    const [showmap2, setshowmap2] = useState(false)
    const [latStart, setlatStart] = useState(null)
    const [lngStart, setlngStart] = useState(null)
  const [rideRadius, setrideRadius] = useState(null);
    const [latEnd, setlatEnd] = useState(null)
    const [lngEnd, setlngEnd] = useState(null)
    function handleNext() {
        setshowmap1(false)
        setshowmap2(true)
    }

        function handleSubmit() {
console.log(latStart,latEnd,lngStart,lngEnd, rideRadius)
        }
    return (
      <>
        {showmap1 && (
          <MyGoogleMap setlatStart={setlatStart} setlngStart={setlngStart} />
        )}
        {showmap2 && (
          <MyGoogleMap2 setlatEnd={setlatEnd} setlngEnd={setlngEnd} />
        )}
        {showmap1 && <Button onClick={handleNext}>next</Button>}
        {showmap2 && <Button onClick={handleSubmit}>submit</Button>}
        <Input placeholder="Choose distance radius" onChange={(event)=>setrideRadius(event.target.value)} />
      </>
    );
}

export default MapPage