import { useCookies } from "react-cookie";

import { IUserResponse } from "../models/User/IUserResponse";
import { authActions } from "../store/reducers/auth";
import { useAppDispatch } from "./redux";

export const useAuthentication = () => {
    const dispatch = useAppDispatch();
    const [cookies, setCookie] = useCookies(["jwt-token"]);

    return async function authentication(
        authenticationUser: () => Promise<IUserResponse>,
        onSuccess?: () => any
    ) {
        const expires = new Date();
        expires.setHours(new Date().getHours() + 1);
        const userResponse = await authenticationUser();
        dispatch(authActions.setUser(userResponse));
        console.log(userResponse);
        setCookie("jwt-token", userResponse.accessToken, {
            expires: expires,
            path: "/",
        });
        localStorage.setItem("user", JSON.stringify(userResponse));
        // setCookie('user', userResponse, {
        //     expires: expires,
        //     path: '/'
        // })

        if (onSuccess) {
            await onSuccess();
        }
        return userResponse;
    };
};
