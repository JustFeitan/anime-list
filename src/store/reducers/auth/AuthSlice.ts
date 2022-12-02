import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IUser} from "../../../models/User/IUser";
import {IUserResponse} from "../../../models/User/IUserResponse";
import {AppStore} from "../../store";


interface AuthState {
    accessToken: string | null;
    user: IUser | null;
    isLoading: boolean;
}

const initialState: AuthState = {
    accessToken: null,
    user: null,
    isLoading: false
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, {payload: {user, accessToken}}: PayloadAction<IUserResponse>) => {
            state.user = user;
            state.isLoading = false;
            state.accessToken = accessToken;
        },
        logout: (state) => {
            state.user = null;
            state.accessToken = null;
        },
        setUserLoading: (state) => {
            state.isLoading = true;
        },
        setUserBio: (state, action: PayloadAction<IUser>) => {
            state.user = action.payload;
        },
    }
})


export const selectCurrentUser = (state: AppStore) => state.authReducer.user;
