import React, { useEffect } from "react";
import { useCookies } from "react-cookie";

import Loader from "./components/UI/Loader/Loader";

import "./App.scss";
import { useAppDispatch, useAppSelector } from "./hooks/redux";
import AppRouter from "./routing/AppRouter";
import { authActions } from "./store/reducers/auth";

function App() {
    const [cookies] = useCookies(["jwt-token"]);
    const dispatch = useAppDispatch();
    const { isLoading } = useAppSelector((state) => state.authReducer);

    useEffect(() => {
        if (cookies["jwt-token"] && localStorage.getItem("user")) {
            dispatch(authActions.setUserLoading);
            const user = JSON.parse(localStorage.getItem("user") as string);
            dispatch(authActions.setUser(user));
        }
    }, []);
    if (isLoading) return <Loader />;

    return <AppRouter />;
}

export default App;
