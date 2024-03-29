import React, {useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {Game} from "../model/GameType";
import {Character} from "../model/CharacterType";
import {Story} from "../model/StoryType";
import "../css/GamePage.css"
import Modal from "react-modal";
import {Kobold} from "../model/KoboldType";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {UserDTO} from "../model/UserType";

Modal.setAppElement('#root');

export default function GamePage() {
    const navigate = useNavigate()

    const [games, setGames] = useState<Game[]>([])
    const [isOpen, setIsOpen] = useState(false)

    const [saveGameModal, setSaveGameModal] = useState(false)

    const [character, setCharacter] =
        useState<Character>({
            doubleHitReload: 0,
            maxPots: 0,
            maxLife: 0,
            skillPoints: 0,
            damage: 0,
            exp: 0,
            gold: 0,
            id: "",
            level: 0,
            life: 1,
            name: "",
            healPower: 0,
            pots: 0
        })

    const [kobold1, setKobold1] =
        useState<Kobold>({damage: 0, gold: 0, id: "", life: 1, name: ""})

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
        useState<Game>({storyCounter: 0, username: "", gameId: "", gameName: "", characterId: "", storyId: ""})

    const [user, setUser] =
        useState<UserDTO>({
            achievementPoints: 0,
            skillPoints: 0,
            dragonCounter: 0, levelCounter: 0, goldCounter: 0, achievements: [], id: "", username: ""
        })

    const params = useParams()
    const gameId: string | undefined = params.id;

    useEffect(() => {
        getGameById()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function getGameById() {
        let charId = ""
        let storyId = ""
        let username = ""
        let userSkillpoints = 0
        axios.get("/api/game/" + gameId)
            .then(response => {
                setGame(response.data);
                charId = response.data.characterId
                storyId = response.data.storyId
                username = response.data.username
            })
            .then(() => axios.get("/api/user/details/" + username))
            .then(r => {
                setUser(r.data)
                userSkillpoints = r.data.skillPoints
            })
            .then(() => axios.get("/api/character/" + charId))
            .then(response => {
                if (storyId === "1") {
                    setCharacter({
                        ...character,
                        skillPoints: response.data.skillPoints + userSkillpoints,
                        life: response.data.life,
                        maxLife: response.data.maxLife,
                        damage: response.data.damage,
                        pots: response.data.pots,
                        maxPots: response.data.maxPots,
                        level: response.data.level,
                        exp: response.data.exp,
                        id: response.data.id,
                        gold: response.data.gold,
                        healPower: response.data.healPower,
                        name: response.data.name,
                        doubleHitReload: response.data.doubleHitReload
                    })
                } else {
                    setCharacter(response.data);
                }
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

    function lostgame() {
        axios.put("/api/user/achievement/reached", user)
            .then(() => axios.delete("/api/character/lost/" + character.id))
            .then(() =>
                axios.delete("/api/game/lost/" + game.gameId)
                    .then(() =>
                        navigate("/death")
                    ))
    }

    useEffect(() => {
        if (character.life < 1) {
            lostgame()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [character.life])

    function allEnemyDead() {
        setUser({...user, goldCounter: user.goldCounter + kobold1.gold + kobold2.gold + kobold3.gold})
        if (story.id === "11-1" || story.id === "11-2" || story.id === "11-3" || story.id === "12-1" || story.id === "12-2" || story.id === "12-3" || story.id === "13-1" || story.id === "13-2" || story.id === "13-3" || story.id === "16-1" || story.id === "16-2" || story.id === "16-3" || story.id === "15-1" || story.id === "15-2" || story.id === "15-3" || story.id === "17-1" || story.id === "17-2" || story.id === "17-3" || story.id === "19-1" || story.id === "19-2" || story.id === "19-3") {
            setCharacter({
                ...character,
                gold: character.gold + kobold1.gold + kobold2.gold + kobold3.gold,
                exp: character.exp + (3 * kobolds.length)
            })
            const healForGold = "U got " + (kobold1.gold + kobold2.gold + kobold3.gold) + " Gold and " + kobolds.length * 3 + " Exp"
            setGameLog(prevString => [...prevString, healForGold])
            setGame({...game, storyCounter: game.storyCounter + 1})
        } else if (story.id === "11") {
            setCharacter({
                ...character,
                gold: character.gold + kobold1.gold + kobold2.gold + kobold3.gold,
                level: character.level + 1,
                skillPoints: character.skillPoints + 2,
                maxLife: character.maxLife + 2,
                damage: character.damage + 1
            })
            const healForGold = "U reached Level up and got 2 SkillPoints."
            setGameLog(prevString => [...prevString, healForGold])
        } else {
            setCharacter({
                ...character,
                gold: character.gold + kobold1.gold + kobold2.gold + kobold3.gold,
                exp: character.exp + (2 * kobolds.length)
            })
            const healForGold = "U got " + (kobold1.gold + kobold2.gold + kobold3.gold) + " Gold and " + kobolds.length * 2 + " Exp"
            setGameLog(prevString => [...prevString, healForGold])
            setGame({...game, storyCounter: game.storyCounter + 1})
        }

    }

    useEffect(() => {
        if (story.id !== "8" && story.id !== "4" && story.id !== "11" && story.id !== "14" && story.id !== "18") {
            if (kobold1.life < 1) {
                if (kobold2.life < 1) {
                    if (kobold3.life < 1) {
                        allEnemyDead()
                    }
                }
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [kobold1.life, kobold2.life, kobold3.life])

    function onClickGetNextStoryChapterOption1() {
        if (story.option1 === "Hit") {
            if (kobold1.life > 0) {
                setKobold1({...kobold1, life: kobold1.life - character.damage})
                setCharacter({...character, life: character.life - kobold1.damage})
                if (character.doubleHitReload > 0) {
                    setCharacter({...character, doubleHitReload: character.doubleHitReload - 1})
                }
                const hitLog = "You hit the Enemy for " + character.damage + " and got " + kobold1.damage + " damage."
                setGameLog(prevString => [...prevString, hitLog])
            } else if (kobold2.life > 0) {
                setKobold2({...kobold2, life: kobold2.life - character.damage})
                setCharacter({...character, life: character.life - kobold2.damage})
                if (character.doubleHitReload > 0) {
                    setCharacter({...character, doubleHitReload: character.doubleHitReload - 1})
                }
                const hitLog = "You hit the Enemy for " + character.damage + " and got " + kobold2.damage + " damage."
                setGameLog(prevString => [...prevString, hitLog])
            } else if (kobold3.life > 0) {
                setKobold3({...kobold3, life: kobold3.life - character.damage})
                setCharacter({...character, life: character.life - kobold3.damage})
                if (character.doubleHitReload > 0) {
                    setCharacter({...character, doubleHitReload: character.doubleHitReload - 1})
                }
                const hitLog = "You hit the Enemy for " + character.damage + " and got " + kobold3.damage + " damage."
                setGameLog(prevString => [...prevString, hitLog])
            }
        } else if (story.option1 === "Get Heal for Gold") {
            let price = Math.round(Math.floor(Math.random() * (60 - 1 + 25)))
            if (character.gold >= price) {
                let getMaxLife = Math.round(Math.floor(Math.random() * (20 - 1 + 15)))
                if ((character.life + getMaxLife) > character.maxLife) {
                    setCharacter({...character, life: character.maxLife, gold: character.gold - price})
                    const healForGold = "U got heal up to full life for " + price + " Gold"
                    setGameLog(prevString => [...prevString, healForGold])
                    setGame({...game, storyCounter: game.storyCounter + 1})
                } else {
                    setCharacter({...character, life: character.life + getMaxLife, gold: character.gold - price})
                    const healForGold = "U got " + getMaxLife + " life for " + price + " Gold"
                    setGameLog(prevString => [...prevString, healForGold])
                    setGame({...game, storyCounter: game.storyCounter + 1})
                }
            } else {
                const healForGold = "U have not enough Gold to buy this for " + price + " Gold"
                setGameLog(prevString => [...prevString, healForGold])
            }
        } else if (story.option1 === "10 MaxLife") {
            setCharacter({
                ...character, maxLife: character.maxLife + 10,
                life: character.maxLife + 10,
                pots: character.maxPots
            })
            setGame({...game, storyCounter: game.storyCounter + 1})
            const healForGold = "You buy 10 MaxLife"
            setGameLog(prevString => [...prevString, healForGold])
        } else if (story.option1 === "Menu") {
            saveGame()
        } else if (story.option1 === "Get 3 MaxPots") {
            let price = Math.round(Math.floor(Math.random() * (70 - 1 + 45)))
            if (character.gold >= price) {
                setCharacter({...character, maxPots: character.maxPots + 3, gold: character.gold - price})
                const healForGold = "U got 3 maxPots. U pay " + price + " Gold for this"
                setGameLog(prevString => [...prevString, healForGold])
                setGame({...game, storyCounter: game.storyCounter + 1})
            } else {
                const healForGold = "U have not enough Gold to buy this for " + price + " Gold"
                setGameLog(prevString => [...prevString, healForGold])
            }
        } else if (story.option1 === "Get 4 damage") {
            let price = Math.round(Math.floor(Math.random() * (40 - 1 + 55)))
            if (character.gold >= price) {
                setCharacter({...character, gold: character.gold - price, damage: character.damage + 4})
                const healForGold = "U got 4 more dmg for " + price + " Gold."
                setGameLog(prevString => [...prevString, healForGold])
                setGame({...game, storyCounter: game.storyCounter + 1})
            } else {
                const healForGold = "U have not enough Gold to buy this for " + price + " Gold"
                setGameLog(prevString => [...prevString, healForGold])
            }
        }
    }

    function onClickGetNextStoryChapterOption2() {
        if (story.option2 === "DoubleHit") {
            if (character.doubleHitReload === 0) {
                if (kobold1.life > 0) {
                    setKobold1({...kobold1, life: kobold1.life - Math.round(character.damage * 1.5)})
                    setCharacter({
                        ...character,
                        life: character.life - kobold1.damage,
                        doubleHitReload: character.doubleHitReload + 3
                    })
                    const healForGold = "The Enemy hit u for " + kobold1.damage + ". You hit the Enemy for " + Math.round(character.damage * 1.5)
                    setGameLog(prevString => [...prevString, healForGold])
                } else if (kobold2.life > 0) {
                    setKobold2({...kobold2, life: kobold2.life - Math.round(character.damage * 1.5)})
                    setCharacter({
                        ...character,
                        life: character.life - kobold2.damage,
                        doubleHitReload: character.doubleHitReload + 3
                    })
                    const healForGold = "The Enemy hit u for " + kobold2.damage + ". You hit the Enemy for " + Math.round(character.damage * 1.5)
                    setGameLog(prevString => [...prevString, healForGold])
                } else if (kobold3.life > 0) {
                    setKobold3({...kobold3, life: kobold3.life - Math.round(character.damage * 1.5)})
                    setCharacter({
                        ...character,
                        life: character.life - kobold3.damage,
                        doubleHitReload: character.doubleHitReload + 3
                    })
                    const healForGold = "The Enemy hit u for " + kobold3.damage + ". You hit the Enemy for " + Math.round(character.damage * 1.5)
                    setGameLog(prevString => [...prevString, healForGold])
                }
            }
        } else if (story.option2 === "Get damage for Gold") {
            let price = Math.round(Math.random() * (30 - 1 + 10))
            if (character.gold >= price) {
                let getDamage = Math.round(Math.random() * (4 - 1 + 3))
                setCharacter({...character, damage: character.damage + getDamage, gold: character.gold - price})
                const healForGold = "U got " + getDamage + " MaxDamage for " + price + " Gold."
                setGameLog(prevString => [...prevString, healForGold])
                setGame({...game, storyCounter: game.storyCounter + 1})
            } else {
                const healForGold = "U have not enough Gold to buy this for " + price + " Gold"
                setGameLog(prevString => [...prevString, healForGold])
            }
        } else if (story.option2 === "10 Damage") {
            setCharacter({
                ...character, damage: character.damage + 10,
                life: character.maxLife,
                pots: character.maxPots
            })
            setGame({...game, storyCounter: game.storyCounter + 1})
            const healForGold = "You choose 10 MaxDamage."
            setGameLog(prevString => [...prevString, healForGold])
        } else if (story.option2 === "Menu") {
            saveGame()
        } else if (story.option2 === "Fill ur Pots with lava") {
            let price = Math.round(Math.floor(Math.random() * (70 - 1 + 45)))
            if (character.gold >= price) {
                setCharacter({...character, healPower: character.healPower + 5, gold: character.gold - price})
                const healForGold = "Ur potion got a hellfire color for " + price + " Gold."
                setGameLog(prevString => [...prevString, healForGold])
                setGame({...game, storyCounter: game.storyCounter + 1})
            } else {
                const healForGold = "U have not enough Gold to buy this for " + price + " Gold"
                setGameLog(prevString => [...prevString, healForGold])
            }
        } else if (story.option2 === "Fill all ur Potions") {
            let price = Math.round(Math.floor(Math.random() * (40 - 1 + 85)))
            if (character.gold >= price) {
                setCharacter({...character, gold: character.gold - price, pots: character.maxPots})
                const healForGold = "U fill up all potions for " + price + " Gold"
                setGameLog(prevString => [...prevString, healForGold])
                setGame({...game, storyCounter: game.storyCounter + 1})
            } else {
                const healForGold = "U have not enough Gold to buy this for " + price + " Gold"
                setGameLog(prevString => [...prevString, healForGold])
            }
        }
    }

    function onClickGetNextStoryChapterOption3() {
        if (story.option3 === "HealPot") {
            if (kobold1.life > 0) {
                if (character.life < character.maxLife && character.pots > 0) {
                    if ((character.life + character.healPower) > character.maxLife) {
                        setCharacter({
                            ...character,
                            life: (character.maxLife - kobold1.damage),
                            pots: character.pots - 1
                        })
                        const healForGold = "The Enemy hit u for " + kobold1.damage + ". U Heal up to full life."
                        setGameLog(prevString => [...prevString, healForGold])
                        if (character.doubleHitReload > 0) {
                            setCharacter({...character, doubleHitReload: character.doubleHitReload - 1})
                        }
                    } else {
                        setCharacter({
                            ...character,
                            life: character.life + (character.healPower - kobold1.damage),
                            pots: character.pots - 1
                        })
                        const healForGold = "The Enemy hit u for " + kobold1.damage + ". U Heal up for " + character.healPower + "."
                        setGameLog(prevString => [...prevString, healForGold])
                        if (character.doubleHitReload > 0) {
                            setCharacter({...character, doubleHitReload: character.doubleHitReload - 1})
                        }
                    }
                } else {
                    setCharacter({...character, life: character.life - kobold1.damage})
                    const healForGold = "The Enemy hit u for " + kobold1.damage + ". U cant Heal. (MaxLife or no more Pots)"
                    setGameLog(prevString => [...prevString, healForGold])
                    if (character.doubleHitReload > 0) {
                        setCharacter({...character, doubleHitReload: character.doubleHitReload - 1})
                    }
                }
            } else if (kobold2.life > 0) {
                if (character.life < character.maxLife && character.pots > 0) {
                    if ((character.life + character.healPower) > character.maxLife) {
                        setCharacter({
                            ...character,
                            life: (character.maxLife - kobold2.damage),
                            pots: character.pots - 1
                        })
                        const healForGold = "The Enemy hit u for " + kobold2.damage + ". U Heal up to full life."
                        setGameLog(prevString => [...prevString, healForGold])
                        if (character.doubleHitReload > 0) {
                            setCharacter({...character, doubleHitReload: character.doubleHitReload - 1})
                        }
                    } else {
                        setCharacter({
                            ...character,
                            life: character.life + (character.healPower - kobold2.damage),
                            pots: character.pots - 1
                        })
                        const healForGold = "The Enemy hit u for " + kobold2.damage + ". U Heal up for " + character.healPower + "."
                        setGameLog(prevString => [...prevString, healForGold])
                        if (character.doubleHitReload > 0) {
                            setCharacter({...character, doubleHitReload: character.doubleHitReload - 1})
                        }
                    }
                } else {
                    setCharacter({...character, life: character.life - kobold2.damage})
                    const healForGold = "The Enemy hit u for " + kobold2.damage + ". U cant Heal. (MaxLife or no more Pots)"
                    setGameLog(prevString => [...prevString, healForGold])
                    if (character.doubleHitReload > 0) {
                        setCharacter({...character, doubleHitReload: character.doubleHitReload - 1})
                    }
                }
            } else if (kobold3.life > 0) {
                if (character.life < character.maxLife && character.pots > 0) {
                    if ((character.life + character.healPower) > character.maxLife) {
                        setCharacter({
                            ...character,
                            life: (character.maxLife - kobold3.damage),
                            pots: character.pots - 1
                        })
                        const healForGold = "The Enemy hit u for " + kobold3.damage + ". U Heal up to full life."
                        setGameLog(prevString => [...prevString, healForGold])
                        if (character.doubleHitReload > 0) {
                            setCharacter({...character, doubleHitReload: character.doubleHitReload - 1})
                        }
                    } else {
                        setCharacter({
                            ...character,
                            life: character.life + (character.healPower - kobold3.damage),
                            pots: character.pots - 1
                        })
                        const healForGold = "The Enemy hit u for " + kobold3.damage + ". U Heal up for " + character.healPower + "."
                        setGameLog(prevString => [...prevString, healForGold])
                        if (character.doubleHitReload > 0) {
                            setCharacter({...character, doubleHitReload: character.doubleHitReload - 1})
                        }
                    }
                } else {
                    setCharacter({...character, life: character.life - kobold3.damage})
                    const healForGold = "The Enemy hit u for " + kobold3.damage + ". U cant Heal. (MaxLife or no more Pots)"
                    setGameLog(prevString => [...prevString, healForGold])
                    if (character.doubleHitReload > 0) {
                        setCharacter({...character, doubleHitReload: character.doubleHitReload - 1})
                    }
                }
            }
        } else if (story.option3 === "Dont buy something") {
            const healForGold = "U buy nothing."
            setGameLog(prevString => [...prevString, healForGold])
            setGame({...game, storyCounter: game.storyCounter + 1})
        } else if (story.option3 === "5 MaxLife/Damage") {
            setCharacter({
                ...character, maxLife: character.maxLife + 5,
                damage: character.damage + 5,
                life: character.maxLife + 5,
                pots: character.maxPots
            })
            const healForGold = "You choose 5 MaxLife/MaxDamage."
            setGameLog(prevString => [...prevString, healForGold])
            setGame({...game, storyCounter: game.storyCounter + 1})
        } else if (story.option3 === "Menu") {
            saveGame()
        }
    }

    function saveGame() {
        axios.put("/api/user/achievement/reached", user)
            .catch(error => console.error(error))
        axios.put("/api/character/" + character.id, character
        ).catch(error => console.log(error))
        axios.put("/api/game/save", {
            gameId: game.gameId,
            gameName: game.gameName,
            characterId: character.id,
            storyId: story.id,
            username: game.username,
            storyCounter: game.storyCounter
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
    const story1Finish = ["11"]
    const story11 = ["11-1", "11-2", "11-3"]
    const story12 = ["12-1", "12-2", "12-3"]
    const story13 = ["13-1", "13-2", "13-3"]
    const story14 = ["14"]
    const story15 = ["15-1", "15-2", "15-3"]
    const story16 = ["16-1", "16-2", "16-3"]
    const story17 = ["17-1", "17-2", "17-3"]
    const story18 = ["18"]
    const story19 = ["19-1", "19-2", "19-3"]
    const story20 = ["20-1", "20-2", "20-3"]
    const story21 = ["21"]

    const [randomStory, setRandomStory] =
        useState<String | undefined>("")

    useEffect(() => {
        if (game.storyCounter !== 0) {
            const newRandomStory = getRandomStoryById();
            setRandomStory(newRandomStory);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [game.storyCounter]);

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

        if (game.storyCounter === 1) {
            randomIndex = Math.floor(Math.random() * story1.length);
            return story1[randomIndex];
        } else if (game.storyCounter === 2) {
            randomIndex = Math.floor(Math.random() * story2.length);
            return story2[randomIndex];
        } else if (game.storyCounter === 3) {
            randomIndex = Math.floor(Math.random() * story3.length);
            return story3[randomIndex];
        } else if (game.storyCounter === 4) {
            randomIndex = Math.floor(Math.random() * story4.length);
            return story4[randomIndex];
        } else if (game.storyCounter === 5) {
            randomIndex = Math.floor(Math.random() * story5.length);
            return story5[randomIndex];
        } else if (game.storyCounter === 6) {
            randomIndex = Math.floor(Math.random() * story6.length);
            return story6[randomIndex];
        } else if (game.storyCounter === 7) {
            randomIndex = Math.floor(Math.random() * story7.length);
            return story7[randomIndex];
        } else if (game.storyCounter === 8) {
            randomIndex = Math.floor(Math.random() * story8.length);
            return story8[randomIndex];
        } else if (game.storyCounter === 9) {
            randomIndex = Math.floor(Math.random() * story9.length);
            return story9[randomIndex];
        } else if (game.storyCounter === 10) {
            randomIndex = Math.floor(Math.random() * story10.length);
            return story10[randomIndex];
        } else if (game.storyCounter === 11) {
            randomIndex = Math.floor(Math.random() * story1Finish.length);
            setUser({...user, dragonCounter: user.dragonCounter + 1})
            return story1Finish[randomIndex];
        } else if (game.storyCounter === 12) {
            randomIndex = Math.floor(Math.random() * story11.length);
            return story11[randomIndex];
        } else if (game.storyCounter === 13) {
            randomIndex = Math.floor(Math.random() * story12.length);
            return story12[randomIndex];
        } else if (game.storyCounter === 14) {
            randomIndex = Math.floor(Math.random() * story13.length);
            return story13[randomIndex];
        } else if (game.storyCounter === 15) {
            randomIndex = Math.floor(Math.random() * story14.length);
            return story14[randomIndex];
        } else if (game.storyCounter === 16) {
            randomIndex = Math.floor(Math.random() * story15.length);
            return story15[randomIndex];
        } else if (game.storyCounter === 17) {
            randomIndex = Math.floor(Math.random() * story16.length);
            return story16[randomIndex];
        } else if (game.storyCounter === 18) {
            randomIndex = Math.floor(Math.random() * story17.length);
            return story17[randomIndex];
        } else if (game.storyCounter === 19) {
            randomIndex = Math.floor(Math.random() * story18.length);
            return story18[randomIndex];
        } else if (game.storyCounter === 20) {
            randomIndex = Math.floor(Math.random() * story19.length);
            return story19[randomIndex];
        } else if (game.storyCounter === 21) {
            randomIndex = Math.floor(Math.random() * story20.length);
            return story20[randomIndex];
        } else if (game.storyCounter === 22) {
            setUser({...user, dragonCounter: user.dragonCounter + 1})
            randomIndex = Math.floor(Math.random() * story21.length);
            return story21[randomIndex];
        }
    }

    useEffect(() => {
        if (character.pots < character.maxPots) {
            setCharacter({...character, pots: character.pots + 1})
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [character.level])

    function getLevelUp() {
        if (character.exp >= 12) {
            setCharacter({
                ...character,
                level: character.level + 1,
                exp: character.exp - 12,
                skillPoints: character.skillPoints + 2,
                maxLife: character.maxLife + 2,
                damage: character.damage + 1,
                maxPots: character.maxPots + 1
            })
            setUser({...user, levelCounter: user.levelCounter + 1})
            const healForGold = "U reached Level up and got 2 SkillPoints, 2 maxLife, 1 maxDamage and 1 maxPot."
            setGameLog(prevString => [...prevString, healForGold])
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
                life: character.life + 2,
                maxLife: character.maxLife + 2,
                skillPoints: character.skillPoints - 1
            })
            const healForGold = "You skill 1 point in CharacterLife."
            setGameLog(prevString => [...prevString, healForGold])
        }
    }

    function increaseCharacterHealPower() {
        if (character.skillPoints > 0) {
            setCharacter({
                ...character, healPower: character.healPower + 1,
                skillPoints: character.skillPoints - 1
            })
            const healForGold = "You skill 1 point in HealPower."
            setGameLog(prevString => [...prevString, healForGold])
        }
    }

    function increaseCharacterDmg() {
        if (character.skillPoints > 0) {
            setCharacter({...character, damage: character.damage + 1, skillPoints: character.skillPoints - 1})
            const healForGold = "You skill 1 point in CharacterDamage."
            setGameLog(prevString => [...prevString, healForGold])
        }
    }

    useEffect(() => {
        getAchievementsCharLevel()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [character.level])

    function getAchievementsCharLevel() {
        if (user.achievements[0]?.reached === false) {
            if (character.level >= 5) {
                user.achievements[0].reached = true;
                setUser({...user, achievementPoints: user.achievementPoints + 5, skillPoints: user.skillPoints + 1})
                const healForGold = "You reached Achievement lvl5."
                setGameLog(prevString => [...prevString, healForGold])
            }
        } else if (user.achievements[1]?.reached === false) {
            if (character.level >= 10) {
                user.achievements[1].reached = true;
                setUser({...user, achievementPoints: user.achievementPoints + 5, skillPoints: user.skillPoints + 1})
                const healForGold = "You reached Achievement lvl10."
                setGameLog(prevString => [...prevString, healForGold])
            }
        } else if (user.achievements[2]?.reached === false) {
            if (character.level >= 15) {
                user.achievements[2].reached = true
                setUser({...user, achievementPoints: user.achievementPoints + 5, skillPoints: user.skillPoints + 1})
                const healForGold = "You reached Achievement lvl15."
                setGameLog(prevString => [...prevString, healForGold])
            }
        } else if (user.achievements[3]?.reached === false) {
            if (character.level >= 20) {
                user.achievements[3].reached = true
                setUser({...user, achievementPoints: user.achievementPoints + 5, skillPoints: user.skillPoints + 1})
                const healForGold = "You reached Achievement lvl20."
                setGameLog(prevString => [...prevString, healForGold])
            }
        }
    }

    useEffect(() => {
        getAchievementsCharGold()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [character.gold])

    function getAchievementsCharGold() {
        if (user.achievements[4]?.reached === false) {
            if (character.gold >= 100) {
                user.achievements[4].reached = true
                setUser({...user, achievementPoints: user.achievementPoints + 5, skillPoints: user.skillPoints + 1})
                const healForGold = "You reached 100 Gold Achievement."
                setGameLog(prevString => [...prevString, healForGold])
            }
        } else if (user.achievements[5]?.reached === false) {
            if (character.gold >= 150) {
                user.achievements[5].reached = true
                setUser({...user, achievementPoints: user.achievementPoints + 5, skillPoints: user.skillPoints + 1})
                const healForGold = "You reached 150 Gold Achievement."
                setGameLog(prevString => [...prevString, healForGold])
            }
        } else if (user.achievements[6]?.reached === false) {
            if (character.gold >= 200) {
                user.achievements[6].reached = true
                setUser({...user, achievementPoints: user.achievementPoints + 5, skillPoints: user.skillPoints + 1})
                const healForGold = "You reached 200 Gold Achievement."
                setGameLog(prevString => [...prevString, healForGold])
            }
        } else if (user.achievements[7]?.reached === false) {
            if (character.gold >= 250) {
                user.achievements[7].reached = true
                setUser({...user, achievementPoints: user.achievementPoints + 5, skillPoints: user.skillPoints + 1})
                const healForGold = "You reached 250 Gold Achievement."
                setGameLog(prevString => [...prevString, healForGold])
            }
        }
    }

    useEffect(() => {
        getAchievementsCharLevelOverall()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user.levelCounter])

    function getAchievementsCharLevelOverall() {
        if (user.achievements[8]?.reached === false) {
            if (user.levelCounter >= 100) {
                user.achievements[8].reached = true
                setUser({...user, achievementPoints: user.achievementPoints + 5, skillPoints: user.skillPoints + 1})
                const healForGold = "You reached 100 lvl Achievement."
                setGameLog(prevString => [...prevString, healForGold])
            }
        } else if (user.achievements[9]?.reached === false) {
            if (user.levelCounter >= 250) {
                user.achievements[9].reached = true
                setUser({...user, achievementPoints: user.achievementPoints + 5, skillPoints: user.skillPoints + 1})
                const healForGold = "You reached 250 lvl Achievement."
                setGameLog(prevString => [...prevString, healForGold])
            }
        } else if (user.achievements[10]?.reached === false) {
            if (user.levelCounter >= 500) {
                user.achievements[10].reached = true
                setUser({...user, achievementPoints: user.achievementPoints + 5, skillPoints: user.skillPoints + 1})
                const healForGold = "You reached 500 lvl Achievement."
                setGameLog(prevString => [...prevString, healForGold])
            }
        } else if (user.achievements[11]?.reached === false) {
            if (user.levelCounter >= 1000) {
                user.achievements[11].reached = true
                setUser({...user, achievementPoints: user.achievementPoints + 5, skillPoints: user.skillPoints + 1})
                const healForGold = "You reached 1000 lvl Achievement."
                setGameLog(prevString => [...prevString, healForGold])
            }
        }
    }

    useEffect(() => {
        getAchievementsCharDragonKills()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user.dragonCounter])

    function getAchievementsCharDragonKills() {
        if (user.achievements[12]?.reached === false) {
            if (user.dragonCounter >= 1) {
                user.achievements[12].reached = true
                setUser({...user, achievementPoints: user.achievementPoints + 5, skillPoints: user.skillPoints + 1})
                const healForGold = "You reached 1 Dragon kill Achievement."
                setGameLog(prevString => [...prevString, healForGold])
            }
        } else if (user.achievements[13]?.reached === false) {
            if (user.dragonCounter >= 5) {
                user.achievements[13].reached = true
                setUser({...user, achievementPoints: user.achievementPoints + 5, skillPoints: user.skillPoints + 1})
                const healForGold = "You reached 5 Dragon kill Achievement."
                setGameLog(prevString => [...prevString, healForGold])
            }
        } else if (user.achievements[14]?.reached === false) {
            if (user.dragonCounter >= 10) {
                user.achievements[14].reached = true
                setUser({...user, achievementPoints: user.achievementPoints + 5, skillPoints: user.skillPoints + 1})
                const healForGold = "You reached 10 Dragon kill Achievement."
                setGameLog(prevString => [...prevString, healForGold])
            }
        } else if (user.achievements[15]?.reached === false) {
            if (user.dragonCounter >= 25) {
                user.achievements[15].reached = true
                setUser({...user, achievementPoints: user.achievementPoints + 5, skillPoints: user.skillPoints + 1})
                const healForGold = "You reached 25 Dragon kill Achievement."
                setGameLog(prevString => [...prevString, healForGold])
            }
        }
    }

    useEffect(() => {
        getAchievementsCharDamage()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [character.damage])

    function getAchievementsCharDamage() {
        if (user.achievements[16]?.reached === false) {
            if (character.damage >= 15) {
                user.achievements[16].reached = true
                setUser({...user, achievementPoints: user.achievementPoints + 5, skillPoints: user.skillPoints + 1})
                const healForGold = "You reached 15 dmg Achievement."
                setGameLog(prevString => [...prevString, healForGold])
            }
        } else if (user.achievements[17]?.reached === false) {
            if (character.damage >= 20) {
                user.achievements[17].reached = true
                setUser({...user, achievementPoints: user.achievementPoints + 5, skillPoints: user.skillPoints + 1})
                const healForGold = "You reached 20 dmg Achievement."
                setGameLog(prevString => [...prevString, healForGold])
            }
        } else if (user.achievements[18]?.reached === false) {
            if (character.damage >= 30) {
                user.achievements[18].reached = true
                setUser({...user, achievementPoints: user.achievementPoints + 5, skillPoints: user.skillPoints + 1})
                const healForGold = "You reached 30 dmg Achievement."
                setGameLog(prevString => [...prevString, healForGold])
            }
        } else if (user.achievements[19]?.reached === false) {
            if (character.damage >= 50) {
                user.achievements[19].reached = true
                setUser({...user, achievementPoints: user.achievementPoints + 5, skillPoints: user.skillPoints + 1})
                const healForGold = "You reached 50 dmg Achievement."
                setGameLog(prevString => [...prevString, healForGold])
            }
        }
    }

    useEffect(() => {
        getAchievementsCharGoldOverall()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user.goldCounter])

    function getAchievementsCharGoldOverall() {
        if (user.achievements[20]?.reached === false) {
            if (user.goldCounter >= 10000) {
                user.achievements[20].reached = true
                setUser({...user, achievementPoints: user.achievementPoints + 5, skillPoints: user.skillPoints + 1})
                const healForGold = "You reached 10k Gold Achievement."
                setGameLog(prevString => [...prevString, healForGold])
            }
        } else if (user.achievements[21]?.reached === false) {
            if (user.goldCounter >= 50000) {
                user.achievements[21].reached = true
                setUser({...user, achievementPoints: user.achievementPoints + 5, skillPoints: user.skillPoints + 1})
                const healForGold = "You reached 50k Gold Achievement."
                setGameLog(prevString => [...prevString, healForGold])
            }
        } else if (user.achievements[22]?.reached === false) {
            if (user.goldCounter >= 100000) {
                user.achievements[22].reached = true
                setUser({...user, achievementPoints: user.achievementPoints + 5, skillPoints: user.skillPoints + 1})
                const healForGold = "You reached 100k Gold Achievement."
                setGameLog(prevString => [...prevString, healForGold])
            }
        } else if (user.achievements[23]?.reached === false) {
            if (user.goldCounter >= 500000) {
                user.achievements[23].reached = true
                setUser({...user, achievementPoints: user.achievementPoints + 5, skillPoints: user.skillPoints + 1})
                const healForGold = "You reached 500k Gold Achievement."
                setGameLog(prevString => [...prevString, healForGold])
            }
        } else if (user.achievements[24]?.reached === false) {
            if (user.goldCounter >= 1000000) {
                user.achievements[24].reached = true
                setUser({...user, achievementPoints: user.achievementPoints + 5, skillPoints: user.skillPoints + 1})
                const healForGold = "You reached 1000k Gold Achievement."
                setGameLog(prevString => [...prevString, healForGold])
            }
        }
    }

    const [gameLog, setGameLog] = useState<string[]>([])

    const [tutorialModal, setTutorialModal] = useState(false)

    function goToTutorialModal() {
        setTutorialModal(true)
    }

    function closeTutorialModal() {
        setTutorialModal(false)
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
                                            <circle className="stroke" cx="60" cy="45" r="30"/>
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

                <Modal className={"modalTutorial"} isOpen={tutorialModal}>
                    <div className={"rowOne"}>
                        <div className={"menuInfo"}>
                            Save, Menu und HowToPlay Page
                        </div>
                        <div className={"enemyInfo"}>
                            Oben Feind Name, unten Leben
                        </div>
                        <div className={"lifeExpInfo"}>
                            Rot ist Life/MaxLife, Blau Exp/MaxExp
                        </div>
                    </div>
                    <div className={"rowTwo"}>
                        <div className={"gameNameInfo"}>
                            Name vom Spiel
                        </div>
                        <div className={"characterNameInfo"}>
                            Character Name
                        </div>
                    </div>
                    <div className={"rowThree"}>
                        <div className={"gameLogInfo"}>
                            Hier stehen alle infos die während des Spiels passieren
                        </div>
                        <div className={"charLevelPointsInfo"}>
                            Character Level und
                            Skill Points zum verteilen auf die Werte darunter
                        </div>
                    </div>
                    <div className={"rowFour"}>
                        <div className={"storyTextInfo"}>
                            In diesem Feld stehen alle Storylines
                        </div>
                        <div className={"lifeWerteInfo"}>
                            Das leben was der Character hat, auf dem + kann der Wert erhöht werden
                        </div>
                    </div>
                    <div className={"rowFive"}>
                        <div className={"damageWerteInfo"}>
                            Der Schaden vom Character, auf dem + kann der Wert erhöht werden
                        </div>
                    </div>
                    <div className={"rowSix"}>
                        <div className={"healPowerWerteInfo"}>
                            Die Menge die ein Pot heilt, auf dem + kann der Wert erhöht werden
                        </div>
                    </div>
                    <div className={"rowSeven"}>
                        <div className={"maximalePotsInfo"}>
                            So viele Pots hat der Character
                        </div>
                    </div>
                    <div className={"rowEight"}>
                        <div className={"hitButtonInfo"}>
                            Fügt Gegnern Schaden in Höhe vom damage zu
                        </div>
                        <div className={"doubleHitButtonInfo"}>
                            Fügt Gegnern 1,5fachen Schaden zu
                        </div>
                        <div className={"healPotButtonInfo"}>
                            Zum heilen des Spielers, Anzahl steht dabei
                        </div>
                        <div className={"goldWertInfo"}>
                            Die Menge an Gold der Character besitzt, Gold zum kaufen von sachen beim händler benutzt
                        </div>
                    </div>
                    <div className={"buttonCloseTutorial"}>
                        <button onClick={closeTutorialModal}>Back</button>
                    </div>
                </Modal>

                <button onClick={goToMenu}>Menu</button>
                <button onClick={goToTutorialModal}>How to Play</button>
                <button onClick={closeModal}>Close</button>
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
                    LIFE: {character.life} / {character.maxLife}
                </div>
                <div className={"expBox"}>
                    EXP: {character.exp} / 12
                </div>
            </div>
            <div className={"storyBox"}>
                <div className={"storyName"}>
                    {story.name}
                </div>
                <div className={"logChat"}>
                    {gameLog.reverse().map((message) => (
                        <div className={"message"}>
                            {message}
                        </div>
                    ))}
                </div>
                <div className={"storyText"}>
                    {story.storyText}
                </div>
                <div className={"storyButtons"}>
                    <div className={"button1"}>
                        <button
                            onClick={onClickGetNextStoryChapterOption1}>{story.option1}
                        </button>
                    </div>
                    <div className={"button2"}>
                        <button onClick={onClickGetNextStoryChapterOption2}>
                            {story.option2 !== "DoubleHit"}{" "}
                            {story.option2 === "DoubleHit" && character.doubleHitReload === 0 ? (
                                <span>{story.option2}</span>
                            ) : (
                                <span style={{color: "gray"}}>{story.option2}</span>
                            )}
                        </button>
                    </div>
                    <div className={"button3"}>
                        <button
                            onClick={onClickGetNextStoryChapterOption3}>{story.option3} {story.option3 === "HealPot" && `${character.pots.toLocaleString()}/${character.maxPots.toLocaleString()}`}</button>
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
                        Life:
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
                        Damage:
                    </div>
                    <div className={"characterDmg"}>
                        {character.damage}
                    </div>
                    <div className={"buttonDmgUp"}>
                        <button onClick={increaseCharacterDmg}>+</button>
                    </div>
                </div>
                <div className={"characterHealPowerBox"}>
                    <div className={"characterHealPowerString"}>
                        HealPower:
                    </div>
                    <div className={"characterHealPower"}>
                        {character.healPower}
                    </div>
                    <div className={"buttonHealPowerUp"}>
                        <button onClick={increaseCharacterHealPower}>+</button>
                    </div>
                </div>
                <div className={"characterPotBox"}>
                    <div className={"characterDmgString"}>
                        MaximalPots:
                    </div>
                    <div className={"characterPot"}>
                        {character.maxPots}
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
                style={{width: "13vw", fontSize: "3.5vh"}}
                limit={6}
            />
        </div>
    );
}
