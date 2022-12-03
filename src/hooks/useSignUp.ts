import {authApi} from "../services/AuthService";
import {useAuthentication} from "./useAuthentication";
import {ISignUpRequest} from "../models/User/IRegisterRequest";

export const useSignUp = () => {
  const [signupUser, signUpUserResult] = authApi.useSignupMutation();
  const authenticate = useAuthentication();

  async function signup(signUpRequest: ISignUpRequest, onSuccess?: () => void) {
    await authenticate(() => signupUser(signUpRequest).unwrap(), onSuccess)
  }

  return {signup, signUpUserResult}
}
