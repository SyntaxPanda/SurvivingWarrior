import React, {ChangeEvent, useState} from 'react';
import {useNavigate} from "react-router-dom";
import axios from "axios";

export default function NewGamePage() {
    const [name, setName] =
        useState("")

    const [storyMode, setStoryMode] =
        useState("")

    const navigate = useNavigate();

    function setCharacterName(e: ChangeEvent<HTMLInputElement>) {
        setName(e.target.value)
    }

    function choseCaveMode() {
        setStoryMode("Cave")
    }

    function choseForrestMode() {
        setStoryMode("Forrest")
    }

    function startNewGame() {
        axios.post("/api/character/newgame", {
            name: name
        })
            .catch(error => console.error(error.message))

        axios.post("/api/story/mode", {
            storyMode: storyMode
        })
            .catch(error => console.error(error.message))

        navigate("/gamepage")
    }

    return (
        <div>
            <form onSubmit={startNewGame}>
                <div>
                    <input type="text" placeholder={"Character Name"} onInput={setCharacterName}/>
                </div>
                <div>
                    <button onClick={choseCaveMode}>Cave</button>
                    <button onClick={choseForrestMode}>Forrest</button>
                </div>
                <div>
                    <button>Start Game</button>
                </div>
            </form>
        </div>
    );
}
