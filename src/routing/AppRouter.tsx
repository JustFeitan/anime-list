import React from 'react';
import {Route, Routes} from "react-router-dom";
import Layout from "../pages/Layout";
import HomePage from "../pages/HomePage/HomePage";
import AnimePage from "../pages/AnimesPage/AnimePage";
import MangaPage from "../pages/MangaPage";
import AnimeItemPage from "../pages/AnimeItemPage/AnimeItemPage";

const AppRouter = () => {
    return (
            <Routes>
                <Route path='/' element={<Layout/>}>
                    <Route index element={<HomePage/>}/>
                    <Route path='anime' element={<AnimePage/>}/>
                    <Route path='manga' element={<MangaPage/>}/>
                    <Route path='anime/:title' element={<AnimeItemPage/>}/>
                    <Route path='anime?' element={<AnimeItemPage/>}/>
                </Route>
            </Routes>
    );
};

export default AppRouter;
