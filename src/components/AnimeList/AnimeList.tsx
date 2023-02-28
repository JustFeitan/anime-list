import React, { ComponentProps, FC } from "react";

import { IAnime } from "../../models/IAnime";
import { UserAnimeListItem } from "../../models/UserAnimeListItem";
import Typography from "../UI/Typography/Typography";
import MyPrimaryButton from "../UI/buttons/MyPrimaryButton/MyPrimaryButton";
import AnimeListItem from "./AnimeListItem/AnimeListItem";
import "./AnimeLists.scss";

interface AnimeListProps extends ComponentProps<"div"> {
    animes: IAnime[];
    onDeleteAnimeItem: (userAnimeListId: string) => void;
    onChangeAnimeItem: (anime: UserAnimeListItem) => void;
}

const AnimeList: FC<AnimeListProps> = ({
    animes,
    className,
    onChangeAnimeItem,
    onDeleteAnimeItem,
    ...props
}) => {
    console.log(animes?.length);
    return (
        <div className={className ? `anime-list ${className}` : `anime-list`}>
            <div className="anime-list__header">
                <div className="anime-list__header__left">
                    <Typography component="span">#</Typography>
                    <Typography component="span">Poster</Typography>
                    <Typography component="span">Title</Typography>
                </div>
                <div className="anime-list__header__right">
                    <Typography component="span">Score</Typography>
                    <Typography component="span">Progress</Typography>
                    <Typography component="span">Type</Typography>
                </div>
            </div>
            {animes?.length ? (
                animes.map((anime, index) => (
                    <AnimeListItem
                        onChangeAnimeItem={onChangeAnimeItem}
                        onDeleteAnimeItem={onDeleteAnimeItem}
                        anime={anime}
                        index={index}
                        key={index}
                    />
                ))
            ) : (
                <Typography className="anime-list__no-result" component="h3">
                    No Animes
                </Typography>
            )}
        </div>
    );
};

export default AnimeList;
