import React from 'react'
import {ReactComponent as TaxiSvg} from '../../assets/taxi.svg';
import Button from '../../components/Button/Button';

import './StartPage.css';

const StartPage = () => {
    return (
        <div id="startPage">
                <TaxiSvg className="taxi-wrapper"/>
                <p className="bold">Our application allows you to save money by sharing your cab with someone near you. We’ve helped over 643 people and saved over 321,489$</p>
                <div className="lower-navigation">
                    <Button text="Continue to sign up"/>
                    <p className="bold gray">Join now and start saving from the first ride.</p>
                </div>
        </div>
    )
}

export default StartPage