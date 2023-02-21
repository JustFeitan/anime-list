import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { animeAPI } from "../../services/AnimeService";
import Loader from "../../components/UI/Loader/Loader";
import "./AnimeItemPage.scss";
import { useAuth } from "../../hooks/useAuth";
import { skipToken } from "@reduxjs/toolkit/query";
import { userAnimeApi } from "../../services/UserAnimeService";
import AnimeStatusSelect from "../../components/AnimeStatusSelect/AnimeStatusSelect";
import StarRating from "../../components/UI/StarRating/StarRating";
import { UserAnimeListItem } from "../../models/UserAnimeListItem";

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
              <h1 className="anime-certain__title">{anime.title}</h1>
              <div className="anime-certain__main__data">
                <img src={anime.picture} alt="" />
                <div className="anime-certain__description">
                  <h2>Description</h2>
                  <span className="anime-certain__genres">
                    {anime.tags.slice(1, 4).join(" ")}
                  </span>
                  <p>Something from data base i don't have(</p>
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
                  onRatingChange={(rate) => onRatingChange(rate)}
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
