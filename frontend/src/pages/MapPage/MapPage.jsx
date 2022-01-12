import React,{useState} from 'react'
import MyGoogleMap from '../../components/MyGoogleMap'
import MyGoogleMap2 from '../../components/mapEndpoint/MyGoogleMap2'
import { Button,Input } from "@chakra-ui/react";


const MapPage = () => {
    const [showmap1, setshowmap1] = useState(true)
    const [showmap2, setshowmap2] = useState(false)
    const [latStart, setlatStart] = useState(null)
    const [lngStart, setlngStart] = useState(null)
  const [rideTime, setrideTime] = useState(null);
    const [latEnd, setlatEnd] = useState(null)
    const [lngEnd, setlngEnd] = useState(null)
    function handleNext() {
        setshowmap1(false)
        setshowmap2(true)
    }

        function handleSubmit() {
console.log(latStart,latEnd,lngStart,lngEnd, rideTime)
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
        {showmap2 && <Button onClick={()=>{setshowmap2(false)}}>next</Button>}
       {!showmap1 && !showmap2 &&(
                <>
       <Input type="time" placeholder="Choose ride time " onChange={(event)=>{setrideTime(event.target.value)}} />
       <Button onClick={handleSubmit}>Submit </Button>
       </>)}
      </>
    );
}

export default MapPage