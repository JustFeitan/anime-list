import {useMemo} from "react";
import {AnimeSeasonTypes} from "../models/AnimeTypes";
import {IAnime} from "../models/IAnime";
import {IAnimeFilter} from "../models/IAnimeFilter";
import {FilterTypes} from "../models/FilterTypes";

export const useAnimeBySeason = (animes: IAnime[], filters: IAnimeFilter) => {
    return useMemo(() => {
        if (!animes) return animes;
        for (let filter in filters) {
            switch (filter) {
                case FilterTypes.SEASON:
                    if (filters.season.length) {
                        animes = animes!.filter((anime) => filters.season.includes(anime.animeSeason.season));
                    }
                    break;
                case FilterTypes.YEAR:
                    if (filters.year.length) {
                        animes = animes!.filter((anime) => filters.year.includes(anime.animeSeason.year));
                    }
                    break;
            }
        }
        return animes;

    }, [animes, filters])

}
