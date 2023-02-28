import { skipToken } from "@reduxjs/toolkit/query";
import React, { ChangeEvent, FC, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { userAnimeApi } from "../../../services/UserAnimeService";

import { useAuth } from "../../../hooks/useAuth";
import { useDebounceCallback } from "../../../hooks/useDebounceCallback";
import { IAnime } from "../../../models/IAnime";
import { UserAnimeListItem } from "../../../models/UserAnimeListItem";
import { AppRoutes } from "../../../routing/routes";
import AnimeStatusSelect from "../../AnimeStatusSelect/AnimeStatusSelect";
import AnimeCover from "../../UI/AnimeCover/AnimeCover";
import { EditIconWhite } from "../../UI/Icons/EditIconWhite";
import Modal from "../../UI/Modal/Modal";
import StarRating from "../../UI/StarRating/StarRating";
import Typography from "../../UI/Typography/Typography";
import MyPrimaryButton from "../../UI/buttons/MyPrimaryButton/MyPrimaryButton";
import TransparentInput from "../../UI/inputs/TransparentInput/TransparentInput";
import "./AnimeListItem.scss";

interface AnimeListItemProps {
    anime: IAnime;
    index: number;
    onDeleteAnimeItem: (userAnimeListId: string) => void;
    onChangeAnimeItem: (anime: UserAnimeListItem) => void;
}

const AnimeListItem: FC<AnimeListItemProps> = ({
    anime,
    index,
    onDeleteAnimeItem,
    onChangeAnimeItem,
}) => {
    const [editVisible, setEditVisible] = useState<boolean>(false);
    const { username: pageUserName } = useParams();
    const user = useAuth();
    const navigate = useNavigate();

    //get userAnimeListItem
    const { data: userAnimeListItem, isLoading: isLoadingUserAnimeListItem } =
        userAnimeApi.useGetAnimeStatusForUserQuery(
            user?.id
                ? {
                      animeId: anime.id,
                      userId: user.id,
                  }
                : skipToken
        );

    const onDeleteHandler = () => {
        onDeleteAnimeItem(anime.id + "" + user?.id);
    };

    const [updateAnimeInList] = userAnimeApi.useUpdateAnimeInUserListMutation();
    const debouncedUpdateAnimeInList = useDebounceCallback(
        updateAnimeInList,
        1500
    );

    const onRatingChange = async (
        rate: number | ChangeEvent<HTMLInputElement>
    ) => {
        if (typeof rate !== "number") {
        }
        const newUserAnimeListItem: UserAnimeListItem = {
            ...userAnimeListItem!,
            rating:
                typeof rate === "number"
                    ? rate
                    : Number(rate.target.value) < 10
                    ? Number(rate.target.value)
                    : null,
        };
        await updateAnimeInList(newUserAnimeListItem);
    };

    const onEpisodeProgressChange = async (
        e: ChangeEvent<HTMLInputElement>
    ) => {
        let onlyNumbers: string | null = e.target.value.replace(/\D/g, "");
        if (onlyNumbers === "" || +onlyNumbers > anime.episodes)
            onlyNumbers = null;
        const newUserAnimeListItem: UserAnimeListItem = {
            ...userAnimeListItem!,
            progress: onlyNumbers,
        };
        await debouncedUpdateAnimeInList(newUserAnimeListItem);
    };

    const onAnimeCoverClick = () => {
        navigate(AppRoutes.ANIME + anime.title);
    };
    return (
        <div className="anime-list__item">
            {!isLoadingUserAnimeListItem && (
                <>
                    <div className="anime-list__item__left">
                        <Typography component="span">{index + 1}</Typography>
                        <AnimeCover
                            onClick={onAnimeCoverClick}
                            anime={anime}
                            minHeight={105}
                            minWidth={75}
                        />
                        <Typography
                            className="anime-list__item__left__title"
                            component="span"
                        >
                            {anime.title}
                        </Typography>
                    </div>
                    <div className="anime-list__item__right">
                        <div className="anime-list__item__right__data">
                            <TransparentInput
                                width={"50px"}
                                maxLength={2}
                                pattern="[0-9]*"
                                value={userAnimeListItem?.rating ?? "-"}
                                onChange={onRatingChange}
                            />
                            <div className="anime-list__item__right__data__progress">
                                <TransparentInput
                                    autoSize={true}
                                    maxLength={5}
                                    pattern="[0-9]*"
                                    value={userAnimeListItem?.progress ?? "-"}
                                    onChange={onEpisodeProgressChange}
                                />
                                <Typography component="span">
                                    {"/" + anime.episodes}
                                </Typography>
                            </div>
                            <Typography component="span">
                                {anime.type}
                            </Typography>
                        </div>

                        {user?.username === pageUserName && (
                            <>
                                <div className="anime-list__item__right__btns">
                                    {/*<MyPrimaryButton*/}
                                    {/*    width={30}*/}
                                    {/*    height={30}*/}
                                    {/*    onClick={() => setEditVisible(prevState => !prevState)}*/}
                                    {/*>*/}
                                    {/*    <EditIconWhite/>*/}
                                    {/*</MyPrimaryButton>*/}
                                    <MyPrimaryButton
                                        className="anime-list__item__right__btns__delete"
                                        width={30}
                                        height={30}
                                        onClick={onDeleteHandler}
                                    >
                                        X
                                    </MyPrimaryButton>
                                </div>

                                {/*<Modal visible={editVisible} setVisible={setEditVisible}>*/}
                                {/*    {*/}
                                {/*        !isLoadingUserAnimeListItem &&*/}
                                {/*        <AnimeStatusSelect anime={anime}*/}
                                {/*                           user={user}*/}
                                {/*                           userAnimeListItem={userAnimeListItem!}*/}
                                {/*        />*/}
                                {/*    }*/}
                                {/*    {userAnimeListItem &&*/}
                                {/*        <StarRating rate={userAnimeListItem.rating} starCount={5}*/}
                                {/*                    onRatingChange={rate => onRatingChange(rate)}/>*/}
                                {/*    }*/}
                                {/*</Modal>*/}
                            </>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default AnimeListItem;
