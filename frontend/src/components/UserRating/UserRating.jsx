import React from 'react'
import {ReactComponent as StarSvg} from '../../assets/star.svg';
import './UserRating.css';

const UserRating = ({stars}) => {
    return (
        <div className="user-rating">
            <span>{stars}</span>
            <StarSvg/>
        </div>
    )
}

export default UserRating
