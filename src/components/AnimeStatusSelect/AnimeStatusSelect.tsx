import React, {FC} from 'react';
import Select, {ActionMeta, SingleValue} from "react-select";
import {userAnimeApi} from "../../services/UserAnimeService";
import {useAddAnimeToUserAnimeList} from "../../hooks/UserAnimeList/useAddAnimeToUserAnimeList";
import {useUpdateAnimeInUserList} from "../../hooks/UserAnimeList/useUpdateAnimeInUserList";
import {AnimeInListStatus} from "../../models/AnimeInListStatus";
import {IAnime} from "../../models/IAnime";
import {UserAnimeListItem} from "../../models/UserAnimeListItem";
import {IUser} from "../../models/User/IUser";
import {
    UserAnimeStatusOption,
    UserAnimeStatusOptions
} from "../../models/SelectOptions/UserAnimeStatusOption";


const statusOptions: UserAnimeStatusOptions = [
    {value: AnimeInListStatus.WATCHING, label: AnimeInListStatus.WATCHING},
    {value: AnimeInListStatus.PLAN_TO_WATCH, label: AnimeInListStatus.PLAN_TO_WATCH},
    {value: AnimeInListStatus.COMPLETED, label: AnimeInListStatus.COMPLETED}
]

interface AnimeStatusSelectProps {
    anime: IAnime;
    userAnimeListItem: UserAnimeListItem | null;
    user: IUser | null;
}

const AnimeStatusSelect: FC<AnimeStatusSelectProps> = ({anime, userAnimeListItem, user,  ...props}) => {

    const [deleteAnimeFromList, {}] = userAnimeApi.useDeleteAnimeFromAnimeListByIdMutation();

    const addAnimeToStatusList = useAddAnimeToUserAnimeList();

    const {updateAnimeInUserList} = useUpdateAnimeInUserList();


    const animeToStatusListHandler = async (newStatus: SingleValue<UserAnimeStatusOption>, action: ActionMeta<UserAnimeStatusOption>) => {

        if (action.action === 'clear') {
            await deleteAnimeFromList(anime.id + '' + user?.id);
        }
        if (!newStatus) return;
        if (userAnimeListItem) {
            const newUserAnimeListItem: UserAnimeListItem = {
                ...userAnimeListItem,
                status: newStatus!.value as AnimeInListStatus,
            }
            await updateAnimeInUserList(newUserAnimeListItem);
            return;
        }
        await addAnimeToStatusList(newStatus, anime);

    }

    return (
        <Select
            placeholder={'Add to list'}
            isClearable={true}
            onChange={(newValue, actionMeta) => animeToStatusListHandler(newValue, actionMeta)}
            defaultValue={userAnimeListItem && {
                value: userAnimeListItem.status,
                label: userAnimeListItem.status ,
            } as UserAnimeStatusOption}
            options={statusOptions}
        />
    );
};

export default AnimeStatusSelect;
