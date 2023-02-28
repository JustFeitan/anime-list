import { useMemo } from "react";

import { selectCurrentUser } from "../store/reducers/auth/AuthSlice";
import { useAppSelector } from "./redux";

export const useAuth = () => {
    const user = useAppSelector(selectCurrentUser);
    return useMemo(() => {
        return user;
    }, [user]);
};
