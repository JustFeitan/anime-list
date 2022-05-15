import React, {FC} from 'react';
import {IAnime} from "../../models/IAnime";
import './AnimeItem.scss'

interface AnimeItemProps {
    anime: IAnime
}


const AnimeItem: FC<AnimeItemProps> = ({anime}) => {
    const ImgStyles = {
        backgroundImage: `url(${anime.picture})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        minHeight: 275,
    }

    return (
        <article className='anime-item'>
            <div style={ImgStyles} className='anime-item__img'>
                <img src='' alt=""/>
                <div className="anime-item__description">
                    <div className="anime-item__title">
                        {anime.title}
                    </div>
                    <div className="anime-item__data">
                        <span>Episodes: {anime.episodes}</span>
                        <span>Season: {anime.animeSeason.season}</span>
                        <span>Year: {anime.animeSeason.year}</span>
                    </div>
                </div>
            </div>
        </article>
    );
};

export default AnimeItem;
