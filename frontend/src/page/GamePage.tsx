import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {Game} from "../model/GameType";
import {Character} from "../model/CharacterType";
import {Story} from "../model/StoryType";
import "../css/GamePage.css"
import Modal from "react-modal";
import {Kobold} from "../model/KoboldType";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

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
        useState<Kobold>({id: "", name: "", damage: 0, life: 0, gold: 0})

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
        useState<Game>({username: "", gameId: "", gameName: "", characterId: "", storyId: ""})

    const params = useParams()
    const gameId: string | undefined = params.id;

    useEffect(() => {
        getGameById()
    }, []);

    useEffect(() => {
        setCharacterHpToMaxHp()
    }, [character.id])

    function setCharacterHpToMaxHp() {
        setMaxHp(character.life)
    }

    const [maxHp, setMaxHp] = useState(0)

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
                setRandomStory("")
                setKobolds(response.data.enemies)
            })
            .catch(error => console.error(error));
    }

    useEffect(() => {
        if (kobolds.at(0)) {
            setKobold1(kobolds[0])
            if (kobolds.at(1)) {
                setKobold2(kobolds[1])
                if (kobolds.at(2)) {
                    setKobold3(kobolds[2])
                }
            }
        }
    }, [kobolds])

    function onClickGetNextStoryChapterOption1() {
        if (story.option1 === "Hit") {
            if (kobold1.life > 0) {
                setKobold1({...kobold1, life: kobold1.life - character.damage})
                setCharacter({...character, life: character.life - kobold1.damage})
                toast("You hit the Enemy for " + character.damage + " points.")
                toast("The Enemy hit u for " + kobold1.damage + " points.")
                if (kobold1.life < 1) {
                    setCharacter({...character, gold: character.gold + kobold1.gold})
                } else if (character.life <= 0) {
                    toast("You are Done!")
                    axios.delete("/api/character/lost/" + character.id)
                        .then(() =>
                            axios.delete("/api/game/lost/" + game.gameId)
                                .then(() =>
                                    navigate("/start")
                                )
                        )
                }
            } else if (kobold2.life > 0) {
                setKobold2({...kobold2, life: kobold2.life - character.damage})
                setCharacter({...character, life: character.life - kobold2.damage})
                toast("You hit the Enemy for " + character.damage + " points.")
                toast("The Enemy hit u for " + kobold2.damage + " points.")
                if (kobold2.life <= 0) {
                    setCharacter({...character, gold: character.gold + kobold2.gold})
                } else if (character.life <= 0) {
                    toast("You are Done!")
                    axios.delete("/api/character/lost/" + character.id)
                        .then(() =>
                            axios.delete("/api/game/lost/" + gameId)
                                .then(() =>
                                    navigate("/start")
                                )
                        )
                }
            } else if (kobold3.life > 0) {
                setKobold3({...kobold3, life: kobold3.life - character.damage})
                setCharacter({...character, life: character.life - kobold3.damage})
                toast("You hit the Enemy for " + character.damage + " points.")
                toast("The Enemy hit u for " + kobold3.damage + " points.")
                if (kobold3.life <= 0) {
                    setCharacter({...character, gold: character.gold + kobold3.gold})
                } else if (character.life <= 0) {
                    toast("You are Done!")
                    axios.delete("/api/character/lost/" + character.id)
                        .then(() =>
                            axios.delete("/api/game/lost/" + gameId)
                                .then(() =>
                                    navigate("/start")
                                )
                        )
                }
            } else {
                setCharacter({
                    ...character,
                    gold: character.gold + kobold1.gold + kobold2.gold + kobold3.gold,
                    exp: character.exp + (3 * kobolds.length)
                })
                let gold = 0;
                gold = kobold1.gold + kobold2.gold + kobold3.gold
                toast("U got " + gold + " Gold and " + kobolds.length * 3 + " Exp")
                setStoryCount(storyCount + 1)
            }
        }
    }

    function onClickGetNextStoryChapterOption2() {
        if (story.option2 === "Block") {
            if (kobold1.life > 0) {
                setCharacter({...character, life: character.life - (kobold1.damage - 2)})
                toast("The Enemy hit u for " + (kobold1.damage - 2) + " points.")
                if (character.life <= 0) {
                    toast("You are Done!")
                    axios.delete("/api/character/lost/" + character.id)
                        .then(() =>
                            axios.delete("/api/game/lost/" + game.gameId)
                                .then(() =>
                                    navigate("/start")
                                )
                        )
                }
            } else if (kobold2.life > 0) {
                setCharacter({...character, life: character.life - (kobold2.damage - 2)})
                toast("The Enemy hit u for " + (kobold2.damage - 2) + " points.")
                if (character.life <= 0) {
                    toast("You are Done!")
                    axios.delete("/api/character/lost/" + character.id)
                        .then(() =>
                            axios.delete("/api/game/lost/" + game.gameId)
                                .then(() =>
                                    navigate("/start")
                                )
                        )
                }
            } else if (kobold3.life > 0) {
                setCharacter({...character, life: character.life - (kobold3.damage - 2)})
                toast("The Enemy hit u for " + (kobold3.damage - 2) + " points.")
                if (character.life <= 0) {
                    toast("You are Done!")
                    axios.delete("/api/character/lost/" + character.id)
                        .then(() =>
                            axios.delete("/api/game/lost/" + game.gameId)
                                .then(() =>
                                    navigate("/start")
                                )
                        )
                }
            } else {
                setCharacter({
                    ...character,
                    gold: character.gold + kobold1.gold + kobold2.gold + kobold3.gold,
                    exp: character.exp + (3 * kobolds.length)
                })
                setStoryCount(storyCount + 1)
            }
        }
    }

    function onClickGetNextStoryChapterOption3() {
        if (story.option3 === "Item") {
            if (kobold1.life > 0) {
                if (character.life < maxHp) {
                    setCharacter({...character, life: (character.life + 3) - kobold1.damage})
                    toast("The Enemy hit u for " + kobold1.damage + " points.")
                    toast("You heal ur self for " + 3 + " hp.")
                } else {
                    setCharacter({...character, life: character.life - kobold1.damage})
                    toast("The Enemy hit u for " + kobold1.damage + " points.")
                    toast("You have max life and cant heal.")

                }
                if (character.life <= 0) {
                    toast("You are Done!")
                    axios.delete("/api/character/lost/" + character.id)
                        .then(() =>
                            axios.delete("/api/game/lost/" + game.gameId)
                                .then(() =>
                                    navigate("/start")
                                )
                        )
                }
            } else if (kobold2.life > 0) {
                if (character.life < maxHp) {
                    setCharacter({...character, life: (character.life + 3) - kobold2.damage})
                    toast("The Enemy hit u for " + kobold2.damage + " points.")
                    toast("You heal ur self for " + 3 + " hp.")
                } else {
                    setCharacter({...character, life: character.life - kobold2.damage})
                    toast("The Enemy hit u for " + kobold2.damage + " points.")
                    toast("You have max life and cant heal.")
                }
                if (character.life <= 0) {
                    toast("You are Done!")
                    axios.delete("/api/character/lost/" + character.id)
                        .then(() =>
                            axios.delete("/api/game/lost/" + game.gameId)
                                .then(() =>
                                    navigate("/start")
                                )
                        )
                }
            } else if (kobold3.life > 0) {
                if (character.life < maxHp) {
                    setCharacter({...character, life: (character.life + 3) - kobold3.damage})
                    toast("The Enemy hit u for " + kobold3.damage + " points.")
                    toast("You heal ur self for " + 3 + " hp.")
                } else {
                    setCharacter({...character, life: character.life - kobold3.damage})
                    toast("The Enemy hit u for " + kobold3.damage + " points.")
                    toast("You have max life and cant heal.")
                }
                if (character.life <= 0) {
                    toast("You are Done!")
                    axios.delete("/api/character/lost/" + character.id)
                        .then(() =>
                            axios.delete("/api/game/lost/" + game.gameId)
                                .then(() =>
                                    navigate("/start")
                                )
                        )
                }
            } else {
                setCharacter({
                    ...character,
                    gold: character.gold + kobold1.gold + kobold2.gold + kobold3.gold,
                    exp: character.exp + (3 * kobolds.length)
                })
                setStoryCount(storyCount + 1)
            }
        }
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
            storyId: story.id,
            username: game.username
        })
            .then()
        navigate("/start")
    }

    function getAllGames() {
        axios.get("/api/game/all/" + game.username)
            .then(response =>
                setGames(response.data))
    }

    function goToMenu() {
        navigate("/start")
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

    const story1 = ["1-1", "1-2", "1-3", "1-4"]
    const story2 = ["2-1", "2-2", "2-3", "2-4"]
    const story3 = ["3-1", "3-2", "3-3", "3-4"]

    const [storyCount, setStoryCount] = useState(0)

    const [randomStory, setRandomStory] =
        useState<String | undefined>("")

    useEffect(() => {
        if (storyCount !== 0) {
            const newRandomStory = getRandomStoryById();
            setRandomStory(newRandomStory);
        }
    }, [storyCount]);

    useEffect(() => {
        if (randomStory) {
            axios.get("/api/story/" + randomStory)
                .then(response => {
                    setStory(response.data);
                    setKobolds(response.data.enemies);
                })
                .catch(error => {
                    console.error(error)
                });
        }
    }, [randomStory]);

    function getRandomStoryById() {
        let randomIndex;

        if (storyCount === 1) {
            randomIndex = Math.floor(Math.random() * story1.length);
            return story1[randomIndex];
        } else if (storyCount === 2) {
            randomIndex = Math.floor(Math.random() * story2.length);
            return story2[randomIndex];
        } else if (storyCount === 3) {
            randomIndex = Math.floor(Math.random() * story3.length);
            return story3[randomIndex];
        }
    }

    const [skillPoints, setSkillPoints] =
        useState(0)

    function getLevelUp() {
        if (character.exp >= 10) {
            setCharacter({...character, level: character.level + 1, exp: character.exp - 10})
            setSkillPoints(skillPoints + 5)
        }
    }

    useEffect(() => {
        getLevelUp()
    }, [character.exp])

    function increaseCharacterLife() {
        if (skillPoints > 0) {
            setCharacter({...character, life: character.life + 1})
            setSkillPoints(skillPoints - 1)
            setMaxHp(maxHp + 1)
        }
    }

    function increaseCharacterDmg() {
        if (skillPoints > 0) {
            setCharacter({...character, damage: character.damage + 1})
            setSkillPoints(skillPoints - 1)
        }
    }

    return (
        <div className={"gamePageBox"}>
            <Modal className={"modalMenu"} isOpen={isOpen}>
                <button onClick={openSaveGameModal}>Save</button>
                <Modal className={"modalSave"} isOpen={saveGameModal}>
                    {games.map((game) => {
                        return (
                            <div className={"save-content"}>
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
            <div className={"header"}>
                <div className={"menu"}>
                    <button onClick={openModal}>Menu</button>
                </div>
                {kobold1 && kobold1.life > 0 && (
                    <div className={"kobold1"}>
                        <div className={"koboldImage"}>
                        </div>
                        <div>
                            {kobold1.name}
                        </div>
                        <div>
                        </div>
                        <div>
                            {kobold1.life}
                        </div>
                    </div>
                )}
                {kobold2 && kobold2.life > 0 && (
                    <div className={"kobold2"}>
                        <div className={"koboldImage"}>
                        </div>
                        <div>
                            {kobold2.name}
                        </div>
                        <div></div>
                        <div>
                            {kobold2.life}
                        </div>
                    </div>
                )}
                {kobold3 && kobold3.life > 0 && (
                    <div className={"kobold3"}>
                        <div className={"koboldImage"}>
                        </div>
                        <div>
                            {kobold3.name}
                        </div>
                        <div></div>
                        <div>
                            {kobold3.life}
                        </div>
                    </div>
                )}
            </div>
            <div className={"lifeAndExpBox"}>
                <div className={"lifeBox"}>
                    {character.life} / {maxHp}
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
                                onClick={onClickGetNextStoryChapterOption1} >{story.option1}
                        </button>
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
                <div className={"skillPointBox"}>
                    <div className={"skillPointsboxName"}>
                        SkillPoints:
                    </div>
                    <div className={"skillPoints"}>
                        {skillPoints}
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
                        <button onClick={increaseCharacterLife}>+</button>
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
                        <button onClick={increaseCharacterDmg}>+</button>
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
            <ToastContainer
                position="bottom-left"
                autoClose={1300}
                hideProgressBar
                newestOnTop={false}
                rtl={false}
                pauseOnFocusLoss
                pauseOnHover
                theme="dark"
            />
        </div>
    );
}
