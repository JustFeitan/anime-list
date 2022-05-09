import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootReducer} from "../store/store";

export const useAppSelector: TypedUseSelectorHook<RootReducer> = useSelector;

export const useAppDispatch = () => useDispatch<AppDispatch>()
