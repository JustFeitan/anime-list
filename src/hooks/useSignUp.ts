import { authApi } from "../services/AuthService";

import { ISignUpRequest } from "../models/User/IRegisterRequest";
import { useAuthentication } from "./useAuthentication";

export const useSignUp = () => {
    const [signupUser, signUpUserResult] = authApi.useSignupMutation();
    const authenticate = useAuthentication();

    async function signup(
        signUpRequest: ISignUpRequest,
        onSuccess?: () => void
    ) {
        return await authenticate(
            () => signupUser(signUpRequest).unwrap(),
            onSuccess
        );
    }

    return { signup, signUpUserResult };
};
