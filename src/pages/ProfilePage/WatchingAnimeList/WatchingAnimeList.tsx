import { skipToken } from "@reduxjs/toolkit/query";
import React, { FC, useState } from "react";
import { useLocation } from "react-router-dom";

import AnimeList from "../../../components/AnimeList/AnimeList";
import Loader from "../../../components/UI/Loader/Loader";
import MyPrimaryButton from "../../../components/UI/buttons/MyPrimaryButton/MyPrimaryButton";

import { animeAPI } from "../../../services/AnimeService";
import { userAnimeApi } from "../../../services/UserAnimeService";

import { useQueryFromId } from "../../../hooks/useQueryFromId";
import { IAnime } from "../../../models/IAnime";
import { UserAnimeListItem } from "../../../models/UserAnimeListItem";
import "./WatchingAnimeList.scss";

const WatchingAnimeList: FC = () => {
    const location = useLocation();
    const userId = location.state?.userId;
    const [limit, setLimit] = useState<number>(10);
    const [allShown, seyAllShown] = useState<boolean>(false);

    //Get user's anime list with Watching status
    const {
        data: userAnimeWatchingList,
        isLoading,
        isSuccess,
    } = userAnimeApi.useGetAnimeWatchingListByUserIdQuery(userId);
    //Take anime ids and make query from them
    const queryFormId = useQueryFromId(userAnimeWatchingList, "animeId", limit);
    //Get anime using ids
    const { data: animesWithWatchingStatus } =
        animeAPI.useFetchAnimeByFilterQuery(
            isSuccess && queryFormId ? queryFormId : skipToken
        );

    const [deleteAnime] =
        userAnimeApi.useDeleteAnimeFromAnimeListByIdMutation();
    const [updateAnime] = userAnimeApi.useUpdateAnimeInUserListMutation();

    const onChangeAnime = (userAnimeListItem: UserAnimeListItem) => {
        updateAnime(userAnimeListItem);
    };
    const onDeleteAnime = (userAnimeListId: string) => {
        deleteAnime(userAnimeListId);
    };

    const onShowMore = (limit: number) => {
        setLimit(limit);
        seyAllShown(true);
    };

    return (
        <div className="watching-anime-list">
            {isLoading ? (
                <Loader />
            ) : (
                <AnimeList
                    onDeleteAnimeItem={onDeleteAnime}
                    onChangeAnimeItem={onChangeAnime}
                    animes={animesWithWatchingStatus?.response as IAnime[]}
                />
            )}
            {animesWithWatchingStatus &&
                animesWithWatchingStatus.totalCount > 10 &&
                !allShown && (
                    <MyPrimaryButton
                        onClick={() => onShowMore(-1)}
                        className="completed-anime-list__show-all"
                        variant="outlined"
                    >
                        Show all
                    </MyPrimaryButton>
                )}
        </div>
    );
};

export default WatchingAnimeList;
