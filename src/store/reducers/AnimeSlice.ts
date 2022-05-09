import {createSlice} from "@reduxjs/toolkit";
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

    }
})

export default animeSlice.reducer;
