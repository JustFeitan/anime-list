import React, {FC, memo} from 'react';
import {IAnime} from "../../models/IAnime";
import './AnimeItem.scss'
import {useNavigate} from "react-router-dom";
import AnimeCover from "../AnimeCover/AnimeCover";


interface AnimeItemProps {
    anime: IAnime
}


const AnimeItem: FC<AnimeItemProps> = memo(({anime}) => {

    const navigate = useNavigate();

    const goToCertainAnime = () => {
        navigate(`/anime/${anime.title}`,{state: {from:anime.title}})
    }

    return (
        <article className='anime-item' onClick={goToCertainAnime}>
            <AnimeCover anime={anime} minHeight={275}>
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
            </AnimeCover>
        </article>
    );
});

export default AnimeItem;
