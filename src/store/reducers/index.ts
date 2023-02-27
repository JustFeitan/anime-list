import { animeReducer } from "./anime/AnimeSlice";
import { animeAPIReducer, animeAPI } from "../../services/AnimeService";
import { authReducer } from "./auth";

export const reducers = {
    authReducer: authReducer,
    animeReducer,
    [animeAPI.reducerPath]: animeAPIReducer,
};
