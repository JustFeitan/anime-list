import {useMemo} from "react";
import {AnimeSeasonTypes} from "../models/AnimeTypes";
import {IAnime} from "../models/IAnime";

export const useAnimeBySeason = (animes: IAnime[], filters: { season: AnimeSeasonTypes[], year: number[] }) => {
    return useMemo(() => {
        if (!animes) return animes;
        for (let filter in filters) {
            switch (filter) {
                case 'season':
                    if (filters.season.length) {
                        animes = animes!.filter((anime) => filters.season.includes(anime.animeSeason.season));
                    }
                    break;
                case 'year':
                    if (filters.year.length) {
                        animes = animes!.filter((anime) => filters.year.includes(anime.animeSeason.year));
                    }
                    break;
            }
        }
        return animes;

    }, [animes, filters])

}
