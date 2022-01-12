import React, { useState, useContext } from "react"; 
import MapContext from '../MapContext'

export default function RideSubmission() {
    const { latStart, lngStart, latEnd, lngEnd } = useContext(MapContext);
    async function handleSubmit(){
console.log (latStart,
    lngStart,
    latEnd,
    lngEnd)
    }
    return (
        <div>
            <button onClick={handleSubmit}>Find me a partner</button>
        </div>
    )
}
