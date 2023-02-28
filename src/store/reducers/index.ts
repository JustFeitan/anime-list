import { animeAPI, animeAPIReducer } from "../../services/AnimeService";

import { animeReducer } from "./anime/AnimeSlice";
import { authReducer } from "./auth";

export const reducers = {
    authReducer: authReducer,
    animeReducer,
    [animeAPI.reducerPath]: animeAPIReducer,
};
