import React, {ChangeEvent, FormEvent, useState} from 'react';
import {useNavigate} from "react-router-dom";
import axios from "axios";

export default function NewGamePage() {
    const [name, setName] =
        useState("")

    const [gameName, setGameName] =
    useState("")

    const navigate = useNavigate();

    function setCharacterName(es: ChangeEvent<HTMLInputElement>) {
        setName(es.target.value)
    }

    function setNameOfGame(e: ChangeEvent<HTMLInputElement>){
        setGameName(e.target.value)
        console.log(e.target.value)
    }

    function startNewGame(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        axios.post("/api/character/newchar", {
            name
        })
            .then(response => {

                axios.post('/api/game/new', {
                    gameName,
                    characterId: response.data.id,
                    storyId: "1-1"
                })
                    .then(response => {
                        navigate("/game/" + response.data.gameId);
                    })
                    .catch(error => {
                        // Fehlerbehandlung für den zweiten Axios-Aufruf
                        console.error(error);
                    });
            })
            .catch(error => {
                // Fehlerbehandlung für den ersten Axios-Aufruf
                console.error(error);
            });
    }


    return (
        <div>
            <form onSubmit={startNewGame}>
                <div>
                    <input type="text" placeholder={"Character Name"} value={name} onInput={setCharacterName}/>
                </div>
                <div>
                    <input type="text" placeholder={"Game Name"} value={gameName} onInput={setNameOfGame}/>
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
