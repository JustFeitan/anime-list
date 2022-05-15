import React from 'react';
import {Route, Routes} from "react-router-dom";
import Layout from "../pages/Layout";
import HomePage from "../pages/HomePage/HomePage";
import AnimePage from "../pages/AnimePage/AnimePage";

const AppRouter = () => {
    return (
            <Routes>
                <Route path='/' element={<Layout/>}>
                    <Route index element={<HomePage/>}/>
                    <Route path='anime' element={<AnimePage/>}/>
                </Route>
            </Routes>
    );
};

export default AppRouter;
