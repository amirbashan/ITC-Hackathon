import React from 'react'
import './Input.css';

const Input = ({change,value,type,placeholder}) => {
    return (
        <input className="forminput" type={type} placeholder={placeholder} onChange={(e) => change(e.target.value)} />
    )
}

export default Input
