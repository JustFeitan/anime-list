import { Navigate, Route, Routes } from "react-router-dom";

import RequireAuth from "../hoc/RequireAuth";
import { useAuth } from "../hooks/useAuth";
import {
    AnimeItemPage,
    AnimesPage,
    CompleteAnimeList,
    HomePage,
    Layout,
    LoginPage,
    MangaPage,
    PlanToWatchAnimeList,
    ProfilePage,
    SignUpPage,
    WatchingAnimeList,
} from "../pages";

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
