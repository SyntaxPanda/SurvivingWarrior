import React, {ChangeEvent, useState} from 'react';
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {Game} from "../model/GameType";
import {Story} from "../model/StoryType";
import {Character} from "../model/CharacterType";

export default function NewGamePage() {
    const [name, setName] =
        useState("")

    const [gameName, setGameName] =
    useState("")

    const [character, setCharacter] =
    useState<Character>({
        actualChapter: "",
        damage: 0,
        exp: 0,
        gold: 0,
        id: "",
        level: 0,
        life: 0,
        name: ""})

    const [story, setStory] =
    useState<Story>({
        chapter: "",
        id: "",
        image: "",
        name: "",
        option1: "",
        option2: "",
        option3: "",
        option4: "",
        storyText: ""
    })

    const [game, setGame] =
    useState<Game>({character: character, story: story, id: "", gameName:""})

    const navigate = useNavigate();

    function setCharacterName(e: ChangeEvent<HTMLInputElement>) {
        setName(e.target.value)
    }

    function setNameGameName(e: ChangeEvent<HTMLInputElement>){
        setGameName(e.target.value)
    }

    function startNewGame() {
        axios.post("/api/character/newGame", {
            name
        })
            .then(response =>{
                setCharacter(response.data)
            })
            .catch(error => console.error(error.message))

        axios.get("/api/story/newStory")
            .then(response =>
            setStory(response.data)
            )

        axios.post("/api/game/newGame", {
            gameName,
            character,
            story
        })
            .then(response =>{
                setGame(response.data)
            })

        navigate("/game/" + game.id)
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
