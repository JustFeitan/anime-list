import React, {useRef} from 'react';
import Slider from "react-slick";
import './ContentBar.scss';
import LeftArrow from "../MySliderArrows/LeftArrow/LeftArrow";
import RightArrow from "../MySliderArrows/RightArrow/RightArrow";
import {Link} from "react-router-dom";
import MyPrimaryButton from "../buttons/MyPrimaryButton/MyPrimaryButton";

interface ContentBarProps<T> {
    title: string;
    img: string;
    items: T[];
    renderItem: (item: T) => React.ReactNode,
    slider: boolean
}

export default function ContentBar<T>({title, img, items, renderItem, slider}: ContentBarProps<T>) {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll:4,
        arrows: false,
    }

    const customSlide = useRef<Slider | null>(null);

    const nextSlide = () => {
        customSlide.current?.slickNext();
    }

    const prevSlide = () => {
        customSlide.current?.slickPrev();
    }
    return (
        <article className='slider-bar'>
            <div className="slider-bar__title-bar">
                <div className='slider-bar__title-img'>
                    <img src={img} alt=""/>
                    <Link to='/' className='slider-bar__title'>{title}</Link>
                </div>
                {slider &&
                    <div className='slider-bar__arrows'>
                        <LeftArrow onClick={prevSlide}/>
                        <RightArrow onClick={nextSlide}/>
                    </div>
                }
            </div>
            {slider
            ? <Slider ref={customSlide} {...settings} >
                    {items.map(item => renderItem(item))}
                </Slider>
            : <div className='no-slider-bar'>
                    <div className='no-slider-bar__list'>
                        {items.map(item => renderItem(item))}
                    </div>
                    <MyPrimaryButton>See more</MyPrimaryButton>
                </div>
            }



        </article>
    );
};


