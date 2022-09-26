import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IAnime} from "../../models/IAnime";

interface AnimeState {
    loading: boolean;
    error: string;
    animes: IAnime[];
}

const initialState: AnimeState = {
    animes: [],
    loading: false,
    error: '',
}

export const animeSlice = createSlice({
    name: 'anime',
    initialState,
    reducers: {
        setAnimes(store, action: PayloadAction<IAnime[]>) {
            store.animes = [...store.animes, ...action.payload];
        }
    }
})


export default animeSlice.reducer;
