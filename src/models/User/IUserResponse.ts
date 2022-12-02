import {IUser} from "./IUser";

export interface IUserResponse {
    user: IUser;
    accessToken: string | null;
}
