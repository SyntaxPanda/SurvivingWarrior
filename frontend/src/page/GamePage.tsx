import React, {useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from "react-router-dom";
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
            maxLife: 0,
            skillPoints: 0,
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
                                    setTimeout(() => {
                                        navigate("/start")
                                    }, 2000)
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
                                    setTimeout(() => {
                                        navigate("/start")
                                    }, 2000)
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
                                    setTimeout(() => {
                                        navigate("/start")
                                    }, 2000)
                                )
                        )
                }
            } else {
                setCharacter({
                    ...character,
                    gold: character.gold + kobold1.gold + kobold2.gold + kobold3.gold,
                    exp: character.exp + (3 * kobolds.length)
                })
                toast("U got " + (kobold1.gold + kobold2.gold + kobold3.gold) + " Gold and " + kobolds.length * 3 + " Exp")
                setStoryCount(storyCount + 1)
            }
        } else if (story.option1 === "Get Heal for Gold") {
            let price = Math.round(Math.floor(Math.random() * (45 - 1 + 25)))
            if (character.gold >= price) {
                let getMaxLife = Math.round(Math.floor(Math.random() * (30 - 1 + 15)))
                setCharacter({...character, life: character.life + getMaxLife, gold: character.gold - price})
                toast("U got " + getMaxLife + " Life and pay " + price + " Gold for this")
                setStoryCount(storyCount + 1)
            } else {
                toast("U have not enough Gold to buy this for " + price + " Gold")
            }
        }
    }

    function onClickGetNextStoryChapterOption2() {
        if (story.option2 === "Block") {
            if (kobold1.life > 0) {
                let block = Math.round(Math.floor(Math.random() * (6 - 1 + 1)))
                setCharacter({...character, life: character.life - (kobold1.damage - block)})
                toast("The Enemy hit u for " + (kobold1.damage - block) + " points. U blocked " + block + " damage.")
                if (character.life <= 0) {
                    toast("You are Done!")
                    axios.delete("/api/character/lost/" + character.id)
                        .then(() =>
                            axios.delete("/api/game/lost/" + game.gameId)
                                .then(() =>
                                    setTimeout(() => {
                                        navigate("/start")
                                    }, 2000)
                                )
                        )
                }
            } else if (kobold2.life > 0) {
                let block = Math.round(Math.floor(Math.random() * (6 - 1 + 1)))
                setCharacter({...character, life: character.life - (kobold2.damage - block)})
                toast("The Enemy hit u for " + (kobold2.damage - block) + " points. U blocked " + block + " damage.")
                if (character.life <= 0) {
                    toast("You are Done!")
                    axios.delete("/api/character/lost/" + character.id)
                        .then(() =>
                            axios.delete("/api/game/lost/" + game.gameId)
                                .then(() =>
                                    setTimeout(() => {
                                        navigate("/start")
                                    }, 2000)
                                )
                        )
                }
            } else if (kobold3.life > 0) {
                let block = Math.round(Math.floor(Math.random() * (6 - 1 + 1)))
                setCharacter({...character, life: character.life - (kobold3.damage - block)})
                toast("The Enemy hit u for " + (kobold3.damage - block) + " points. U blocked " + block + " damage.")
                if (character.life <= 0) {
                    toast("You are Done!")
                    axios.delete("/api/character/lost/" + character.id)
                        .then(() =>
                            axios.delete("/api/game/lost/" + game.gameId)
                                .then(() =>
                                    setTimeout(() => {
                                        navigate("/start")
                                    }, 2000)
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
        } else if (story.option2 === "Get damage for Gold") {
            let price = Math.round(Math.floor(Math.random() * (20 - 2 + 1)))
            if (character.gold >= price) {
                let getDamage = Math.round(Math.floor(Math.random() * (6 - 1 + 1)))
                setCharacter({...character, damage: character.damage + getDamage, gold: character.gold - price})
                toast("U got " + getDamage + " max damage and pay " + price + " Gold for this")
                setStoryCount(storyCount + 1)
            } else {
                toast("U have not enough Gold to buy this for " + price + " Gold")
            }
        }
    }

    function onClickGetNextStoryChapterOption3() {
        if (story.option3 === "Item") {
            if (kobold1.life > 0) {
                if (character.life < character.maxLife) {
                    setCharacter({
                        ...character,
                        life: (character.life + (Math.round(Math.floor(Math.random() * (8 - 1 + 1))))) - kobold1.damage
                    })
                    toast("The Enemy hit u for " + kobold1.damage + " points.")
                    toast("You heal ur self for hp.")
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
                                    setTimeout(() => {
                                        navigate("/start")
                                    }, 2000)
                                )
                        )
                }
            } else if (kobold2.life > 0) {
                if (character.life < character.maxLife) {
                    setCharacter({
                        ...character,
                        life: (character.life + (Math.round(Math.floor(Math.random() * (8 - 1 + 1))))) - kobold2.damage
                    })
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
                                    setTimeout(() => {
                                        navigate("/start")
                                    }, 2000)
                                )
                        )
                }
            } else if (kobold3.life > 0) {
                if (character.life < character.maxLife) {
                    setCharacter({
                        ...character,
                        life: (character.life + (Math.round(Math.floor(Math.random() * (8 - 1 + 1))))) - kobold3.damage
                    })
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
                                    setTimeout(() => {
                                        navigate("/start")
                                    }, 2000)
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
        } else if (story.option3 === "Dont buy something") {
            setStoryCount(storyCount + 1)
        }
    }

    function saveGame() {
        axios.put("/api/character/" + character.id, {
            name: character.name,
            id: character.id,
            level: character.level,
            exp: character.exp,
            skillPoints: character.skillPoints,
            life: character.life,
            maxLife: character.maxLife,
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
    const story4 = ["4"]
    const story5 = ["5-1", "5-2", "5-3", "5-4"]
    const story6 = ["6-1", "6-2", "6-3", "6-4"]
    const story7 = ["7-1", "7-2", "7-3", "7-4"]
    const story8 = ["8"]
    const story9 = ["9-1", "9-2", "9-3", "9-4"]
    const story10 = ["10-1", "10-2", "10-3", "10-4"]


    const [storyCount, setStoryCount] = useState(0)

    const [randomStory, setRandomStory] =
        useState<String | undefined>("")

    useEffect(() => {
        if (storyCount !== 0) {
            const newRandomStory = getRandomStoryById();
            setRandomStory(newRandomStory);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
        } else if (storyCount === 4) {
            randomIndex = Math.floor(Math.random() * story4.length);
            return story4[randomIndex];
        } else if (storyCount === 5) {
            randomIndex = Math.floor(Math.random() * story5.length);
            return story5[randomIndex];
        } else if (storyCount === 6) {
            randomIndex = Math.floor(Math.random() * story6.length);
            return story6[randomIndex];
        } else if (storyCount === 7) {
            randomIndex = Math.floor(Math.random() * story7.length);
            return story7[randomIndex];
        } else if (storyCount === 8) {
            randomIndex = Math.floor(Math.random() * story8.length);
            return story8[randomIndex];
        } else if (storyCount === 9) {
            randomIndex = Math.floor(Math.random() * story9.length);
            return story9[randomIndex];
        } else if (storyCount === 10) {
            randomIndex = Math.floor(Math.random() * story10.length);
            return story10[randomIndex];
        }
    }

    function getLevelUp() {
        if (character.exp >= 10) {
            setCharacter({
                ...character,
                level: character.level + 1,
                exp: character.exp - 10,
                skillPoints: character.skillPoints + 5
            })
        }
    }

    useEffect(() => {
        getLevelUp()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [character.exp])

    function increaseCharacterLife() {
        if (character.skillPoints > 0) {
            setCharacter({
                ...character,
                life: character.life + 1,
                maxLife: character.maxLife + 1,
                skillPoints: character.skillPoints - 1
            })
        }
    }

    function increaseCharacterDmg() {
        if (character.skillPoints > 0) {
            setCharacter({...character, damage: character.damage + 1, skillPoints: character.skillPoints - 1})
        }
    }

    return (
        <div className={"gamePageBox"}>
            <Modal className={"modalMenu"} isOpen={isOpen}>
                <button onClick={openSaveGameModal}>Save</button>
                <Modal className={"modalLoadGame"} isOpen={saveGameModal}>
                    <div className="container">
                        {games.map((game) => (
                            <Link to={"/game/" + game.gameId} onClick={() => {
                            }}>
                                <div className="card" key={game.gameId}>
                                    <h3 className="title"> Game: {game.gameName}</h3>
                                    <h4 className={"title2"}>Story: {game.storyId}</h4>
                                    <div className="bar">
                                        <div className="emptybar"></div>
                                        <div className="filledbar"></div>
                                    </div>
                                    <div className="circle">
                                        <svg version="1.1" xmlns="http://www.w3.org/2000/svg">
                                            <circle className="stroke" cx="60" cy="60" r="50"/>
                                        </svg>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                    <div className={"buttonBackStartPage"}>
                        <button onClick={saveGame}>Save</button>
                        <button onClick={closeSaveGameModal}>Back</button>
                    </div>
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
                    {character.life} / {character.maxLife}
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
                                onClick={onClickGetNextStoryChapterOption1}>{story.option1}
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
                        {character.skillPoints}
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
                style={{width: "13vw"}}
            />
        </div>
    );
}
