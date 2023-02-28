import React, { useRef } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";

import LeftArrow from "../MySliderArrows/LeftArrow/LeftArrow";
import RightArrow from "../MySliderArrows/RightArrow/RightArrow";
import MyPrimaryButton from "../buttons/MyPrimaryButton/MyPrimaryButton";
import "./ContentBar.scss";

interface ContentBarProps<T> {
    onShowMoreButtonClick?: () => void;
    title: string;
    img?: string;
    items?: T[];
    renderItem?: (item: T) => React.ReactNode;
    slider: boolean;
}

export default function ContentBar<T>({
    title,
    img,
    items,
    renderItem,
    slider,
    onShowMoreButtonClick,
}: ContentBarProps<T>) {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        arrows: false,
        responsive: [
            {
                breakpoint: 1060,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 820,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    dots: false,
                },
            },
            {
                breakpoint: 540,
                settings: {
                    centerMode: true,
                    infinite: true,
                    centerPadding: "60px",
                    speed: 500,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: false,
                },
            },
            {
                breakpoint: 420,
                settings: {
                    centerMode: true,
                    infinite: true,
                    centerPadding: "40px",
                    speed: 500,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: false,
                },
            },
        ],
    };

    const customSlide = useRef<Slider | null>(null);

    const nextSlide = () => {
        customSlide.current?.slickNext();
    };

    const prevSlide = () => {
        customSlide.current?.slickPrev();
    };

    const onSeeMoreHandler = () => {
        if (onShowMoreButtonClick) {
            onShowMoreButtonClick();
        }
    };
    return (
        <article className="slider-bar">
            <div className="slider-bar__title-bar">
                <div className="slider-bar__title-img">
                    <img src={img} alt="" />
                    <h1 className="slider-bar__title">{title}</h1>
                </div>
                {slider && (
                    <div className="slider-bar__arrows">
                        <LeftArrow onClick={prevSlide} />
                        <RightArrow onClick={nextSlide} />
                    </div>
                )}
            </div>
            {slider ? (
                <Slider ref={customSlide} {...settings}>
                    {items &&
                        items.map((item) =>
                            renderItem ? renderItem(item) : null
                        )}
                </Slider>
            ) : (
                <div className="no-slider-bar">
                    <div className="no-slider-bar__list">
                        {items &&
                            items.map((item) =>
                                renderItem ? renderItem(item) : null
                            )}
                    </div>
                    {onShowMoreButtonClick && (
                        <MyPrimaryButton onClick={onSeeMoreHandler}>
                            See more
                        </MyPrimaryButton>
                    )}
                </div>
            )}
        </article>
    );
}
