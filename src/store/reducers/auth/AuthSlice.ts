import {createSlice} from "@reduxjs/toolkit";
import {IUser} from "../../../models/IUser";

interface AuthState {
    isAuth: boolean;
    isLoading: boolean;
    error: string;
    user: IUser;
}

const initialState: AuthState = {
    isAuth: false,
    isLoading: false,
    error: '',
    user: {} as IUser,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {}
})

export const authReducer = authSlice.reducer;
