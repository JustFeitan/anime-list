import {ILoginRequest} from "../models/User/ILoginRequest";
import {authApi} from "../services/AuthService";
import {authActions} from "../store/reducers/auth";
import {isErrorWithMessage, isFetchBaseQueryError} from "../services/helpers";
import {toast} from "react-toastify";
import {useAppDispatch} from "./redux";
import {useCookies} from "react-cookie";

export const useLogin = () => {
    const [loginUser, mutationResult] = authApi.useLoginMutation();
    const dispatch = useAppDispatch();
    const [cookies, setCookie] = useCookies(['jwt-token', 'user']);

    async function login(loginRequest: ILoginRequest, callback: () => any ) {

        try {
            //add util for set cookies expire date
            const expires = new Date();
            expires.setMonth(new Date().getMonth() + 1)
            const userResponse = await loginUser(loginRequest).unwrap();
            dispatch(authActions.setUser(userResponse))

            setCookie('jwt-token', userResponse.accessToken, {
                expires: expires,
                path: '/'
            })
            setCookie('user', userResponse, {
                expires: expires,
                path: '/'
            })
            await callback();
            toast.success('Welcome back!', {
                toastId: 'Welcome back!',
                position: toast.POSITION.BOTTOM_CENTER,
            });
        } catch (e) {
            if (isFetchBaseQueryError(e)) {
                const errorData = 'error' in e ? e.error : JSON.parse(JSON.stringify(e.data));
                toast.error(errorData, {
                    toastId: errorData,
                    position: toast.POSITION.BOTTOM_CENTER,
                });
            } else if (isErrorWithMessage(e)) {
                toast.error(e.message, {
                    toastId: e.message,
                    position: toast.POSITION.BOTTOM_CENTER,
                });
            }
        }
    }

    return {login, mutationResult};
}
