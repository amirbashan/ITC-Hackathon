import React, { useState } from "react";
import "./RegisterCard.css";
import Input from "../Input/Input";
import { signUpUser } from "../../lib/UsersDB";
import "./RoundButton.css";

export default function RegisterCard() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passConfirm, setPassConfirm] = useState("");
  const [phone, setPhone] = useState("");

  const handleNameChange = (e) => setName(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePassChange = (e) => setPassword(e.target.value);
  const handlePassConfirmChange = (e) => setPassConfirm(e.target.value);
  const handlePhoneChange = (e) => setPhone(e.target.value);

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      const newUser = {
        email: email,
        password: password,
        name: name,
        phone: phone,
      };
      const response = await signUpUser(newUser);
      setName("");
      setEmail("");
      setPassword("");
      setPassConfirm("");
      setPhone("");
      if (response) {
        // navigate(`/`);
        alert(response);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <form id="registerCard" onSubmit={(e) => handleOnSubmit(e)}>
        <Input type="text" onChange={(e) => handleNameChange(e)} value={name} placeholder="Name" maxLength="30" required />
        <Input type="email" onChange={(e) => handleEmailChange(e)} value={email} placeholder="Email Address" maxLength="100" required />
        <Input type="Password" onChange={(e) => handlePassChange(e)} value={password} placeholder="Password" maxLength="250" required />
        <Input type="Password" onChange={(e) => handlePassConfirmChange(e)} value={passConfirm} placeholder="Confirm Password" maxLength="250" required />
        <Input type="text" onChange={(e) => handlePhoneChange(e)} value={phone} maxLength="20" required />
        <div id="formControl">
          <div className="signup-line">
            <p className="bold">Sign Up</p>
            <button type="submit" id="roundButton" disabled={password !== passConfirm} className="btn btn-sm btn-primary ">
              Submit
            </button>
            {password !== passConfirm && <span className="text-danger font-size-sm">Those passwords don't match</span>}
          </div>
          <div className="signin-line">
            <p className="bold">Sign In</p>
          </div>
        </div>
      </form>
    </>
  );
}
