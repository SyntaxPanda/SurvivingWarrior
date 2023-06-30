import React, {useEffect, useState} from 'react';
import "../css/StartPage.css"
import {Link, useNavigate} from "react-router-dom";
import Modal from "react-modal";
import {Game} from "../model/GameType";
import axios from "axios";
import "../css/StartPage.css"
import {UserDTO} from "../model/UserType";
import {Achievement} from "../model/AchievementType";

export default function StartPage() {
    const navigate = useNavigate();

    const [modalOpen, setModalOpen] = useState(false)
    const [achievementModal, setAchievementModal] = useState(false)

    const [games, setGames] =
        useState<Game[]>([])
    const [achievements, setAchievements] =
        useState<Achievement[]>()

    function onClickNavigateToNewGamePage() {
        navigate("/newgame")
    }

    const [user, setUser] =
        useState<UserDTO>({id: "", achievement: [], userName: ""})

    function setUserIfLogin() {
        axios.get("/api/user/details")
            .then(response => {
                setUser(response.data)
            })
    }

    useEffect(() => {
        setUserIfLogin()
    }, [])

    function getAllAchievements() {
        setAchievements(user.achievement)
        setAchievementModal(true)
    }

    function closeAchievementModal() {
        setAchievementModal(false)
    }

    function getAllGamesForLoadGame() {
        axios.get("/api/game/all/" + user.userName)
            .then(response =>
                setGames(response.data))
    }

    function openLoadGameModal() {
        setModalOpen(true)
        getAllGamesForLoadGame()
    }

    function closeLoadGameModal() {
        setModalOpen(false)
    }

    const logout = async () => {
        try {
            await axios.post('/api/user/logout')
                .then(() => {
                    navigate("/")
                })
        } catch (error) {
        }
    };

    return (
        <div className={"startPage"}>
            <div className={"NewGameButton"}>
                <button onClick={onClickNavigateToNewGamePage}>New Game</button>
            </div>
            <div className={"loadGameButton"}>
                <button onClick={openLoadGameModal}>Load Game</button>
            </div>
            <div className={"logoutGameButton"}>
                <button onClick={logout}>Logout</button>
            </div>
            <Modal className={"modalLoadGame"} isOpen={modalOpen}>
                <div className="containerStartPage">
                    {games.map((game) => (
                        <Link to={"/game/" + game.gameId} onClick={() => {
                        }}>
                            <div className="cardStartPage" key={game.gameId}>
                                <h3 className="titleStartPage"> Game: {game.gameName}</h3>
                                <h4 className={"title2StartPage"}>Story: {game.storyId}</h4>
                                <div className="barStartPage">
                                    <div className="emptybarStartPage"></div>
                                    <div className="filledbarStartPage"></div>
                                </div>
                                <div className="circleStartPage">
                                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg">
                                        <circle className="strokeStartPage" cx="60" cy="60" r="50"/>
                                    </svg>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
                <div className={"buttonBackStartPage"}>
                    <button onClick={closeLoadGameModal}>Close</button>
                </div>
                <button onClick={getAllAchievements}>Achievements</button>
            </Modal>
            <Modal isOpen={achievementModal}>
                <div>
                    {achievements?.map((achievement) => {
                            return (
                                <div className={""}>
                                    <div className={"infosAchievement"}>
                                        {achievement.name}{achievement.description}
                                    </div>
                                </div>
                            )
                        }
                    )}
                </div>
                <div>
                    <button onClick={closeAchievementModal}>Close</button>
                </div>
            </Modal>
        </div>
    );
}
