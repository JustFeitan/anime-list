import {useMemo} from "react";
import {AnimeSeasonTypes} from "../models/AnimeTypes";
import {IAnime} from "../models/IAnime";

export const useAnimeBySeason = (animes: IAnime[], filters: {season: AnimeSeasonTypes | '', year: number}) => {
    return  useMemo(() => {
        if (!animes) return animes;
        if (!Object.keys(filters).length) return animes
        for (let filter in filters) {
            console.log(filter)
            switch (filter) {
                case 'season':
                    if (filters.season !== '') {
                        animes = animes!.filter((anime) => anime.animeSeason.season === filters.season);
                    }
                    break;
                case 'year':
                    if (filters.year !== 0) {
                        animes = animes!.filter((anime) => anime.animeSeason.year === filters.year);
                    }
                    break;
            }
        }
        console.log(animes)
        return animes;

    }, [animes])

}
