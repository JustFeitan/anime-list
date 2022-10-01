import React, {useState} from 'react';
import {animeAPI} from "../services/AnimeService";
import {IAnimeFilter} from "../models/IAnimeFilter";
import {useAnimeBySeason} from "../hooks/useAnimeBySeason";
import {IAnime} from "../models/IAnime";
import FilterWindow from "../components/FilterWindow/FilterWindow";
import {FilterTypes} from "../models/FilterTypes";
import Loader from "../components/UI/Loader/Loader";
import List from "../components/Lists/List/List";
import {ListTypes} from "../models/ListTypes";
import AnimeItem from "../components/AnimeItem/AnimeItem";
import {useAnimeFilterWindow} from "../hooks/useAnimeFilterWindow";

const MangaPage = () => {

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



    return (
        <div>

        </div>
    );
};

export default MangaPage;
