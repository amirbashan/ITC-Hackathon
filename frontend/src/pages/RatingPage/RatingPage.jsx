import React,{useState} from 'react'
import './RatingPage.css'
import {ReactComponent as StarSvg} from '../../assets/star.svg';
import StarRatings from 'react-star-ratings';

const RatingPage = () => {
    const [rating, setRating] = useState(0)

    const handleRating = (stars) => {
        setRating(stars)
    }

    console.log()
    return (
        <div id="ratingPage">
            <h3 className="bold rating-text">Rate the person you shared the cab with
            </h3>
            <StarRatings
                rating={rating}
                starRatedColor="#FFCB45"
                starHoverColor="#FFCB45"
                changeRating={handleRating}
                numberOfStars={5}
                name='rating'
            />
        </div>
    )
}

export default RatingPage
