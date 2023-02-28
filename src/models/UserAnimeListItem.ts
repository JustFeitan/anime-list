import { AnimeInListStatus } from "./AnimeInListStatus";

export interface UserAnimeListItem {
    id: string;
    userId: string;
    animeId: string;
    status: AnimeInListStatus;
    rating: number | null;
    progress: string | null;
}
