import { authApi } from "../services/AuthService";

import { ILoginRequest } from "../models/User/ILoginRequest";
import { useAuthentication } from "./useAuthentication";

export const useLogin = () => {
    const [loginUser, loginUserResult] = authApi.useLoginMutation();
    const authenticateUser = useAuthentication();

    async function login(loginRequest: ILoginRequest, onSuccess?: () => void) {
        await authenticateUser(
            () => loginUser(loginRequest).unwrap(),
            onSuccess
        );
    }

    return { login, loginUserResult };
};
