import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootReducer} from "../store/store";
import Actions from '../store/reducers/actions';
import {bindActionCreators} from "@reduxjs/toolkit";

export const useAppSelector: TypedUseSelectorHook<RootReducer> = useSelector;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAction = () => {
    const dispatch = useAppDispatch();
   return bindActionCreators(Actions, dispatch);
}
