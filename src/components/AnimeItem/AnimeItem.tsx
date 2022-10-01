import React, {FC, memo} from 'react';
import {IAnime} from "../../models/IAnime";
import './AnimeItem.scss'
import {useNavigate} from "react-router-dom";


interface AnimeItemProps {
    anime: IAnime
}


const AnimeItem: FC<AnimeItemProps> = memo(({anime}) => {

    const navigate = useNavigate();
    const animeTitle = anime.title;
    const ImgStyles = {
        backgroundImage: `url(${anime.picture})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        minHeight: 275,
    }

    return (
        <article className='anime-item' onClick={() => navigate(`/anime/${animeTitle}`,{state: {from:animeTitle}})}>
            <div style={ImgStyles} className='anime-item__img'>
                <div className="anime-item__description" >
                    <div className="anime-item__title">
                        {anime.title}
                    </div>
                    <div className="anime-item__data">
                        <div className='anime-item__geners'>
                            {/*Generes*/}
                            {anime.tags.slice(0,3).join(' / ')}
                        </div>
                        <span>{anime.type}</span>
                        <span>{anime.animeSeason.year}</span>
                    </div>
                </div>
            </div>
        </article>
    );
});

export default AnimeItem;
