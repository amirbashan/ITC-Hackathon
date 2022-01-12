import React, { useState } from "react";
import "./RegisterCard.css";
import Input from "../Input/Input";
import { signUpUser } from "../../lib/AllDB";
import "./RoundButton.css";
import { useNavigate } from "react-router-dom";

export default function RegisterCard() {
  const navigate = useNavigate();
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
        passwordConfirm: passConfirm,
        name: name,
        phone: phone,
      };
      console.log(newUser);
      const response = await signUpUser(newUser);
      setName("");
      setEmail("");
      setPassword("");
      setPassConfirm("");
      setPhone("");
      if (response.status === "success") {
        navigate(`/map`);
        alert(response);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form id="registerCard" onSubmit={(e) => handleOnSubmit(e)}>
      <input type="text" className="form-input" onChange={(e) => handleNameChange(e)} value={name} placeholder="Name" maxLength="30" required />
      <input type="email" className="form-input" onChange={(e) => handleEmailChange(e)} value={email} placeholder="Email Address" maxLength="100" required />
      <input type="Password" className="form-input" onChange={(e) => handlePassChange(e)} value={password} placeholder="Password" maxLength="250" required />
      <input
        type="Password"
        className="form-input"
        onChange={(e) => handlePassConfirmChange(e)}
        value={passConfirm}
        placeholder="Confirm Password"
        maxLength="250"
        required
      />
      <input type="text" className="form-input" onChange={(e) => handlePhoneChange(e)} value={phone} maxLength="20" placeholder="Phone Number" required />
        <div className="signup-line">
          <button type="submit" disabled={password !== passConfirm} className="btn btn-sm btn-primary round-button bold">
            Sign Up
          </button>
          {password !== passConfirm && <span className="text-danger font-size-sm">Those passwords don't match</span>}
        </div>
    </form>
  );
}
