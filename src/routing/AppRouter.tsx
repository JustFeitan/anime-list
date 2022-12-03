import React from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import Layout from "../pages/Layout";
import HomePage from "../pages/HomePage/HomePage";
import AnimePage from "../pages/AnimesPage/AnimePage";
import MangaPage from "../pages/MangaPage";
import AnimeItemPage from "../pages/AnimeItemPage/AnimeItemPage";
import LoginPage from "../pages/LoginPage/LoginPage";
import {useAuth} from "../hooks/useAuth";
import SignUpPage from "../pages/SignUpPage/SignUpPage";
import ProfilePage from "../pages/ProfilePage/ProfilePage";
import RequireAuth from "../hoc/RequireAuth";


const AppRouter = () => {
    const isLoggedIn = useAuth()
    return (
        <Routes>
            <Route path='/' element={<Layout/>}>
                <Route index element={<HomePage/>}/>
                <Route path='anime' element={<AnimePage/>}/>
                <Route path='manga' element={<MangaPage/>}/>
                <Route path='anime/:title' element={<AnimeItemPage/>}/>
                <Route path='anime' element={<AnimeItemPage/>}/>
                <Route path='login' element={isLoggedIn ? <Navigate to='/' replace/> : <LoginPage/>}/>
                <Route path='signup' element={isLoggedIn ? <Navigate to='/' replace/> : <SignUpPage/>}/>
                <Route path=':username' element={
                    <RequireAuth>
                        <ProfilePage/>
                    </RequireAuth>
                }>

                </Route>
            </Route>
        </Routes>
    );
};

export default AppRouter;
