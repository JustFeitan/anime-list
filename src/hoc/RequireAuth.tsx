import React, { FC } from "react";
import { Navigate, useLocation } from "react-router-dom";

import { useAppSelector } from "../hooks/redux";
import { useAuth } from "../hooks/useAuth";
import { AppRoutes } from "../routing/routes";

interface RequireAuthProps {
    children: JSX.Element;
}

const RequireAuth: FC<RequireAuthProps> = ({ children }) => {
    const location = useLocation();
    const user = useAuth();

    if (!user) {
        return (
            <Navigate to={AppRoutes.LOGIN} state={{ from: location }} replace />
        );
    }

    return children;
};

export default RequireAuth;
