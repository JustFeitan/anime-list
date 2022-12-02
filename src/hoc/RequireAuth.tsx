import React, {FC} from 'react';
import {useAppSelector} from "../hooks/redux";
import {Navigate, useLocation} from "react-router-dom";
import {AppRoutes} from "../routing/routes";
import {useAuth} from "../hooks/useAuth";

interface RequireAuthProps {
    children: JSX.Element;
}

const RequireAuth: FC<RequireAuthProps> = ({children}) => {

    const location = useLocation();
    const user = useAuth()

    if (!user) {
        return <Navigate to={AppRoutes.LOGIN} state={{from: location}} replace/>
    }

    return children;
};

export default RequireAuth;
