import React, {useState} from 'react';
import {animeAPI} from "../../services/AnimeService";
import {IAnime} from "../../models/IAnime";
import AnimeItem from "../../components/AnimeItem/AnimeItem";
import ContentBar from "../../components/UI/ContentBar/ContentBar";
import {AnimeSeasonTypes} from "../../models/AnimeTypes";
import Loader from "../../components/UI/Loader/Loader";
import spring from '../../assets/spring.png';
import hot from '../../assets/hot.png';
import './HomePage.scss'

const HomePage = () => {
    const [limit, setLimit] = useState<number>(8);

    const {data: animes, isLoading, error} = animeAPI.useFetchAllAnimeQuery(limit);
    const {
        data: animeSpring,
        isLoading: isSpringAnimeIsLoading,
        error: springAnimeRError
    } = animeAPI.useFetchAnimeBySeasonQuery(AnimeSeasonTypes.SPRING);

    return (
        <section className='anime-main'>
            {isSpringAnimeIsLoading
                ? <Loader/>
                : <ContentBar title={'Anime'} img={spring} items={animeSpring as IAnime[]}
                              renderItem={(anime: IAnime) => <AnimeItem anime={anime} key={anime.title}/>}
                              slider={true}
                />
            }

            <div>
                {error && <h1>Ошибка загрузки тайтлов</h1>}
                {isLoading
                    ? <Loader/>
                    : <ContentBar title={'Popular'} img={hot} items={animes as IAnime[]}
                                  renderItem={(anime: IAnime) => <AnimeItem anime={anime} key={anime.title}/>}
                                  slider={false}
                    />
                }
            </div>
        </section>

    );
};

export default HomePage;
