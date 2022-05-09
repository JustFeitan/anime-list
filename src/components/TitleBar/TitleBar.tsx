import React, {FC} from 'react';
import Slider from "react-slick";
import './TitleBar.scss';

interface TitleBarProps<T> {
    title: string;
    img: string;
    items: T[];
    renderItem: (item: T) => React.ReactNode
}

export default function TitleBar<T>({title, img, items, renderItem}: TitleBarProps<T>) {
        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 5,
            slidesToScroll: 3,
            arrows: false,
            className: 'slider'
        }
        return (
            <div className='slider-bar'>
                <img src={img} alt=""/>
                <div className="slider-bar__title-bar">
                    <h1 className='slider-bar__title'>{title}</h1>
                </div>
                <Slider {...settings}>
                    {/*<div>*/}
                    {/*    <h1>1</h1>*/}
                    {/*</div>*/}
                    {/*<div>*/}
                    {/*    <h1>1</h1>*/}
                    {/*</div>*/}
                    {/*<div>*/}
                    {/*    <h1>1</h1>*/}
                    {/*</div>*/}
                    {/*<div>*/}
                    {/*    <h1>1</h1>*/}
                    {/*</div>*/}
                    {/*<div>*/}
                    {/*    <h1>1</h1>*/}
                    {/*</div>*/}
                    {items.map(item => renderItem(item))}
                </Slider>


            </div>
        );
    };


