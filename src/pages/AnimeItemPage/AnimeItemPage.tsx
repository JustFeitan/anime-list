import { skipToken } from "@reduxjs/toolkit/query";
import React, { useState } from "react";
import { useParams } from "react-router-dom";

import AnimeStatusSelect from "../../components/AnimeStatusSelect/AnimeStatusSelect";
import Loader from "../../components/UI/Loader/Loader";
import StarRating from "../../components/UI/StarRating/StarRating";

import { animeAPI } from "../../services/AnimeService";
import { userAnimeApi } from "../../services/UserAnimeService";

import { useAuth } from "../../hooks/useAuth";
import { UserAnimeListItem } from "../../models/UserAnimeListItem";
import "./AnimeItemPage.scss";

const AnimeItemPage = () => {
    const { title: animeTitle } = useParams();
    const user = useAuth();
    const [statusListShown, setStatusListShown] = useState<boolean>(true);

    //get anime
    const {
        data: anime,
        isLoading: isLoadingAnime,
        error,
        isSuccess,
    } = animeAPI.useFetchAnimeByTitleQuery(animeTitle ?? skipToken);

    //get userAnimeListItem
    const { data: userAnimeListItem, isLoading: isLoadingUserAnimeListItem } =
        userAnimeApi.useGetAnimeStatusForUserQuery(
            isSuccess && user?.id
                ? {
                      animeId: anime!.id,
                      userId: user.id,
                  }
                : skipToken
        );

    const [updateAnimeInList] = userAnimeApi.useUpdateAnimeInUserListMutation();
    const onRatingChange = async (rate: number) => {
        const newUserAnimeListItem: UserAnimeListItem = {
            ...userAnimeListItem!,
            rating: rate,
        };
        await updateAnimeInList(newUserAnimeListItem);
    };

    return (
        <section className="anime-certain">
            {error ? (
                <div>Error</div>
            ) : isLoadingAnime ? (
                <Loader />
            ) : (
                anime && (
                    <>
                        <div className="anime-certain__main">
                            <h1 className="anime-certain__title">
                                {anime.title}
                            </h1>
                            <div className="anime-certain__main__data">
                                <img src={anime.picture} alt="" />
                                <div className="anime-certain__description">
                                    <h2>Information</h2>
                                    <div>
                                        <h3>Geners</h3>
                                        <span className="anime-certain__genres">
                                            {anime.tags.slice(1, 4).join(" ")}
                                        </span>
                                    </div>
                                    <div>
                                        <h3>Episodes</h3>
                                        <span className="anime-certain__genres">
                                            {anime.episodes}
                                        </span>
                                    </div>
                                    <div>
                                        <h3>Status</h3>
                                        <span className="anime-certain__genres">
                                            {anime.status}
                                        </span>
                                    </div>
                                    <h2>Description</h2>
                                    <p>Something about anime :)</p>
                                </div>
                            </div>
                        </div>

                        <div className={"anime-certain__user-status"}>
                            {!isLoadingUserAnimeListItem && user && (
                                <AnimeStatusSelect
                                    anime={anime}
                                    userAnimeListItem={userAnimeListItem!}
                                    user={user}
                                />
                            )}
                            {userAnimeListItem && (
                                <StarRating
                                    rate={userAnimeListItem.rating}
                                    starCount={5}
                                    onRatingChange={(rate) =>
                                        onRatingChange(rate)
                                    }
                                />
                            )}
                        </div>
                    </>
                )
            )}
        </section>
    );
};

export default AnimeItemPage;
