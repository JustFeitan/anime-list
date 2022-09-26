import {AnimeSeasonTypes, AnimeTypes} from "./AnimeTypes";

export type IAnimeFilter = {
    season: AnimeSeasonTypes[];
    year: number[];
    tags: string[];
    type: AnimeTypes[];
}

