import React from 'react';
import "../css/StartPage.css"
import {useNavigate} from "react-router-dom";

export default function StartPage() {
    const navigate = useNavigate();

    function onClickNavigateToNewGamePage(){
        navigate("/newgame")
    }

    return (
        <div>
            <div className={"NewGameButton"}>
                <button onClick={onClickNavigateToNewGamePage}>New Game</button>
            </div>
        </div>
    );
}
