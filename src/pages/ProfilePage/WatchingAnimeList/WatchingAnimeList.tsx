import React, {FC, useState} from 'react';
import {useLocation, useParams} from "react-router-dom";
import {animeAPI} from "../../../services/AnimeService";
import {useQueryFromId} from "../../../hooks/useQueryFromId";
import {skipToken} from "@reduxjs/toolkit/query";
import Loader from "../../../components/UI/Loader/Loader";
import AnimeList from "../../../components/AnimeList/AnimeList";
import {IAnime} from "../../../models/IAnime";
import {userAnimeApi} from "../../../services/UserAnimeService";
import {UserAnimeListItem} from "../../../models/UserAnimeListItem";
import MyPrimaryButton from "../../../components/UI/buttons/MyPrimaryButton/MyPrimaryButton";
import './WatchingAnimeList.scss';

const WatchingAnimeList: FC = () => {

    const location = useLocation();
    const userId = location.state?.userId;
    const [limit, setLimit] = useState<number>(10);
    const [allShown, seyAllShown] = useState<boolean>(false);

    //Get user's anime list with Watching status
    const {
        data: userAnimeWatchingList,
        isLoading,
        error,
        isSuccess,
    } = userAnimeApi.useGetAnimeWatchingListByUserIdQuery(userId);
    //Take anime ids and make query from them
    const queryFormId = useQueryFromId(userAnimeWatchingList, "animeId");
    //Get anime using ids
    const {data: animesWithWatchingStatus} = animeAPI.useFetchAnimeByFilterQuery(isSuccess && queryFormId ? queryFormId : skipToken);

    const [deleteAnime] = userAnimeApi.useDeleteAnimeFromAnimeListByIdMutation();
    const [updateAnime] = userAnimeApi.useUpdateAnimeInUserListMutation();

    const onChangeAnime = (userAnimeListItem: UserAnimeListItem) => {
        updateAnime(userAnimeListItem)
    }
    const onDeleteAnime = (userAnimeListId: string) => {
        deleteAnime(userAnimeListId);
    }

    const onShowMore = (limit: number) => {
        setLimit(limit);
        seyAllShown(true);
    }

    return (
        <div className='watching-anime-list'>
            {isLoading
                ? <Loader/>
                : <AnimeList
                    onDeleteAnimeItem={onDeleteAnime}
                    onChangeAnimeItem={onChangeAnime}
                             animes={animesWithWatchingStatus?.response as IAnime[]}/>
            }
            {animesWithWatchingStatus && animesWithWatchingStatus.totalCount > 10 && !allShown &&
                <MyPrimaryButton
                    onClick={() => onShowMore(-1)}
                    className='completed-anime-list__show-all'
                    variant='outlined'
                >
                    Show all
                </MyPrimaryButton>
            }
        </div>
    );
};

export default WatchingAnimeList;
