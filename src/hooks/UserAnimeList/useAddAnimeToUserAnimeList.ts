import { SingleValue } from "react-select";
import { toast } from "react-toastify";

import { userAnimeApi } from "../../services/UserAnimeService";

import { AnimeInListStatus } from "../../models/AnimeInListStatus";
import { IAnime } from "../../models/IAnime";
import { UserAnimeStatusOption } from "../../models/SelectOptions/UserAnimeStatusOption";
import { UserAnimeListItem } from "../../models/UserAnimeListItem";
import { useAuth } from "../useAuth";

export const useAddAnimeToUserAnimeList = () => {
    const [addAnimeToStatusList, { isSuccess }] =
        userAnimeApi.useAddAnimeToStatusListMutation();
    const user = useAuth();
    return async (
        newStatus: SingleValue<UserAnimeStatusOption>,
        anime: IAnime
    ) => {
        const newUserAnimeListItem: UserAnimeListItem = {
            id: anime.id + "" + user!.id,
            animeId: anime.id,
            status: newStatus!.value as AnimeInListStatus,
            userId: user!.id,
            progress: "-",
            rating: null,
        };
        const response = await addAnimeToStatusList(
            newUserAnimeListItem
        ).unwrap();
        if (response) {
            toast.success(`Added to ${response.status} list`, {
                position: toast.POSITION.BOTTOM_CENTER,
            });
        }
    };
};
