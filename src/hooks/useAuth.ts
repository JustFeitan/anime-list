import {useAppSelector} from "./redux";
import {selectCurrentUser} from "../store/reducers/auth/AuthSlice";
import {useMemo} from "react";

export const useAuth = () => {
    const user = useAppSelector(selectCurrentUser);
    return  useMemo(() => {
        return user;
    }, [user])


}
