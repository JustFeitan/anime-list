import { AnimeInListStatus } from "../models/AnimeInListStatus";
import { UserAnimeListItem } from "../models/UserAnimeListItem";
import { animeAPI } from "./AnimeService";

export const userAnimeApi = animeAPI.injectEndpoints({
    endpoints: (build) => ({
        getAnimeCompletedListByUserId: build.query<UserAnimeListItem[], string>(
            {
                query: (userId) => ({
                    url: `/usersAnimesListStatus/?userId=${userId}&status=${AnimeInListStatus.COMPLETED}`,
                }),
                providesTags: ["AnimeList"],
            }
        ),
        getAnimeWatchingListByUserId: build.query<UserAnimeListItem[], string>({
            query: (userId) => ({
                url: `/usersAnimesListStatus/?userId=${userId}&status=${AnimeInListStatus.WATCHING}`,
            }),
            providesTags: ["AnimeList"],
        }),
        getAnimePlanListByUserId: build.query<UserAnimeListItem[], string>({
            query: (userId) => ({
                url: `/usersAnimesListStatus/?userId=${userId}&status=${AnimeInListStatus.PLAN_TO_WATCH}`,
            }),
            providesTags: ["AnimeList"],
        }),
        getAnimeStatusForUser: build.query<
            UserAnimeListItem | null,
            Pick<UserAnimeListItem, "userId" | "animeId">
        >({
            query: ({ animeId, userId }) => ({
                url: `/usersAnimesListStatus/?userId=${userId}&animeId=${animeId}`,
            }),
            transformResponse(response: UserAnimeListItem[]) {
                if (response.length) {
                    return response[0];
                }
                return null;
            },
            providesTags: ["AnimeList"],
        }),
        addAnimeToStatusList: build.mutation<
            UserAnimeListItem,
            UserAnimeListItem
        >({
            query: (animeStatusItem: UserAnimeListItem) => ({
                url: "/usersAnimesListStatus",
                method: "POST",
                body: animeStatusItem,
            }),
            invalidatesTags: ["AnimeList"],
        }),
        deleteAnimeFromAnimeListById: build.mutation<UserAnimeListItem, string>(
            {
                query: (userAnimeItemId: string) => ({
                    url: `/usersAnimesListStatus/${userAnimeItemId}`,
                    method: "DELETE",
                }),
                invalidatesTags: ["AnimeList"],
            }
        ),
        updateAnimeInUserList: build.mutation<
            UserAnimeListItem,
            UserAnimeListItem
        >({
            query: (userAnimeListItem: UserAnimeListItem) => ({
                url: `/usersAnimesListStatus/${userAnimeListItem.id}`,
                method: "PUT",
                body: userAnimeListItem,
            }),
            invalidatesTags: ["AnimeList"],
        }),
    }),
});
