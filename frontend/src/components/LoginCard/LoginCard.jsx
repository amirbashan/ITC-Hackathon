import "./LoginCard.css";
import Input from "../Input/Input";
import RoundButton from "../RoundButton/RoundButton";
import React, { useState } from "react";
import { login } from "../../lib/api";

export default function LoginCard() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email && password) {
      try {
        const data = await login(email, password);
      } catch (error) {
        alert(error.response.data.message);
      }
    }
  };

  return (
    <form id="loginCard" onSubmit={(e) => handleSubmit(e)}>
      <Input type="email" placeholder="Your Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <div id="formControl">
        <div className="signup-line">
          <p className="bold">Sign In</p>
          <RoundButton />
        </div>
        <div className="signin-line">
          <p className="bold">Sign Up</p>
        </div>
      </div>
    </form>
  );
}
