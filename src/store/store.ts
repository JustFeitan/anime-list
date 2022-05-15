import {combineReducers, configureStore} from "@reduxjs/toolkit";
import AnimeReducer from './reducers/AnimeSlice'
import {animeAPI} from "../Services/AnimeService";
import FilterReducer from './reducers/FilterSlice'

export const rootReducer  = combineReducers({
    AnimeReducer,
    FilterReducer,
    [animeAPI.reducerPath]: animeAPI.reducer,
})

export const setStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware:( getDefaultMiddleware) =>
             getDefaultMiddleware().concat(animeAPI.middleware)
        ,
    })
}

export type RootReducer = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setStore>;
export type AppDispatch = AppStore['dispatch'];
