import {FilterTypes} from "../models/FilterTypes";
import {AnimeSeasonTypes} from "../models/AnimeTypes";
import {useState} from "react";
import {IAnimeFilter} from "../models/IAnimeFilter";

export const useAnimeFilterWindow = () => {

    const [filters, setFilters] = useState<IAnimeFilter>({season: [], year: [], tags: [], type: []});

    function filter(filterTitle: any, filterType: FilterTypes) {
        switch (filterType) {
            case FilterTypes.YEAR:
                if (filters.year.includes(filterTitle as number)) {
                    setFilters({...filters, year: filters.year.filter(year => year !== filterTitle as number)});
                } else {
                    setFilters({...filters, year: [...filters.year, filterTitle as number]});
                }
                break;
            case FilterTypes.SEASON:
                const season = (filterTitle as string).toUpperCase() as AnimeSeasonTypes;
                if (filters.season.includes(season)) {
                    setFilters({...filters, season: filters.season.filter(season => season !== season)});
                } else {
                    setFilters({...filters, season: [...filters.season, season]});
                }
                break;
            case FilterTypes.TYPE:
                if (filters.type.includes(filterTitle)) {
                    setFilters({...filters, type: filters.type.filter(type => type !== filterTitle)});
                } else {
                    setFilters({...filters, type: [...filters.type, filterTitle]});
                }
                break;
            case FilterTypes.GENERS:
                if (filters.tags.includes(filterTitle)) {
                    setFilters({...filters, tags: filters.tags.filter(tags => tags !== filterTitle)});
                } else {
                    setFilters({...filters, tags: [...filters.tags, filterTitle]});
                }
                break;
        }
    }

    function reset(filterType: FilterTypes) {
        switch (filterType) {
            case FilterTypes.YEAR:
                setFilters({...filters, year: []});
                break;
            case FilterTypes.SEASON:
                setFilters({...filters, season: []});
                break;
            case FilterTypes.GENERS:
                setFilters({...filters, tags: []});
                break;
            case FilterTypes.TYPE:
                setFilters({...filters, type: []});
                break;
        }
    }

    return {filters, filter, reset};
}
