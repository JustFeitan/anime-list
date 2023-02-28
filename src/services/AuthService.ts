import { ILoginRequest } from "../models/User/ILoginRequest";
import { ISignUpRequest } from "../models/User/IRegisterRequest";
import { IUser } from "../models/User/IUser";
import { IUserResponse } from "../models/User/IUserResponse";
import { animeAPI } from "./AnimeService";

export const authApi = animeAPI.injectEndpoints({
    endpoints: (build) => ({
        login: build.mutation<IUserResponse, ILoginRequest>({
            query: (loginRequest: ILoginRequest) => ({
                url: `/login/`,
                method: "POST",
                body: loginRequest,
            }),
        }),
        signup: build.mutation<IUserResponse, ISignUpRequest>({
            query: (registerRequest: ISignUpRequest) => ({
                url: "/register",
                method: "POST",
                body: registerRequest,
            }),
        }),
        getUser: build.query<Omit<IUser, "password">, number>({
            query: (userId: number) => ({
                url: `/users/${userId}`,
            }),
            providesTags: ["User"],
            transformResponse(response: IUser) {
                const { password, ...user } = response;
                return user;
            },
        }),
        getUserByUsername: build.query<IUser, string>({
            query: (username: string) => ({
                url: `/users/?username=${username}`,
            }),
            providesTags: ["User"],
        }),
        updateUser: build.mutation<
            Omit<IUser, "password">,
            Omit<IUser, "password">
        >({
            query: (user: Omit<IUser, "password">) => ({
                url: `/users/${user.id}`,
                method: "PATCH",
                body: user,
            }),
            invalidatesTags: ["User"],
        }),
    }),
});
