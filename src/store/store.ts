import { configureStore } from "@reduxjs/toolkit";

import { animeAPI } from "../services/AnimeService";
import { rtkQueryErrorLogger } from "../services/helpers";

import { reducers } from "./reducers";

export const setStore = (preloadedState = {}) => {
    return configureStore({
        reducer: reducers,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(
                animeAPI.middleware,
                rtkQueryErrorLogger
            ),
        preloadedState,
    });
};

const store = setStore();
export type AppStore = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
