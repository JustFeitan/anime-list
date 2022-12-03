import {authActions} from "../store/reducers/auth";
import {isErrorWithMessage, isFetchBaseQueryError} from "../services/helpers";
import {toast} from "react-toastify";
import {useAppDispatch} from "./redux";
import {useCookies} from "react-cookie";
import {IUserResponse} from "../models/User/IUserResponse";

export const useAuthentication = () => {
    const dispatch = useAppDispatch();
    const [cookies, setCookie] = useCookies(['jwt-token', 'user']);

    return async function authentication(authenticationUser: () => Promise<IUserResponse>, onSuccess?: () => any) {

        try {
            const expires = new Date();
            expires.setMonth(new Date().getMonth() + 1);
            const userResponse = await authenticationUser();
            dispatch(authActions.setUser(userResponse))
            setCookie('jwt-token', userResponse.accessToken, {
                expires: expires,
                path: '/'
            })
            setCookie('user', userResponse, {
                expires: expires,
                path: '/'
            })

            if (onSuccess) {
                await onSuccess();
            }

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


}
