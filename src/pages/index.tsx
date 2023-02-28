import { lazy } from "react";

export { default as Layout } from "../pages/Layout";
export const HomePage = lazy(() => import("../pages/HomePage/HomePage"));
export const AnimesPage = lazy(() => import("../pages/AnimesPage/AnimesPage"));
export const AnimeItemPage = lazy(
    () => import("../pages/AnimeItemPage/AnimeItemPage")
);
export const MangaPage = lazy(() => import("../pages/MangaPage"));
export const LoginPage = lazy(() => import("../pages/LoginPage/LoginPage"));
export const SignUpPage = lazy(() => import("../pages/SignUpPage/SignUpPage"));
export const ProfilePage = lazy(
    () => import("../pages/ProfilePage/ProfilePage")
);
export const CompleteAnimeList = lazy(
    () => import("../pages/ProfilePage/CompleteAnimeList/CompleteAnimeList")
);
export const WatchingAnimeList = lazy(
    () => import("../pages/ProfilePage/WatchingAnimeList/WatchingAnimeList")
);
export const PlanToWatchAnimeList = lazy(
    () =>
        import("../pages/ProfilePage/PlanToWatchAnimeList/PlanToWatchAnimeList")
);
