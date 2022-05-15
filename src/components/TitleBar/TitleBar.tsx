import React, {useRef} from 'react';
import Slider from "react-slick";
import './TitleBar.scss';
import LeftArrow from "../UI/MySliderArrows/LeftArrow/LeftArrow";
import RightArrow from "../UI/MySliderArrows/RightArrow/RightArrow";
import {Link} from "react-router-dom";
import MyPrimaryButton from "../UI/buttons/MyPrimaryButton/MyPrimaryButton";

interface TitleBarProps<T> {
    title: string;
    img: string;
    items: T[];
    renderItem: (item: T) => React.ReactNode,
    slider: boolean
}

export default function SliderBar<T>({title, img, items, renderItem, slider}: TitleBarProps<T>) {
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
                    {items.map(item => renderItem(item))}
                    <MyPrimaryButton>See more</MyPrimaryButton>
                </div>
            }



        </article>
    );
};


