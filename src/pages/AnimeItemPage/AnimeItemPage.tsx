import React, {useState} from 'react';
import {useLocation} from "react-router-dom";
import {IAnime} from "../../models/IAnime";
import {animeAPI} from "../../services/AnimeService";
import Loader from "../../components/UI/Loader/Loader";
import './AnimeItemPage.scss';

const AnimeItemPage = () => {

    const location = useLocation();
    const state = location.state as {from: string}
    const animeTitle = state.from;

    const {data: anime, isLoading, error} = animeAPI.useFetchAnimeByTitleQuery(animeTitle);


    return (
        <section>

            {error
                ? <div>Error</div>
                :   isLoading
                    ? <Loader/>
                    : anime
                        ?
                    <div className='anime'>

                        <h1 className='anime-title'>{anime[0].title}</h1>
                        <div className='anime__main'>
                            <img src={anime[0].picture} alt=""/>
                            <div className='anime__description'>
                                <h2>Description</h2>
                                <span className='anime-geners'>{anime[0].tags.slice(1,4).join(' ')}</span>
                                <p>
                                    Something from data base i don't have(
                                </p>
                            </div>
                        </div>

                    </div>
                        :null

            }

        </section>
    );
};

export default AnimeItemPage;
