import { AppStore } from "../../../store";

export const getUser = (state: Partial<AppStore>) => state?.authReducer?.user;
