import {
    Middleware,
    MiddlewareAPI,
    isRejectedWithValue,
} from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { toast } from "react-toastify";

/**
 * Type predicate to narrow an unknown error to `FetchBaseQueryError`
 */
export function isFetchBaseQueryError(
    error: unknown
): error is FetchBaseQueryError {
    return typeof error === "object" && error != null && "status" in error;
}

/**
 * Type predicate to narrow an unknown error to an object with a string 'message' property
 */
export function isErrorWithMessage(
    error: unknown
): error is { message: string } {
    return (
        typeof error === "object" &&
        error != null &&
        "message" in error &&
        typeof (error as any).message === "string"
    );
}

export const rtkQueryErrorLogger: Middleware =
    (api: MiddlewareAPI) => (next) => (action) => {
        // RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these matchers!
        if (isRejectedWithValue(action)) {
            console.warn("We got a rejected action!");
            const e = action.payload;
            if (isFetchBaseQueryError(e)) {
                const errorData =
                    "error" in e ? e.error : JSON.parse(JSON.stringify(e.data));
                toast.error(
                    Object.keys(errorData).length
                        ? errorData
                        : "Something went wrong",
                    {
                        toastId: errorData,
                        position: toast.POSITION.BOTTOM_CENTER,
                    }
                );
            } else if (isErrorWithMessage(e)) {
                console.log(e);
                toast.error(e.message || "Something went wrong", {
                    toastId: e.message,
                    position: toast.POSITION.BOTTOM_CENTER,
                });
            }
        }

        return next(action);
    };
