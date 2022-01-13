import React from 'react';
import UserRating from '../UserRating/UserRating';
import './RideTile.css';

const RideTile = ({name,rating,duration,price}) => {
    return (
        <div className="ride-tile">
            <div className="ride-info">
                <div className="passenger">
                    <p className="bold">Ride with {name}</p>
                    {rating &&
                    <UserRating stars={rating}/>
                    }
                </div>
                <div className="duration">
                    <p className="bold">Ride duration</p>
                    <p className="gray">{duration}</p>
                </div>
                <div className="price">
                    <p className="bold">Ride price</p>
                    <p className="gray">{price}$</p>
                </div>
            </div>
            <div className="ride-save">
                <p>You will save 45$ on this shared ride</p>
            </div>
        </div>
    )
}

export default RideTile
