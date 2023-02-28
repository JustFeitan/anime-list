import { useMemo } from "react";

import { DefaultQuery } from "../models/DefaultQuery";
import { UserAnimeListItem } from "../models/UserAnimeListItem";

export function useQueryFromId<
    T extends Array<O>,
    O extends Partial<Pick<UserAnimeListItem, "userId" | "animeId" | "id">>
>(arrayWithIds: T | undefined, idFieldName: keyof O, limit?: number) {
    return useMemo(() => {
        let params: DefaultQuery;
        if (arrayWithIds !== undefined && arrayWithIds.length) {
            const query = arrayWithIds
                .map((obj) => `id=${obj[idFieldName]}`)
                .join("&");
            params = {
                query: query,
                limit: limit || 10,
            };
            return params;
        }
        return (params = {
            query: "id=none",
        });
    }, [arrayWithIds, limit]);
}
