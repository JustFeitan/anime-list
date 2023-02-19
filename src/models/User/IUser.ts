export interface IUser {
    id: string;
    username: string;
    email: string;
    password: string;
    userAvatar: string | null | ArrayBuffer;
    profileCover: string | null | ArrayBuffer;
}
