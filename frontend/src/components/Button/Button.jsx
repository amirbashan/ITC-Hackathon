import React from 'react'
import './Button.css';

const Button = ({text,isGrow}) => {
    console.log(isGrow)
    return (
        <button style={{flexGrow: isGrow ? 1 : 0,alignSelf:isGrow ? "auto" : 'stretch'}} className="bold button">
            {text}
        </button>
    )
}

export default Button
