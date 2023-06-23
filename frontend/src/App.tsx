import React from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import StartPage from "./page/StartPage";
import NewGamePage from "./page/NewGamePage";
import GamePage from "./page/GamePage";
import useUser from "./hooks/useUser";
import LoginPage from "./page/LoginPage";
import ProtectedRoutes from "./page/ProtectedRoutes";
import RegisterPage from "./page/RegisterPage";

export default function App() {

    const {login, user} = useUser()

    return (
        <div className="App">

            <Routes>
                <Route path={"/start"} element={<StartPage/>}/>
                <Route path={"/register"} element={<RegisterPage/>}/>
                <Route path={"/login"} element={<LoginPage login={login}/>}/>
                <Route element={<ProtectedRoutes user={user}/>}>
                    <Route path={"/"} element={<StartPage/>}/>
                    <Route path={"/newgame"} element={<NewGamePage/>}/>
                    <Route path={"/game/:id"} element={<GamePage/>}/>
                </Route>
            </Routes>

        </div>
    );
}
