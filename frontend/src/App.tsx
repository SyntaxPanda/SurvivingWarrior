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
import FirstPage from "./page/FirstPage";
import DeathPage from "./page/DeathPage";
import PatchNotes from "./page/PatchNotes";
import PatchNotePageLogin from "./page/PatchNotePageLogin";
import LeaderBoardPage from "./page/LeaderBoardPage";

export default function App() {

    const {login, user} = useUser()

    return (
        <div className="App">

            <Routes>
                <Route path={"/"} element={<FirstPage/>}/>
                <Route path={"/register"} element={<RegisterPage/>}/>
                <Route path={"/login"} element={<LoginPage login={login}/>}/>
                <Route path={"/patchNotes"} element={<PatchNotes/>}/>
                <Route element={<ProtectedRoutes user={user}/>}>
                    <Route path={"/leaderboard"} element={<LeaderBoardPage/>}/>
                    <Route path={"/patchNoteLogin"} element={<PatchNotePageLogin/>} />
                    <Route path={"/death"} element={<DeathPage/>}/>
                    <Route path={"/start"} element={<StartPage/>}/>
                    <Route path={"/newgame"} element={<NewGamePage/>}/>
                    <Route path={"/game/:id"} element={<GamePage/>}/>
                </Route>
            </Routes>

        </div>
    );
}
