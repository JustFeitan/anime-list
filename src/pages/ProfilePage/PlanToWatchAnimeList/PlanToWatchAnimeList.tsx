import React, {FC, useState} from 'react';
import {useLocation, useParams} from "react-router-dom";
import {animeAPI} from "../../../services/AnimeService";
import {AnimeInListStatus} from "../../../models/AnimeInListStatus";
import {useQueryFromId} from "../../../hooks/useQueryFromId";
import {skipToken} from "@reduxjs/toolkit/query";
import Loader from "../../../components/UI/Loader/Loader";
import AnimeList from "../../../components/AnimeList/AnimeList";
import {IAnime} from "../../../models/IAnime";
import {userAnimeApi} from "../../../services/UserAnimeService";
import {UserAnimeListItem} from "../../../models/UserAnimeListItem";
import './PlanToWatchAnimeList.scss';
import MyPrimaryButton from "../../../components/UI/buttons/MyPrimaryButton/MyPrimaryButton";

const PlanToWatchAnimeList: FC = () => {

    const location = useLocation();
    const userId = location.state?.userId;
    const [limit, setLimit] = useState<number>(10);
    const [allShown, seyAllShown] = useState<boolean>(false);

    //Get user's anime list with Plan to watch status
    const {
        data: userAnimePlanToWatchList,
        isLoading,
        error,
        isSuccess,
    } = userAnimeApi.useGetAnimePlanListByUserIdQuery(userId);
    //Take anime ids and make query from them
    const queryFormId = useQueryFromId(userAnimePlanToWatchList, 'animeId')
    //Get anime using ids
    const {data: animesWithPlanToStatus} = animeAPI.useFetchAnimeByFilterQuery(isSuccess && queryFormId ? queryFormId : skipToken);

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
        <div className='plan-anime-list'>
            {isLoading
                ? <Loader/>
                : <AnimeList
                    onDeleteAnimeItem={onDeleteAnime}
                    onChangeAnimeItem={onChangeAnime}
                    animes={animesWithPlanToStatus?.response as IAnime[]}
                />
            }
            {animesWithPlanToStatus && animesWithPlanToStatus.totalCount > 10 && !allShown &&
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

export default PlanToWatchAnimeList;
