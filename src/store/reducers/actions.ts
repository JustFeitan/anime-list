import {animeSlice} from "./AnimeSlice";
import {filterSlice} from "./FilterSlice";

export default {
    ...animeSlice.actions,
    ...filterSlice.actions,
}
