import {animeAPI} from "./AnimeService";
import {IUserResponse} from "../models/User/IUserResponse";
import {ILoginRequest} from "../models/User/ILoginRequest";
import {ISignUpRequest} from "../models/User/IRegisterRequest";
import {IUser} from "../models/User/IUser";

export const authApi = animeAPI.injectEndpoints({
    endpoints: (build) => ({
        login: build.mutation<IUserResponse, ILoginRequest>({
            query: (loginRequest: ILoginRequest) => ({
                url: `/login/`,
                method: 'POST',
                body: loginRequest,
            })
        }),
        signup: build.mutation<IUserResponse, ISignUpRequest>({
            query: (registerRequest: ISignUpRequest) => ({
                url: '/register',
                method: 'POST',
                body: registerRequest,
            })
        }),
        getUser: build.query<IUser, number>({
            query: (userId: number) => ({
                url: `/users/${userId}`
            })
        }),
        getUserByUsername: build.query<IUser, string>({
            query: (username: string) => ({
                url: `/users/?username=${username}`
            })
        }),


    })
})
