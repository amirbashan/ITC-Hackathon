import React from "react";
import "./Input.css";

const Input = ({ onChange, value, type, placeholder }) => {
  return <input className="forminput" type={type} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} />;
};

export default Input;
