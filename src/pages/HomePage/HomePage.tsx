import React, {useState} from 'react';
import List from "../../components/List/List";
import {animeAPI} from "../../Services/AnimeService";
import {IAnime} from "../../models/IAnime";
import AnimeItem from "../../components/AnimeItem/AnimeItem";
import {ListTypes} from "../../models/ListTypes";
import TitleBar from "../../components/TitleBar/TitleBar";
import {AnimeSeasonTypes} from "../../models/AnimeTypes";
import {useAnimeBySeason} from "../../hooks/useAnimeBySeason";

const HomePage = () => {
    const [limit, setLimit] = useState<number>(8);
    const [page, setPage] = useState<number>(0);
    const [filters, setFilters] = useState({season: AnimeSeasonTypes.FALL || '', year: 2012})
    const {data: animes, isLoading, error} = animeAPI.useFetchAllAnimeQuery(limit);
    const {data: animeSpring, isLoading: springAnimeIsLoading, error: springAnimeRError} = animeAPI.useFetchAnimeBySeasonQuery(AnimeSeasonTypes.SPRING)

    const springAnime = useAnimeBySeason(animes as IAnime[], filters); // филтрация
    return (
        <div>
            {animeSpring &&
                <TitleBar title={'Anime'} img={'IMG'} items={animeSpring}
                          renderItem={(anime: IAnime) => <AnimeItem anime={anime} key={anime.title}/>}/>}

            <div style={{width: '80%'}}>
                {isLoading && <h1>loading...</h1>}
                {animes &&
                    <List items={animes as IAnime[]}
                          type={ListTypes.ANIME}
                          renderItem={(anime: IAnime) => <AnimeItem anime={anime} key={anime.title}/>}
                    />
                }
            </div>
        </div>

    );
};

export default HomePage;
