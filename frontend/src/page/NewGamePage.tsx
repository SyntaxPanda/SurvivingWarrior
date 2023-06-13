import React, {ChangeEvent, FormEvent, useState} from 'react';
import {useNavigate} from "react-router-dom";
import axios from "axios";

export default function NewGamePage() {
    const [name, setName] =
        useState("")

    const [gameName, setGameName] =
    useState("")

    const [characterId, setCharacterId] =
    useState("")

    const [storyId, setStoryId] =
    useState("")

    const navigate = useNavigate();

    function setCharacterName(e: ChangeEvent<HTMLInputElement>) {
        setName(e.target.value)
    }

    function setNameGameName(e: ChangeEvent<HTMLInputElement>){
        setGameName(e.target.value)
    }

    function createCharacter(){
        axios.post("/api/character/newchar", {
            name
        })
            .then(response =>{
                setCharacterId(response.data.characterId)
            })
    }

    function newStory(){
        axios.get("/api/story/newStory")
            .then(response =>
                setStoryId(response.data.id)
            )
    }

    function startNewGame(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        createCharacter()
        axios.post('/api/game/new', {
            gameName: gameName,
            characterId: characterId,
            storyId: storyId
        })
            .then(response =>
                navigate("/game/" + response.data.gameId)
            )
    }

    return (
        <div>
            <form onSubmit={startNewGame}>
                <div>
                    <input type="text" placeholder={"Game Name"} onInput={setNameGameName}/>
                </div>
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
