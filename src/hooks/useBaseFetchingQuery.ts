import {authActions} from "../store/reducers/auth";
import {toast} from "react-toastify";
import {isErrorWithMessage, isFetchBaseQueryError} from "../services/helpers";
import {ILoginRequest} from "../models/User/ILoginRequest";
import {ISignUpRequest} from "../models/User/IRegisterRequest";

export function useBaseFetchingQuery<T>(callback: (...args: any) => any) {
    return async function fetch(...args: any) {
        try {
           await callback(...args);
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
