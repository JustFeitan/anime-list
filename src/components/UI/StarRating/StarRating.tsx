import React, {FC, useState} from 'react';
import {BsStar, BsStarFill, BsStarHalf} from "react-icons/bs";
import './StarRating.scss';

interface StarRatingProps {
    onRatingChange?: (rate: number) => void;
    rate?: number | null;
    starCount?: number;
    size?: string;
    emptyStarIcon?: JSX.Element;
    halfStarIcon?: JSX.Element;
    fillStarIcon?: JSX.Element;
    color?: string;
}

const StarRating: FC<StarRatingProps> = ({
                                             onRatingChange,
                                             rate ,
                                             size = 25,
                                             starCount = 5,
                                             color = 'darkblue',
                                             emptyStarIcon = <BsStar size={size} color={color}/>,
                                             fillStarIcon = <BsStarFill size={size} color={color}/>,
                                             halfStarIcon = <BsStarHalf size={size} color={color}/>,

                                         }) => {
    const [rating, setRating] = useState<number>(rate || -1);
    const [visualRating, setVisualRating] = useState<number>(rating);

    console.log(rate, rating)
    const onStarHover = (index: number) => {
        setVisualRating(index)
    }

    const onMouseOutFromStar = () => {
        setVisualRating(rating)
    }

    const onStarClick = (index: number) => {
        setRating(index);
        if (onRatingChange) {
            onRatingChange(index + 1);
        }
    }
    return (
        <div className='rating-stars'>
            {
                Array.from(Array(starCount)).map((value, index) =>
                    <span
                        onMouseOver={() => onStarHover(index)}
                        onMouseOut={onMouseOutFromStar}
                        onClick={() => onStarClick(index)}
                        key={index}
                    >
                        {
                            index <= visualRating
                                ? fillStarIcon
                                : emptyStarIcon
                        }
                    </span>
                )
            }
        </div>
    );
};

export default StarRating;
