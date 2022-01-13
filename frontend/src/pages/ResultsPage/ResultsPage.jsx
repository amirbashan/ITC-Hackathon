import React from 'react'
import './ResultsPage.css';
import RideTile from '../../components/RideTile/RideTile';
import Button from '../../components/Button/Button';

const ResultsPage = () => {
    return (
        <>
        <div id="resultsPage">
         <div id="resultsList">
            <RideTile name="Muhammad" rating="4.8" price="130" duration="1h30m"/>
            <RideTile name="Muhammad" rating="4.8" price="130" duration="1h30m"/>
            <RideTile name="Muhammad" rating="4.8" price="130" duration="1h30m"/>
            <RideTile name="Muhammad" rating="4.8" price="130" duration="1h30m"/>
            <RideTile name="Muhammad" rating="4.8" price="130" duration="1h30m"/>
            <RideTile name="Muhammad" rating="4.8" price="130" duration="1h30m"/>
            <RideTile name="Muhammad" rating="4.8" price="130" duration="1h30m"/>
         </div>
        </div>
        <div className="cancel-container">
            <Button isGrow={true} text="Cancel"/>
         </div>
        </>
    )
}

export default ResultsPage