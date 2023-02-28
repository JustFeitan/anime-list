import { AnimeSeasonTypes, AnimeTypes } from "./AnimeTypes";

export interface ISeason {
    season: AnimeSeasonTypes;
    year: string;
}

export interface IAnime {
    id: string;
    sources: string;
    title: string;
    type: AnimeTypes;
    episodes: number;
    status: string;
    animeSeason: ISeason;
    picture: string;
    thumbnail: string;
    synonyms: string[];
    relations: string[];
    tags: string[];
}
