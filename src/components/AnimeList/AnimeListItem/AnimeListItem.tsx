import React, {ChangeEvent, FC, useCallback, useEffect, useState} from 'react';
import {IAnime} from "../../../models/IAnime";
import Typography from "../../UI/Typography/Typography";
import AnimeCover from "../../AnimeCover/AnimeCover";
import './AnimeListItem.scss';
import MyPrimaryButton from "../../UI/buttons/MyPrimaryButton/MyPrimaryButton";
import {EditIconWhite} from "../../UI/Icons/EditIconWhite";
import Modal from "../../UI/Modal/Modal";
import {UserAnimeListItem} from "../../../models/UserAnimeListItem";
import {useAuth} from "../../../hooks/useAuth";
import AnimeStatusSelect from "../../AnimeStatusSelect/AnimeStatusSelect";
import {useParams} from "react-router-dom";
import {userAnimeApi} from "../../../services/UserAnimeService";
import {skipToken} from "@reduxjs/toolkit/query";
import StarRating from "../../UI/StarRating/StarRating";
import Input from "../../UI/inputs/Input/Input";
import {useDebounce} from "../../../hooks/useDebounce";
import {useDebounceCallback} from "../../../hooks/useDebounceCallback";

interface AnimeListItemProps {
    anime: IAnime;
    index: number;
    onDeleteAnimeItem: (userAnimeListId: string) => void;
    onChangeAnimeItem: (anime: UserAnimeListItem) => void;
}

const AnimeListItem: FC<AnimeListItemProps> = ({anime, index, onDeleteAnimeItem, onChangeAnimeItem}) => {

    const [editVisible, setEditVisible] = useState<boolean>(false);

    const [episodeProgressWight, setEpisodeProgressWight] = useState<string>('0px');
    const {username: pageUserName} = useParams()
    const user = useAuth();

    //get userAnimeListItem
    const {
        data: userAnimeListItem,
        isLoading: isLoadingUserAnimeListItem
    } = userAnimeApi.useGetAnimeStatusForUserQuery(user?.id ? {
        animeId: anime.id,
        userId: user.id
    } : skipToken);
    const [episodeProgress, setEpisodeProgress] = useState<string | null>( '');

    useEffect(() => {
        if (isLoadingUserAnimeListItem) return;
        setEpisodeProgress(userAnimeListItem!.progress || '-');
        if (!userAnimeListItem!.progress) {
            setEpisodeProgressWight('30px');
            return;
        }
        setEpisodeProgressWight(userAnimeListItem!.progress.length * 12 + 'px');
    }, [isLoadingUserAnimeListItem])

    const onDeleteHandler = () => {
        onDeleteAnimeItem(anime.id + '' + user?.id);
    }

    const [updateAnimeInList] = userAnimeApi.useUpdateAnimeInUserListMutation();
    const debouncedUpdateAnimeInList = useDebounceCallback(updateAnimeInList, 1500)
    const onRatingChange = async (rate: number) => {
        const newUserAnimeListItem: UserAnimeListItem = {
            ...userAnimeListItem!,
            rating: rate,
        }
        await updateAnimeInList(newUserAnimeListItem);
    }

    const onEpisodeProgressChange = async (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.value.length > 0) {
            setEpisodeProgressWight(e.target.value.length * 12 + 'px')
        }
        let onlyNumbers: string | null = e.target.value.replace(/\D/g, '');
        if (onlyNumbers === '') onlyNumbers = null;
        setEpisodeProgress(onlyNumbers);
        const newUserAnimeListItem: UserAnimeListItem = {
            ...userAnimeListItem!,
            progress: onlyNumbers,
        }
        await debouncedUpdateAnimeInList(newUserAnimeListItem);

    }

    const onFocusEpisodeProgress = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.value === '-') setEpisodeProgress('');
    }

    const onBlurEpisodeProgress = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.value.length === 0) {
            setEpisodeProgressWight('30px');
        }
        if (e.target.value === '') setEpisodeProgress('-');
    }

    return (
        <div className='anime-list__item'>
            {
                !isLoadingUserAnimeListItem &&
                <>
                    <div className="anime-list__item__left">
                        <Typography component='span'>{index + 1}</Typography>
                        <AnimeCover anime={anime} minHeight={105} minWidth={75}/>
                        <Typography className='anime-list__item__left__title'
                                    component='span'>{anime.title}</Typography>
                    </div>
                    <div className="anime-list__item__right">
                        <div className="anime-list__item__right__data">
                            <Typography component='span'>{userAnimeListItem!.rating ?? '-'}</Typography>
                            <div className="anime-list__item__right__data__progress">
                                <Input
                                    maxLength={5}
                                    pattern='[0-9]*'
                                    style={{width: episodeProgressWight}}
                                    value={episodeProgress!}
                                    onFocus={onFocusEpisodeProgress}
                                    onBlur={onBlurEpisodeProgress}
                                    className='anime-list__item__right__data__progress__input'
                                    onChange={onEpisodeProgressChange}
                                />
                                <Typography component='span'>{'/' + anime.episodes}</Typography>
                            </div>
                            <Typography component='span'>{anime.type}</Typography>
                        </div>

                        {user?.username === pageUserName &&
                            <>
                                <div className="anime-list__item__right__btns">
                                    <MyPrimaryButton
                                        width={30}
                                        height={30}
                                        onClick={() => setEditVisible(prevState => !prevState)}
                                    >
                                        <EditIconWhite/>
                                    </MyPrimaryButton>
                                    <MyPrimaryButton
                                        className='anime-list__item__right__btns__delete'
                                        width={30}
                                        height={30}
                                        onClick={onDeleteHandler}
                                    >
                                        X
                                    </MyPrimaryButton>
                                </div>

                                <Modal visible={editVisible} setVisible={setEditVisible}>
                                    {
                                        !isLoadingUserAnimeListItem &&
                                        <AnimeStatusSelect anime={anime}
                                                           user={user}
                                                           userAnimeListItem={userAnimeListItem!}
                                        />
                                    }
                                    {userAnimeListItem &&
                                        <StarRating rate={userAnimeListItem.rating} starCount={5}
                                                    onRatingChange={rate => onRatingChange(rate)}/>
                                    }
                                </Modal>
                            </>

                        }

                    </div>

                </>
            }

        </div>
    );
};

export default AnimeListItem;
