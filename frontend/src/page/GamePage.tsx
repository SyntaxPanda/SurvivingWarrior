import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {Game} from "../model/GameType";
import {Character} from "../model/CharacterType";
import {Story} from "../model/StoryType";
import "../css/GamePage.css"
import Modal from "react-modal";
import {Kobold} from "../model/KoboldType";

Modal.setAppElement('#root');

export default function GamePage() {
    const navigate = useNavigate()

    const [games, setGames] = useState<Game[]>([])

    const [isOpen, setIsOpen] = useState(false)

    const [saveGameModal, setSaveGameModal] = useState(false)

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

    const [kobold1, setKobold1] =
        useState<Kobold>({damage: 0, gold: 0, id: "", life: 0, name: ""})

    const [kobold2, setKobold2] =
        useState<Kobold>({damage: 0, gold: 0, id: "", life: 0, name: ""})

    const [kobold3, setKobold3] =
        useState<Kobold>({damage: 0, gold: 0, id: "", life: 0, name: ""})

    const [kobolds, setKobolds] =
        useState<Kobold[]>([])

    const [story, setStory] =
        useState<Story>({
            name: "",
            id: "",
            storyText: "",
            option1: "",
            option2: "",
            option3: "",
            enemies: []
        })

    const [game, setGame] =
        useState<Game>({gameId: "", gameName: "", characterId: "", storyId: ""})

    const params = useParams()
    const gameId: string | undefined = params.id;

    useEffect(() => {
        getGameById()
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
            .then(() => axios.get("/api/story/" + storyId))
            .then(response => {
                setStory(response.data)
                setKobolds(response.data.enemies)
                setRandomStory("")
                if (kobolds.at(0)) {
                    setKobold1(kobolds.at(0))
                    if (kobolds.at(1)) {
                        setKobold2(kobolds.at(1))
                        if (kobolds.at(2)) {
                            setKobold3(kobolds.at(2))
                        }
                    }
                }
            })
            .catch(error => console.error(error));
        console.log(kobold3)
    }

    const story1 = ["1-1", "1-2", "1-3", "1-4"]
    const story2 = ["2-1", "2-2", "2-3", "2-4"]
    const story3 = ["3-1", "3-2", "3-3", "3-4"]

    let storyCount = 0

    const [randomStory, setRandomStory] =
        useState("")

    function getRandomString(strings: string[]): string {
        const randomString = strings[Math.floor(Math.random() * strings.length)];
        return randomString;
    }

    function getRandomStoryById() {
        if (storyCount === 1) {
            setRandomStory(getRandomString(story1))
        } else if (storyCount === 2) {
            setRandomStory(getRandomString(story2))
        } else if (storyCount === 3) {
            setRandomStory(getRandomString(story3))
        }
    }

    function onClickGetNextStoryChapterOption1() {
        if (story.option1 === "Hit") {
            if (kobold1.life > 0) {
                kobold1.life = kobold1.life - character.damage
                character.life = character.life - kobold1.damage
                if (kobold1.life <= 0) {
                    character.gold = character.gold + kobold1.gold
                } else if (character.life <= 0) {
                    axios.delete("/api/character/lost/" + character.id)
                        .then(() =>
                            axios.delete("/api/game/lost/" + gameId)
                                .then(() =>
                                    navigate("/")
                                )
                        )
                }
            } else if (kobold2.life > 0) {
                kobold2.life = kobold2.life - character.damage
                character.life = character.life - kobold2.damage
                if (kobold2.life <= 0) {
                    character.gold = character.gold + kobold2.gold
                } else if (character.life <= 0) {
                    axios.delete("/api/character/lost/" + character.id)
                        .then(() =>
                            axios.delete("/api/game/lost/" + gameId)
                                .then(() =>
                                    navigate("/")
                                )
                        )
                }
            } else if (kobold3.life > 0) {
                kobold3.life = kobold3.life - character.damage
                character.life = character.life - kobold3.damage
                if (kobold3.life <= 0) {
                    character.gold = character.gold + kobold3.gold
                } else if (character.life <= 0) {
                    axios.delete("/api/character/lost/" + character.id)
                        .then(() =>
                            axios.delete("/api/game/lost/" + gameId)
                                .then(() =>
                                    navigate("/")
                                )
                        )
                }
            } else {
                storyCount = storyCount + 1
                getRandomStoryById()
                axios.get("/api/story/" + randomStory)
                    .then(response => {
                        setStory(response.data)
                        setKobolds(response.data.enemies)
                    })
            }
        } else if (story.option1 === "Search1") {
            storyCount = storyCount + 1
            getRandomStoryById()
            axios.get("/api/story/" + randomStory)
                .then(response => {
                    setStory(response.data)
                    setKobolds(response.data.enemies)
                })
        }
    }

    function onClickGetNextStoryChapterOption2() {
        if (story.option2 === "Block") {
            if (kobold1.life > 0) {
                character.life = character.life - (kobold1.damage - 2)
                if (character.life <= 0) {
                    axios.delete("/api/character/lost/" + character.id)
                        .then(() =>
                            axios.delete("/api/game/lost/" + game.gameId)
                                .then(() =>
                                    navigate("/")
                                )
                        )
                }
            }
            else if (kobold2.life > 0) {
                character.life = character.life - (kobold2.damage - 2)
                if (character.life <= 0) {
                    axios.delete("/api/character/lost/" + character.id)
                        .then(() =>
                            axios.delete("/api/game/lost/" + game.gameId)
                                .then(() =>
                                    navigate("/")
                                )
                        )
                }
            }
            else if (kobold3.life > 0) {
                character.life = character.life - (kobold3.damage - 2)
                if (character.life <= 0) {
                    axios.delete("/api/character/lost/" + character.id)
                        .then(() =>
                            axios.delete("/api/game/lost/" + game.gameId)
                                .then(() =>
                                    navigate("/")
                                )
                        )
                }
            } else {
                storyCount = storyCount + 1
                getRandomStoryById()
                axios.get("/api/story/" + randomStory)
                    .then(response => {
                        setStory(response.data)
                        setKobolds(response.data.enemies)
                    })
            }
        } else if (story.option2 === "Search2") {
            storyCount = storyCount + 1
            getRandomStoryById()
            axios.get("/api/story/" + randomStory)
                .then(response => {
                    setStory(response.data)
                    setKobolds(response.data.enemies)
                })
        }
    }

    function onClickGetNextStoryChapterOption3() {
        if (story.option3 === "Item") {
            if (kobold1.life > 0) {
                character.life = character.life + 3
                character.life = character.life - kobold1.damage
                if (character.life <= 0) {
                    axios.delete("/api/character/lost/" + character.id)
                        .then(() =>
                            axios.delete("/api/game/lost/" + game.gameId)
                                .then(() =>
                                    navigate("/")
                                )
                        )
                }
            }
            else if (kobold2.life > 0) {
                character.life = character.life + 3
                character.life = character.life - kobold2.damage
                if (character.life <= 0) {
                    axios.delete("/api/character/lost/" + character.id)
                        .then(() =>
                            axios.delete("/api/game/lost/" + game.gameId)
                                .then(() =>
                                    navigate("/")
                                )
                        )
                }
            }
            else if (kobold3.life > 0) {
                character.life = character.life + 3
                character.life = character.life - kobold3.damage
                if (character.life <= 0) {
                    axios.delete("/api/character/lost/" + character.id)
                        .then(() =>
                            axios.delete("/api/game/lost/" + game.gameId)
                                .then(() =>
                                    navigate("/")
                                )
                        )
                }
            } else {
                storyCount = storyCount + 1
                getRandomStoryById()
                axios.get("/api/story/" + randomStory)
                    .then(response => {
                        setStory(response.data)
                        setKobolds(response.data.enemies)
                    })
            }
        } else if (story.option3 === "Search3") {
            storyCount = storyCount + 1
            getRandomStoryById()
            axios.get("/api/story/" + randomStory)
                .then(response => {
                    setStory(response.data)
                    setKobolds(response.data.enemies)
                })
        }
    }

    function openModal() {
        setIsOpen(true)
    }

    function closeModal() {
        setIsOpen(false)
    }

    function openSaveGameModal() {
        setSaveGameModal(true)
        getAllGames()
    }

    function closeSaveGameModal() {
        setSaveGameModal(false)
    }

    function saveGame() {
        axios.put("/api/character/" + character.id, {
            name: character.name,
            id: character.id,
            level: character.level,
            exp: character.exp,
            life: character.life,
            damage: character.damage,
            gold: character.gold
        }).catch(error => console.log(error))

        axios.put("/api/game/save", {
            gameId: game.gameId,
            gameName: game.gameName,
            characterId: character.id,
            storyId: story.id
        })
            .then()
        navigate("/")
    }

    function getAllGames() {
        axios.get("/api/game/all")
            .then(response =>
                setGames(response.data))
    }

    function goToMenu() {
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
            <div className={"enemies"}>
                {kobolds.map((kobold: Kobold) => {
                    if (kobold.life > 0) {
                        return (
                            <div className={"koboldInfos"}>
                                <div className={"enemy1"}>
                                    {kobold.name}
                                    {kobold.life}
                                </div>
                            </div>
                        )
                    }
                })}
            </div>
            <div className={"lifeAndExpBox"}>
                <div className={"lifeBox"}>
                    {character.life} / {character.life}
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
                </div>
                <div className={"storyText"}>
                    <p>{story.storyText}</p>
                </div>
                <div className={"storyButtons"}>
                    <div className={"button1"}>
                        <button className={"buttonHover"}
                                onClick={onClickGetNextStoryChapterOption1}>{story.option1}</button>
                    </div>
                    <div className={"button2"}>
                        <button className={"buttonHover"}
                                onClick={onClickGetNextStoryChapterOption2}>{story.option2}</button>
                    </div>
                    <div className={"button3"}>
                        <button className={"buttonHover"}
                                onClick={onClickGetNextStoryChapterOption3}>{story.option3}</button>
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
