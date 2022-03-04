import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';


const Rating = ({
    rateRange,
    rate,
    isShowCount
}) => {
    rate = rate || 0;

    const stars = Array.from({length: rateRange || 5}).map((_, index) => {
        
        if (index < rate && (rate - index) < 1 && (rate - index) > 0) {
            return FaStarHalfAlt;
        }
        if (index < rate) {
            return FaStar;
        }
        return FaRegStar;
    });

    return  <div className="stars">
        {
            stars.map((StarIcon, index) => {
                return <StarIcon key={index} color="#ffd149"/>
            })
        }
        <div className="count">({rate.toFixed(1)})</div>
  </div>
}

export default Rating;