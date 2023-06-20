import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {Game} from "../model/GameType";
import {Character} from "../model/CharacterType";
import {Story} from "../model/StoryType";
import "../css/GamePage.css"
import Modal from "react-modal";

Modal.setAppElement('#root');

export default function GamePage() {
    const navigate = useNavigate()

    const[games, setGames] = useState<Game[]>([])

    const[isOpen, setIsOpen] = useState(false)

    const [saveGameModal ,setSaveGameModal] = useState(false)

    const [character, setCharacter] =
        useState<Character>({
            damage: 0,
            exp: 0,
            gold: 0,
            id: "",
            level: 0,
            life: 0,
            name: "",
            item: []
        })

    const [story, setStory] =
        useState<Story>({
            name: "",
            id: "",
            image: "",
            storyText: "",
            option1: "",
            option2: "",
            option3: "",
            option4: "",
        })

    const [game, setGame] =
        useState<Game>({gameId: "", gameName: "", characterId: "", storyId: ""})

    const params = useParams()
    const gameId: string | undefined = params.id;

    useEffect(() => {getGameById()
    }, []);

    function getGameById() {
        let charId = ""
        let storyId = ""
        axios.get("/api/game/" + gameId)
            .then(response => {
                setGame(response.data);
                charId = response.data.characterId
                storyId = response.data.storyId
            })
            .then(() => axios.get("/api/character/" + charId))
            .then(response => {
                setCharacter(response.data);
            })
            .then(() =>  axios.get("/api/story/" + storyId))
                .then(response =>{
                    setStory(response.data)
                })
            .catch(error => console.error(error));
    }

    function onClickGetNextStoryChapterOption1() {
        axios.get("/api/story/" + story.option1)
            .then(response =>
                setStory(response.data))
            .catch(error => console.error(error))
    }

    function onClickGetNextStoryChapterOption2(){
            axios.get("/api/story/" + story.option2)
                .then(response =>
                    setStory(response.data))
                .catch(error => console.error(error))
    }

    function onClickGetNextStoryChapterOption3(){
            axios.get("/api/story/" + story.option3)
                .then(response =>
                    setStory(response.data))
                .catch(error => console.error(error))
    }

    function onClickGetNextStoryChapterOption4(){
        axios.get("/api/story/" + story.option4)
            .then(response =>
                setStory(response.data))
            .catch(error => console.error(error))
    }

    function openModal(){
        setIsOpen(true)
    }

    function closeModal(){
        setIsOpen(false)
    }

    function openSaveGameModal(){
        setSaveGameModal(true)
        getAllGames()
    }

    function closeSaveGameModal(){
        setSaveGameModal(false)
    }

    function saveGame(){
        axios.put("/api/game/save", {
            gameId: game.gameId,
            gameName: game.gameName,
            characterId: character.id,
            storyId: story.id
        })
            .then()
            navigate("/")
    }

    function getAllGames(){
        axios.get("/api/game/all")
            .then(response =>
            setGames(response.data))
    }

    function goToMenu(){
        navigate("/")
    }

    return (
        <div className={"gamePageBox"}>
            <Modal isOpen={isOpen}>
                <button onClick={openSaveGameModal}>Save</button>
                <Modal isOpen={saveGameModal}>
                    {games.map((game) => {
                        return (
                            <div className={"post-content"}>
                                    <h3>{game.gameName}</h3>
                                    <p>{game.storyId}</p>
                            </div>
                        );
                    })}
                    <button onClick={saveGame}>Save now</button>
                    <button onClick={closeSaveGameModal}>Close</button>
                </Modal>
                <button onClick={goToMenu}>Menu</button>
                <button onClick={closeModal}>close</button>
            </Modal>
            <div className={"menu"}>
                <button onClick={openModal}>Menu</button>
            </div>
            <div className={"lifeAndExpBox"}>
                <div className={"lifeBox"}>
                    {character.life} /  {character.life}
                </div>
                <div className={"expBox"}>
                    {character.exp} / 10
                </div>
            </div>
            <div className={"storyBox"}>
                <div className={"storyName"}>
                    {story.name}
                </div>
                <div className={"storyImage"}>
                    <img src={story.image} alt="Bild"/>
                </div>
                <div className={"storyText"}>
                    <p>{story.storyText}</p>
                </div>
                <div className={"storyButtons"}>
                    <div className={"button1"}>
                        <button className={"buttonHover"} onClick={onClickGetNextStoryChapterOption1}>{story.option1}</button>
                    </div>
                    <div className={"button2"}>
                        <button className={"buttonHover"} onClick={onClickGetNextStoryChapterOption2}>{story.option2}</button>
                    </div>
                    <div className={"button3"}>
                        <button className={"buttonHover"} onClick={onClickGetNextStoryChapterOption3}>{story.option3}</button>
                    </div>
                    <div className={"button4"}>
                        <button className={"buttonHover"} onClick={onClickGetNextStoryChapterOption4}>{story.option4}</button>
                    </div>
                </div>
            </div>
            <div className={"characterBox"}>
                <div className={"characterName"}>
                    {character.name}
                </div>
                <div className={"levelBox"}>
                    <div className={"levelString"}>
                        Level:
                    </div>
                    <div className={"levelStat"}>
                   {character.level}
                    </div>
                </div>
                <div className={"characterLifeBox"}>
                    <div className={"characterLifeString"}>
                        Character-Life:
                    </div>
                    <div className={"characterLifeStat"}>
                    {character.life}
                    </div>
                        <div className={"buttonLifeUp"}>
                        <button>+</button>
                    </div>
                </div>
                <div className={"characterDmgBox"}>
                    <div className={"characterDmgString"}>
                        Character-Damage:
                    </div>
                    <div className={"characterDmg"}>
                    {character.damage}
                    </div>
                    <div className={"buttonDmgUp"}>
                        <button>+</button>
                    </div>
                </div>
                <div className={"characterGoldBox"}>
                    <div className={"characterGoldString"}>
                        Gold:
                    </div>
                    <div className={"characterGold"}>
                        {character.gold}
                    </div>
                </div>
            </div>
        </div>
    );
}
