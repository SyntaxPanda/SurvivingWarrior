import React, {ChangeEvent, FormEvent, useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import axios from "axios";
import "../css/NewGamePage.css"
import {toast, ToastContainer} from "react-toastify";

export default function NewGamePage() {
    const [name, setName] =
        useState("")

    const [gameName, setGameName] =
        useState("")

    const navigate = useNavigate();

    function setCharacterName(es: ChangeEvent<HTMLInputElement>) {
        setName(es.target.value)
    }

    function setNameOfGame(e: ChangeEvent<HTMLInputElement>) {
        setGameName(e.target.value)
        console.log(e.target.value)
    }

    const [username, setUsername] =
        useState("")

    function getUserName() {
        axios.get("/api/user/username")
            .then(response => {
                setUsername(response.data)
            })
    }

    useEffect(() => {
        getUserName()
    }, [])

    function startNewGame(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (name.length >= 4) {
            if (gameName.length >= 4) {
                axios.post("/api/character/newchar", {
                    name
                })
                    .then(response => {

                        axios.post('/api/game/new', {
                            gameName,
                            characterId: response.data.id,
                            storyId: "1",
                            username: username
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
            } else {
                toast("The GameName need 4 or more letters")
            }
        } else {
            toast("The CharacterName need 4 or more letters")

        }
    }

    function backToMenu() {
        navigate("/start")
    }


    return (
        <div className={"newGamePage"}>

            <form className={"formNewGamePage"} onSubmit={startNewGame}>
                <div className={"characterNameNewGamePage"}>
                    <input type="text" placeholder={"Character Name"} value={name} onInput={setCharacterName}/>
                </div>
                <div className={"gameNameNewGamePage"}>
                    <input type="text" placeholder={"Game Name"} value={gameName} onInput={setNameOfGame}/>
                </div>
                <div className={"storyPlaceNewGamePage"}>
                    Story: Cave
                </div>
                <div className={"startGameNewGamePage"}>
                    <button>Start Game</button>
                </div>
            </form>

            <div className={"backButtonNewGamePage"}>
                <button onClick={backToMenu}>Back</button>
            </div>
            <ToastContainer
                position="top-center"
                autoClose={1500}
                hideProgressBar
                newestOnTop={false}
                rtl={false}
                pauseOnFocusLoss
                pauseOnHover
                theme="dark"
                style={{width: "20vw"}}
                limit={1}
            />
        </div>
    );
}
