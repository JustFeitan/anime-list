import {authReducer} from './auth/AuthSlice';
import {animeReducer} from './anime/AnimeSlice'
import {animeAPIReducer, animeAPI} from "../../services/AnimeService";

export default {
    authReducer,
    animeReducer,
    [animeAPI.reducerPath]: animeAPIReducer,
}
