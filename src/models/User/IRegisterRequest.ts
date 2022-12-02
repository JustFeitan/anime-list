import {ILoginRequest} from "./ILoginRequest";

export interface ISignUpRequest extends ILoginRequest{
    username: string;
}
