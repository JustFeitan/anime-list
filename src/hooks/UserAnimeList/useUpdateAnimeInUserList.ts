import { toast } from "react-toastify";

import { userAnimeApi } from "../../services/UserAnimeService";

import { UserAnimeListItem } from "../../models/UserAnimeListItem";

export const useUpdateAnimeInUserList = () => {
    const [updateAnimeInList, updateAnimeInListMutation] =
        userAnimeApi.useUpdateAnimeInUserListMutation();
    const updateAnimeInUserList = async (
        newUserAnimeListItem: UserAnimeListItem
    ) => {
        const response = await updateAnimeInList(newUserAnimeListItem).unwrap();

        if (response) {
            toast.success(`Add to ${response.status} list`, {
                position: toast.POSITION.BOTTOM_CENTER,
            });
        }
    };
    return { updateAnimeInUserList, updateAnimeInListMutation };
};
