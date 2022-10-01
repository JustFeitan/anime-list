import {IAnimeFilter} from "../models/IAnimeFilter";
import {useMemo} from "react";
import {FilterTypes} from "../models/FilterTypes";


export const useMySearchParams = (filters: IAnimeFilter, searchParams: URLSearchParams) => {

    return useMemo(() => {
        // ADD TYPE!!!!!!!!!!!!!!!!!!!!!!!!!!!!


        const mySearchParams: { year: string[], season: string[], type: string[], tags: string[] } = {
            year: [],
            tags: [],
            season: [],
            type: [],
        };

        for (const filterKey in filters) {
            switch (filterKey) {
                case FilterTypes.YEAR:
                    mySearchParams.year = filters.year
                    break;
                case FilterTypes.SEASON:
                    mySearchParams.season = filters.season;
                    break;
                case FilterTypes.TYPE:
                    mySearchParams.type = filters.type;
                    break;
                case FilterTypes.GENRES:
                    mySearchParams.tags = filters.tags;
                    break;
            }
        }

        return mySearchParams;
    }, [filters, searchParams]);

}
