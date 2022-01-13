import React from "react";
import { ReactComponent as TaxiSvg } from "../../assets/taxi.svg";
import Button from "../../components/Button/Button";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./StartPage.css";

const StartPage = () => {
  const navigate = useNavigate();
  //   const handleClick = () => navigate(`signup`);

  return (
    <div id="startPage">
      <div className="desktop-wrapper">
      <TaxiSvg className="taxi-wrapper" />
      <p className="bold">
        Our application allows you to save money by sharing your cab with someone near you. We’ve helped over 643 people and saved over 321,489$
      </p>
      <div className="lower-navigation">
        {/* <Button onClick={handleClick} text="Continue to sign up" /> */}
        <Link to="/signup"                      className="round-button">
          Continue to sign up
        </Link>
        <p className="bold gray">Join now and start saving from the first ride.</p>
      </div>
      </div>
    </div>
  );
};

export default StartPage;
