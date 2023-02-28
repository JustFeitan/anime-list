import React, { FC, useEffect, useMemo, useState } from "react";
import ReactPaginate from "react-paginate";
import { useSearchParams } from "react-router-dom";

import AnimeItem from "../../components/AnimeItem/AnimeItem";
import FilterWindow from "../../components/FilterWindow/FilterWindow";
import List from "../../components/UI/Lists/List/List";
import Loader from "../../components/UI/Loader/Loader";

import { animeAPI } from "../../services/AnimeService";

import { AnimeFilterData } from "../../data/AnimeFilterData";
import { useAnimeFilterWindow } from "../../hooks/useAnimeFilterWindow";
import { useAnimeQueryParams } from "../../hooks/useAnimeQueryParams";
import { useMySearchParams } from "../../hooks/useMySearchParams";
import { FilterTypes } from "../../models/FilterTypes";
import { IAnime } from "../../models/IAnime";
import { IAnimeFilter } from "../../models/IAnimeFilter";
import { ListTypes } from "../../models/ListTypes";
import { pageCount } from "../../utils/pageCount/pageCount";
import "./AnimesPage.scss";

const { typeFilter, yearFilters, seasonFilters, genresFilters } =
    AnimeFilterData;

const AnimesPage: FC = () => {
    //Main filter state
    const [filters, setFilters] = useState<IAnimeFilter>({
        season: [],
        year: [],
        tags: [],
        type: [],
    });
    //Local filter state for using inside modal window
    const { filters: windowFilters, filter, reset } = useAnimeFilterWindow();

    const [searchParams, setSearchParams] = useSearchParams();
    const mySearchParams = useMySearchParams(filters, searchParams);

    console.log(mySearchParams);

    const [page, setPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number | null>(null);

    const queryParams = useAnimeQueryParams(mySearchParams, page);
    const {
        data: filteredQuery,
        isLoading,
        refetch,
        status,
    } = animeAPI.useFetchAnimeByFilterQuery(queryParams);

    //!!!Combine totalPagesCount and useEffect
    const totalPagesCount = useMemo(() => {
        if (isLoading) return;
        return pageCount(filteredQuery!.totalCount);
    }, [filteredQuery]);

    useEffect(() => {
        setTotalPages(totalPagesCount as number);
    }, [totalPagesCount]);

    useEffect(() => {
        refetch();
    }, [page]);

    useEffect(() => {
        setPage(1);
        refetch();
        setSearchParams(filters, { replace: true });
    }, [filters]);

    const resetHandler = (filterType: FilterTypes) => {
        reset(filterType);
        setFilters(windowFilters);
    };

    const acceptHandler = () => {
        setFilters(windowFilters);
    };

    const changePageHandler = (selectedItem: { selected: number }) => {
        setPage(selectedItem.selected + 1);
        console.log(selectedItem.selected + 1);
    };

    return (
        <div className="container">
            <div className="filter">
                <FilterWindow
                    filterList={typeFilter}
                    filterName={"Types"}
                    filterType={FilterTypes.TYPE}
                    filter={filter}
                    resetHandler={resetHandler}
                    acceptHandler={acceptHandler}
                />
                <FilterWindow
                    filterList={genresFilters}
                    filterName={"Genres"}
                    filterType={FilterTypes.GENRES}
                    filter={filter}
                    resetHandler={resetHandler}
                    acceptHandler={acceptHandler}
                />
                <FilterWindow
                    filterList={yearFilters}
                    filterName={"Years"}
                    filterType={FilterTypes.YEAR}
                    filter={filter}
                    resetHandler={resetHandler}
                    acceptHandler={acceptHandler}
                />
                <FilterWindow
                    filterList={seasonFilters}
                    filterName={"Season"}
                    filterType={FilterTypes.SEASON}
                    filter={filter}
                    resetHandler={resetHandler}
                    acceptHandler={acceptHandler}
                />
            </div>
            <div className="filter__result">
                {isLoading ? (
                    <Loader />
                ) : (
                    <>
                        {filteredQuery && (
                            <List
                                type={ListTypes.ANIME}
                                items={filteredQuery.response as IAnime[]}
                                renderItem={(anime: IAnime, index) => (
                                    <AnimeItem anime={anime} key={index} />
                                )}
                            />
                        )}

                        <ReactPaginate
                            className="pagination"
                            activeClassName="pagination--active"
                            pageLinkClassName="pagination__link"
                            pageCount={totalPages as number}
                            onPageChange={changePageHandler}
                            onPageActive={acceptHandler}
                        />
                    </>
                )}
            </div>
        </div>
    );
};

export default AnimesPage;
