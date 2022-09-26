import {IAnimeFilter} from "../models/IAnimeFilter";
import {useMemo} from "react";
import {QueryFilterPage} from "../models/QueryFilterPage";
import {FilterTypes} from "../models/FilterTypes";

export const useAnimeQueryParams = (filters: IAnimeFilter, page: number, limit: number = 15) => {
    const queryFilter = useMemo(() => {
        const queryParams: QueryFilterPage = {
            query: '',
            page: page,
            limit: limit,
        }
        const tempFil: string[] = [];
        for (const filter in filters) {
            switch (filter) {
                case FilterTypes.YEAR:
                    filters.year.map(item => {
                        tempFil.push(`animeSeason.year=${item}`)
                    })
                    break;
                case FilterTypes.SEASON:
                    filters.season.map(item => {
                        tempFil.push('animeSeason.season=' + item)
                    })
                    break;
                case FilterTypes.TYPE:
                    filters.type.map(item => {
                        tempFil.push('type=' + item)
                    })
                    break;
                case FilterTypes.GENERS:
                    filters.tags.map(item => {
                        tempFil.push('tags_like=' + item)
                    })
                    break;
            }
        }
        queryParams.query = tempFil.join('&');
        console.log(queryParams.query)
        return queryParams;
    }, [filters, page, limit])
    return queryFilter;
}

