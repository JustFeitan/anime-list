import React from 'react';
import {Route, Routes} from "react-router-dom";
import Layout from "../pages/Layout";
import HomePage from "../pages/HomePage/HomePage";

const AppRouter = () => {
    return (
            <Routes>
                <Route path='/' element={<Layout/>}>
                    <Route index element={<HomePage/>}/>
                </Route>
            </Routes>
    );
};

export default AppRouter;
