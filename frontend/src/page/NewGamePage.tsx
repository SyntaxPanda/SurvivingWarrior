import React, {ChangeEvent, useState} from 'react';
import {useNavigate} from "react-router-dom";
import axios from "axios";

export default function NewGamePage() {
    const [name, setName] =
        useState("")

    const navigate = useNavigate();

    function setCharacterName(e: ChangeEvent<HTMLInputElement>) {
        setName(e.target.value)
    }

    function startNewGame() {
        axios.post("/api/character/newGame", {
            name
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
                    Story: Cave
                </div>
                <div>
                    <button>Start Game</button>
                </div>
            </form>
        </div>
    );
}
