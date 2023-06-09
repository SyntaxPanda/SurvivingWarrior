import React from 'react';
import {useNavigate} from "react-router-dom";

export default function NewGamePage() {
    const navigate = useNavigate();

    function onClickNavigateToGamePage(){
        navigate("/gamepage")
    }

    return (
        <div>
            <div>
                <button onClick={onClickNavigateToGamePage}>Start Game</button>
            </div>
        </div>
    );
}
