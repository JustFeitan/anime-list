import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {IAnime} from "../models/IAnime";
import {AnimeSeasonTypes} from "../models/AnimeTypes";
import {IAnimeFilter} from "../models/IAnimeFilter";
import {QueryFilterPage} from "../models/QueryFilterPage";
import {BaseQueryMeta, BaseQueryResult} from "@reduxjs/toolkit/dist/query/baseQueryTypes";
import {animeTitle} from "../pages/AnimeItemPage/AnimeItemPage.scss";

type FetchBaseQueryMeta = { request: Request; response?: Response }

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
        fetchWholeAnime: build.query<IAnime[], number>({
            query: () => ({
                url: `/anime`,
            }),
        }),
        fetchAnimeBySeason: build.query<IAnime[], AnimeSeasonTypes>({
            query: (season: AnimeSeasonTypes) => ({
                url: `/anime?animeSeason.season=${season}`
            })
        }),
        fetchAnimeByFilter: build.query<{response: IAnime[], totalCount: number}, QueryFilterPage>({
            query: (queryParams) => ({
                url: `/anime?${queryParams.query}`,
                params: {
                    _page: queryParams.page,
                    _limit: queryParams.limit || 10,
                }
            }),
            transformResponse(response: IAnime[], meta: FetchBaseQueryMeta) {
                return {response, totalCount: Number(meta.response?.headers.get('X-Total-Count'))}
            }
        }),
        fetchAnimeByTitle: build.query<IAnime[], string>({
            query: (animeTitle: string) => ({
                url: `/anime?title=${animeTitle}`
            })
        }),
        fetchAnimeBySearch: build.query<IAnime[], string>({
            query: (searchQuery: string) => ({
                url: `/anime?title_like=${searchQuery}`,
                params: {
                    _limit: 25
                }
            })
        })

    })

})



