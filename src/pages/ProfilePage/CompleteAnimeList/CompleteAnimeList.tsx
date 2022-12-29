import React, {FC, useState} from 'react';
import AnimeList from "../../../components/AnimeList/AnimeList";
import {animeAPI} from "../../../services/AnimeService";
import {useLocation, useParams} from "react-router-dom";
import Loader from "../../../components/UI/Loader/Loader";
import {skipToken} from "@reduxjs/toolkit/query";
import {IAnime} from "../../../models/IAnime";
import {useQueryFromId} from "../../../hooks/useQueryFromId";
import './CompleteAnimeList.scss';
import {userAnimeApi} from "../../../services/UserAnimeService";
import {UserAnimeListItem} from "../../../models/UserAnimeListItem";
import MyPrimaryButton from "../../../components/UI/buttons/MyPrimaryButton/MyPrimaryButton";
import './CompleteAnimeList.scss';

const CompleteAnimeList: FC = () => {


    const location = useLocation();
    const userId = location.state?.userId;
    const [limit, setLimit] = useState<number>(10);
    const [allShown, seyAllShown] = useState<boolean>(false);

    //Get user's anime list with Completed status
    const {
        data: userAnimeCompletedList,
        isLoading,
        error,
        isSuccess,
    } = userAnimeApi.useGetAnimeCompletedListByUserIdQuery(userId);
    //Take anime ids and make query from them
    const queryFormId = useQueryFromId(userAnimeCompletedList, 'animeId', limit)
    //Get anime using ids
    const {data: animesWithCompletedStatus} = animeAPI.useFetchAnimeByFilterQuery(isSuccess ? queryFormId! : skipToken);

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
        seyAllShown(true)
    }

    return (
        <div className='completed-anime-list'>
            {isLoading
                ? <Loader/>
                :
                <>
                    <AnimeList
                        onChangeAnimeItem={onChangeAnime}
                        onDeleteAnimeItem={onDeleteAnime}
                        animes={animesWithCompletedStatus?.response as IAnime[]}
                    />
                    {animesWithCompletedStatus && animesWithCompletedStatus.totalCount > 10 && !allShown &&
                        <MyPrimaryButton
                            onClick={() => onShowMore(-1)}
                            className='completed-anime-list__show-all'
                            variant='outlined'
                        >
                            Show all
                        </MyPrimaryButton>
                    }

                </>

            }

        </div>
    );
};

export default CompleteAnimeList;
