import { useCallback, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { AnimeSeasonTypes, AnimeTypes } from "../models/AnimeTypes";
import { FilterTypes } from "../models/FilterTypes";
import { IAnimeFilter } from "../models/IAnimeFilter";

export const useAnimeFilterWindow = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const year = searchParams.getAll("year");
    const season = searchParams.getAll("season") as AnimeSeasonTypes[];
    const type = searchParams.getAll("type") as AnimeTypes[];
    const tags = searchParams.getAll("tag");

    const [filters, setFilters] = useState<IAnimeFilter>({
        season: season || [],
        year: year || [],
        tags: tags || [],
        type: type || [],
    });

    const filter = useCallback(
        (filterTitle: any, filterType: FilterTypes) => {
            switch (filterType) {
                case FilterTypes.YEAR:
                    if (filters.year.includes(filterTitle)) {
                        setFilters({
                            ...filters,
                            year: filters.year.filter(
                                (year) => year !== filterTitle
                            ),
                        });
                    } else {
                        setFilters({
                            ...filters,
                            year: [...filters.year, filterTitle],
                        });
                    }
                    break;
                case FilterTypes.SEASON:
                    const season = (
                        filterTitle as string
                    ).toUpperCase() as AnimeSeasonTypes;
                    if (filters.season.includes(season)) {
                        setFilters({
                            ...filters,
                            season: filters.season.filter(
                                (season) => season !== season
                            ),
                        });
                    } else {
                        setFilters({
                            ...filters,
                            season: [...filters.season, season],
                        });
                    }
                    break;
                case FilterTypes.TYPE:
                    if (filters.type.includes(filterTitle)) {
                        setFilters({
                            ...filters,
                            type: filters.type.filter(
                                (type) => type !== filterTitle
                            ),
                        });
                    } else {
                        setFilters({
                            ...filters,
                            type: [...filters.type, filterTitle],
                        });
                    }
                    break;
                case FilterTypes.GENRES:
                    if (filters.tags.includes(filterTitle)) {
                        setFilters({
                            ...filters,
                            tags: filters.tags.filter(
                                (tags) => tags !== filterTitle
                            ),
                        });
                    } else {
                        setFilters({
                            ...filters,
                            tags: [...filters.tags, filterTitle],
                        });
                    }
                    break;
            }
        },
        [filters]
    );

    function reset(filterType: FilterTypes) {
        switch (filterType) {
            case FilterTypes.YEAR:
                setFilters({ ...filters, year: [] });
                break;
            case FilterTypes.SEASON:
                setFilters({ ...filters, season: [] });
                break;
            case FilterTypes.GENRES:
                setFilters({ ...filters, tags: [] });
                break;
            case FilterTypes.TYPE:
                setFilters({ ...filters, type: [] });
                break;
        }
    }

    return { filters, filter, reset };
};
