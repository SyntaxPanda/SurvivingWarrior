import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import axios from "axios";
import {Game} from "../model/GameType";
import {Character} from "../model/CharacterType";
import {Story} from "../model/StoryType";

export default function GamePage() {

    const [charId, setCharId] =
    useState("")

    const [storyId, setStoryId] =
    useState("")


    const [character, setCharacter] =
        useState<Character>({
            damage: 0,
            exp: 0,
            gold: 0,
            characterId: "",
            level: 0,
            life: 0,
            name: "",
            item: []
        })

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
        useState<Game>({gameId: "", gameName: "", characterId: "", story: ""})

    const params = useParams()
    const gameId: string | undefined = params.id;

    function getGameById() {
        axios.get("/api/game/" + gameId)
            .then(response =>
                setGame(response.data))
            .catch(error => console.error(error))
        setCharId(game.characterId)
        setStoryId(game.story)
    }

    useEffect(() => {
        axios.get("/api/character/" + charId)
            .then(response => {
                setCharacter(response.data)
            })
    })

    useEffect(() => {
        axios.get("/api/story/" + storyId)
            .then(response => {
                setStory(response.data)
            })
    })

    useEffect(getGameById)

    return (
        <div>
            <div className={"menu"}>
                <button>Menu</button>
            </div>
            <div className={"storyBox"}>
                <div className={"storyImage"}>
                    {story.image}
                </div>
                <div className={"storyText"}>
                    {story.storyText}
                </div>
                <div className={"storyButtons"}>
                    <div className={"button1"}>
                        {story.option1}
                    </div>
                    <div className={"button2"}>
                        {story.option2}
                    </div>
                    <div className={"button3"}>
                        {story.option3}
                    </div>
                    <div className={"button4"}>
                        {story.option4}
                    </div>
                </div>
            </div>
            <div className={"lifeAndExpBox"}>
                <div className={"lifeBox"}>
                    {character.life}
                </div>
                <div className={"expBox"}>
                    {character.exp}
                </div>
            </div>
            <div className={"characterBox"}>
                <div className={"characterName"}>
                    {character.name}
                </div>
                <div className={"levelBox"}>
                    {character.exp}
                </div>
                <div className={"characterLife"}>
                    {character.life}
                    <div className={"buttonLifeUp"}>
                        <button>+</button>
                    </div>
                </div>
                <div className={"characterDmg"}>
                    {character.damage}
                    <div className={"buttonDmgUp"}>
                        <button>+</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
