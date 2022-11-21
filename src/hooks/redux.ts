import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {AppDispatch, AppStore} from "../store/store";
import Actions from '../store/reducers/anime/actions';
import {bindActionCreators} from "@reduxjs/toolkit";

export const useAppSelector: TypedUseSelectorHook<AppStore> = useSelector;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAction = () => {
    const dispatch = useAppDispatch();
   return bindActionCreators(Actions, dispatch);
}
