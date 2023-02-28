import { lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import RequireAuth from "../hoc/RequireAuth";
import { useAuth } from "../hooks/useAuth";
import Layout from "../pages/Layout";

const HomePage = lazy(() => import("../pages/HomePage/HomePage"));
const AnimesPage = lazy(() => import("../pages/AnimesPage/AnimesPage"));
const AnimeItemPage = lazy(
    () => import("../pages/AnimeItemPage/AnimeItemPage")
);
const MangaPage = lazy(() => import("../pages/MangaPage"));
const LoginPage = lazy(() => import("../pages/LoginPage/LoginPage"));
const SignUpPage = lazy(() => import("../pages/SignUpPage/SignUpPage"));
const ProfilePage = lazy(() => import("../pages/ProfilePage/ProfilePage"));
const CompleteAnimeList = lazy(
    () => import("../pages/ProfilePage/CompleteAnimeList/CompleteAnimeList")
);
const WatchingAnimeList = lazy(
    () => import("../pages/ProfilePage/WatchingAnimeList/WatchingAnimeList")
);
const PlanToWatchAnimeList = lazy(
    () =>
        import("../pages/ProfilePage/PlanToWatchAnimeList/PlanToWatchAnimeList")
);

const AppRouter = () => {
    const isLoggedIn = useAuth();
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<HomePage />} />
                <Route path="anime" element={<AnimesPage />} />
                <Route path="manga" element={<MangaPage />} />
                <Route path="anime/:title" element={<AnimeItemPage />} />
                <Route path="anime" element={<AnimeItemPage />} />
                <Route
                    path="login"
                    element={
                        isLoggedIn ? <Navigate to="/" replace /> : <LoginPage />
                    }
                />
                <Route
                    path="signup"
                    element={
                        isLoggedIn ? (
                            <Navigate to="/" replace />
                        ) : (
                            <SignUpPage />
                        )
                    }
                />
                <Route
                    path=":username"
                    element={
                        <RequireAuth>
                            <ProfilePage />
                        </RequireAuth>
                    }
                >
                    <Route index element={<CompleteAnimeList />} />
                    <Route
                        path="anime-list/watching"
                        element={<WatchingAnimeList />}
                    />
                    <Route
                        path="anime-list/plan"
                        element={<PlanToWatchAnimeList />}
                    />
                </Route>
            </Route>
        </Routes>
    );
};

export default AppRouter;
