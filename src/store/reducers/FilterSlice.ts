import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IAnimeFilter} from "../../models/IAnimeFilter";
import {AnimeSeasonTypes} from "../../models/AnimeTypes";

interface initialState {
    filters: IAnimeFilter;
}

const initialState: initialState = {
    filters:
        {
            season: [],
            year: [],
        }
}

export const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        addYear(state, action: PayloadAction<number>) {
            state.filters.year.push(action.payload)
        },
        removeYear(state, action: PayloadAction<number>) {
            state.filters.year = state.filters.year.filter(year => year !== action.payload)
        },
        resetYear(state) {
            state.filters.year = [];
        },

        addSeason(state, action: PayloadAction<AnimeSeasonTypes>) {
            state.filters.season.push(action.payload)
        },
        removeSeason(state, action: PayloadAction<AnimeSeasonTypes>) {
            state.filters.season = state.filters.season.filter(season =>season !== action.payload)
        },
        resetSeason(state) {
            state.filters.season = [];
        },
    }
})

export default filterSlice.reducer;
