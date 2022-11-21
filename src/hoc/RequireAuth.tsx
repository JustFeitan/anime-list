import React, {FC} from 'react';
import {useAppSelector} from "../hooks/redux";
import {Navigate, useLocation} from "react-router-dom";
import {AppRoutes} from "../routing/routes";

interface RequireAuthProps {
    children: JSX.Element;
}

const RequireAuth: FC<RequireAuthProps> = ({children}) => {

    const location = useLocation();
    const {isAuth} = useAppSelector(state => state.authReducer);

    if (!isAuth) {
        return <Navigate to={AppRoutes.LOGIN} state={{from: location}}/>
    }

    return children;
};

export default RequireAuth;
