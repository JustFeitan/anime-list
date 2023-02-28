import { ILoginRequest } from "./ILoginRequest";
import { IUser } from "./IUser";

export interface ISignUpRequest extends Omit<IUser, "id"> {}
