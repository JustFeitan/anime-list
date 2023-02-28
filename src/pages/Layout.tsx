import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Header from "../components/Header/Header";

import "./Layout.scss";

const Layout = () => {
    return (
        <div className="app">
            <Header />
            <main className="main">
                <Suspense fallback={<h1>Loading...</h1>}>
                    <Outlet />
                </Suspense>
                <ToastContainer hideProgressBar limit={1} autoClose={1000} />
            </main>
        </div>
    );
};

export default Layout;
