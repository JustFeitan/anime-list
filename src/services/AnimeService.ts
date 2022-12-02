import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {IAnime} from "../models/IAnime";
import {AnimeSeasonTypes} from "../models/AnimeTypes";
import {QueryFilterPage} from "../models/QueryFilterPage";
import {AppStore} from "../store/store";

type FetchBaseQueryMeta = { request: Request; response?: Response }

export const emptyApi = createApi({
    baseQuery: fetchBaseQuery({baseUrl: '/'}),
    endpoints: () => ({})
})

export const animeAPI = createApi({
    reducerPath: 'animeAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000',
        prepareHeaders: (headers, {getState}) => {
            const token = (getState() as AppStore).authReducer.accessToken;
            if (token) {
                headers.set('Authorization', `Bearer ${token}`)
            }
            return headers;
        },
    }),
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
        fetchAnimeByFilter: build.query<{ response: IAnime[], totalCount: number }, QueryFilterPage>({
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

export const animeAPIReducer = animeAPI.reducer;

