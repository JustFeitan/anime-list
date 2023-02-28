import { AnimeInListStatus } from "../AnimeInListStatus";

export interface UserAnimeStatusOption
    extends selectOption<AnimeInListStatus> {}

export type UserAnimeStatusOptions = selectOptions<UserAnimeStatusOption>;

export interface selectOption<T = string> {
    readonly value: T | null;
    readonly label: T | null;
    readonly color?: string;
    readonly isFixed?: boolean;
    readonly isDisabled?: boolean;
}

export type selectOptions<E extends selectOption> = Array<E>;
