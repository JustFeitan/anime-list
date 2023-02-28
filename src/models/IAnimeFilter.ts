import { AnimeSeasonTypes, AnimeTypes } from "./AnimeTypes";

export type IAnimeFilter = {
    season: AnimeSeasonTypes[];
    year: string[];
    tags: string[];
    type: AnimeTypes[];
};
