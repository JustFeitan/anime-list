import React from 'react';
import Header from "../components/Header/Header";
import {Outlet} from "react-router-dom";
import './Layout.scss'
import {ToastContainer} from "react-toastify";



const Layout = () => {


    return (
        <div className='app'>
            <Header/>
            <main className='main'>
                <Outlet/>
                <ToastContainer hideProgressBar limit={1} autoClose={1000}/>
            </main>
        </div>

    );
};

export default Layout;
