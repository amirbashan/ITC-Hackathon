import React, { useState, useContext } from "react"; 
import MapContext from '../MapContext'
const {latStart,
    lngStart,
    latEnd,
    lngEnd } = useContext(MapContext)
export default function RideSubmission() {
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
