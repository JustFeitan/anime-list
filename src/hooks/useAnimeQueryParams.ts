import {IAnimeFilter} from "../models/IAnimeFilter";
import {useMemo} from "react";
import {QueryFilterPage} from "../models/QueryFilterPage";
import {FilterTypes} from "../models/FilterTypes";
import {useMySearchParams} from "./useMySearchParams";
import {IMySearchParams} from "../models/IMySearchParams";


export const useAnimeQueryParams = (mySearchParams: IMySearchParams, page: number, limit: number = 15) => {
    const queryFilter = useMemo(() => {

        const queryParams: QueryFilterPage = {
            query: '',
            page: page,
            limit: limit,
        }


        const tempFil: string[] = [];
        for (const mySearchParam in mySearchParams) {
            switch (mySearchParam) {
                case FilterTypes.YEAR:
                    if (!mySearchParams.year) break;
                    mySearchParams.year.map(item => {
                        tempFil.push(`animeSeason.year=${item}`)
                    })
                    break;
                case FilterTypes.SEASON:
                    mySearchParams.season.map(item => {
                        tempFil.push('animeSeason.season=' + item)
                    })
                    break;
                case FilterTypes.TYPE:
                    if (!mySearchParams.type) break;
                    mySearchParams.type.map(item => {
                        tempFil.push('type=' + item)
                    })
                    break;
                case FilterTypes.GENRES:
                    if (!mySearchParams.tags) break;
                    mySearchParams.tags.map(item => {
                        tempFil.push('tags_like=' + item)
                    })
                    break;
            }
        }

        queryParams.query = tempFil.join('&');
        console.log(queryParams.query)
        return queryParams;
    }, [mySearchParams, page, limit, ])
    return queryFilter;
}
