import {IAnimeFilter} from "../models/IAnimeFilter";
import {FilterTypes} from "../models/FilterTypes";
import {AnimeSeasonTypes} from "../models/AnimeTypes";
import {useState} from "react";
import {useAction, useAppSelector} from "./redux";

export const useFilterWindow = (filterType: FilterTypes) => {
    const {filters} = useAppSelector(state => state.FilterReducer);
    const {addYear, resetYear, addSeason, removeYear, removeSeason, resetSeason} = useAction();
    const [isReset, setIsReset] = useState<boolean>(false);

    function filter(filterTitle: string | number) {
        switch (filterType) {
            case FilterTypes.YEAR:
                if (filters.year.includes(filterTitle as number)) {
                    removeYear(filterTitle as number);
                } else {
                    addYear(filterTitle as number);
                }
                break;
            case FilterTypes.SEASON:
                const season = (filterTitle as string).toUpperCase() as AnimeSeasonTypes;
                console.log('season work')
                if (filters.season.includes(season)) {
                    removeSeason(season);
                } else {
                    addSeason(season);
                }
                break;
        }
    }

    function reset() {
        if (!isReset) return;
        switch (filterType) {
            case FilterTypes.YEAR:
                resetYear();
                break;
            case FilterTypes.SEASON:
                resetSeason();
                break;
        }
        setIsReset(false);
    }

    return {filters, filter, isReset, setIsReset, reset};
}
