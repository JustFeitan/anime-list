import {configureStore} from "@reduxjs/toolkit";
import {reducers} from "./reducers";
import {animeAPI} from "../services/AnimeService";
import {rtkQueryErrorLogger} from "../services/helpers";


export const setStore = () => {
    return configureStore({
        reducer: reducers,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(animeAPI.middleware, rtkQueryErrorLogger)
        ,
    })
}

const store = setStore();
export type AppStore = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
