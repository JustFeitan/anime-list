import React, {FC, useState} from 'react';
import {animeAPI} from "../../Services/AnimeService";
import List from "../../components/List/List";
import {ListTypes} from "../../models/ListTypes";
import {IAnime} from "../../models/IAnime";
import AnimeItem from "../../components/AnimeItem/AnimeItem";
import Loader from "../../components/UI/Loader/Loader";
import {useAnimeBySeason} from "../../hooks/useAnimeBySeason";
import {IAnimeFilter} from "../../models/IAnimeFilter";
import './AnimePage.scss'
import AnimeFilter from "../../components/AnimeFilter/AnimeFilter";
import {FilterTypes} from "../../models/FilterTypes";
import {useFilterWindow} from "../../hooks/useFilterWindow";

const AnimePage: FC = () => {
    const yearFilters = [
        2012,
        2013,
        2014,
        2015,
        2016,
        2017,
        2018,
        2019,
        2020,
        2021,
        2022,
    ];
    const seasonFilters = [
        'Spring',
        'Summer',
        'Winter',
        'Fall',
    ];
    const {data: animes, isLoading, error} = animeAPI.useFetchAllAnimeQuery(-1);


    const [filters, setFilters] = useState<IAnimeFilter>({season: [], year: []})
    const filteredAnime = useAnimeBySeason(animes as IAnime[], filters);



    return (
        <div>
            <div className='filter'>
                <AnimeFilter filterList={yearFilters}
                             filterName={'Years'}
                             setFilters={setFilters}
                             filterType={FilterTypes.YEAR}/>
                <AnimeFilter filterList={seasonFilters} filterName={'Seasons'} setFilters={setFilters}
                             filterType={FilterTypes.SEASON}/>
            </div>
            {isLoading
                ? <Loader/>
                : <List type={ListTypes.ANIME} items={filteredAnime as IAnime[]}
                        renderItem={(anime: IAnime, index) => <AnimeItem anime={anime} key={anime.title + index}/>}/>
            }
        </div>
    );
};

export default AnimePage;
