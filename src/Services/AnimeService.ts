import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {IAnime} from "../models/IAnime";
import {AnimeSeasonTypes} from "../models/AnimeTypes";

export const animeAPI = createApi({
    reducerPath: 'animeAPI',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:5000'}),
    endpoints: (build) => ({
        fetchAllAnime: build.query<IAnime[], number>({
            query: (limit: number = 10) => ({
                url: `/anime`,
                params: {
                    _limit: limit,
                }
            }),
        }),
        fetchAnimeBySeason: build.query<IAnime[], AnimeSeasonTypes>({
            query: (season: AnimeSeasonTypes) => ({
                url: `/anime?animeSeason.season=${season}`
            })
        }),

    })

})



