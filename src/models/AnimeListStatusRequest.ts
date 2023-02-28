import { AnimeInListStatus } from "./AnimeInListStatus";

export interface AnimeListStatusRequest {
    userId: number | string;
    status: AnimeInListStatus;
}
