import React, {useEffect} from 'react';
import './App.scss';
import AppRouter from "./routing/AppRouter";
import {useAuth} from "./hooks/useAuth";
import {Cookies, useCookies} from "react-cookie";
import {useAppDispatch, useAppSelector} from "./hooks/redux";
import {authActions} from "./store/reducers/auth";
import Loader from "./components/UI/Loader/Loader";


function App() {

  const [cookies] = useCookies(['jwt-token', 'user']);
  const dispatch = useAppDispatch();


  // useEffect(() => {
  //     if (cookies["jwt-token"] && cookies['user']) {
  //       dispatch(authActions.setUser(cookies['user']))
  //     }
  // }, [])



  return (
        <AppRouter/>
  );
}

export default App;
