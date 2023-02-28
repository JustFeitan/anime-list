import { bindActionCreators } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import Actions from "../store/reducers/anime/actions";
import { AppDispatch, AppStore } from "../store/store";

export const useAppSelector: TypedUseSelectorHook<AppStore> = useSelector;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAction = () => {
    const dispatch = useAppDispatch();
    return bindActionCreators(Actions, dispatch);
};
