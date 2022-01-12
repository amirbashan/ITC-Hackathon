import "./LoginCard.css";
import Input from "../Input/Input";
import RoundButton from "../RoundButton/RoundButton";
import React, { useState } from "react";
import { loginUser } from "../../lib/AllDB";

export default function LoginCard() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleOnSubmit = async (e) => {
    try {
      e.preventDefault();
      const user = {
        email: email,
        password: password,
      };
      const res = await loginUser(user);
      setEmail("");
      setPassword("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form id="loginCard" onSubmit={(e) => handleOnSubmit(e)}>
      <Input type="email" onChange={(e) => handleEmailChange(e)} placeholder="Your Email" value={email} required />
      <Input type="password" name="password" autoComplete="on" onChange={(e) => handlePasswordChange(e)} value={password} placeholder="Password" required />
      <button type="submit" className="btn btn-sm btn-primary round-button bold">
        Log In
      </button>

      {/* <div id="formControl">
        <div className="signup-line">
          <p className="bold">Sign In</p>
          <RoundButton />
        </div>
        <div className="signin-line">
          <p className="bold">Sign Up</p>
        </div>
      </div> */}
    </form>
  );
}
