import React, {useEffect, useState} from 'react';
import "../css/StartPage.css"
import {Link, useNavigate} from "react-router-dom";
import Modal from "react-modal";
import {Game} from "../model/GameType";
import axios from "axios";
import "../css/StartPage.css"
import {UserDTO} from "../model/UserType";

export default function StartPage() {
    const navigate = useNavigate();

    const [modalOpen, setModalOpen] = useState(false)
    const [achievementModal, setAchievementModal] = useState(false)

    const [games, setGames] =
        useState<Game[]>([])

    const[username, setUsername] =
        useState("")

    function onClickNavigateToNewGamePage() {
        navigate("/newgame")
    }

    const [user, setUser] =
        useState<UserDTO>({
            achievementPoints: 0,
            skillPoints: 0,
            dragonCounter: 0, levelCounter: 0, goldCounter: 0, id: "", achievements: [], userName: ""})

    function setUserIfLogin() {
        axios.get("/api/user/username")
            .then(response => {
                setUsername(response.data)
                axios.get("/api/user/details/" + response.data)
                    .then(r => {
                        setUser(r.data)
                    })
            })
    }

    useEffect(() => {
        setUserIfLogin()
    }, [])

    function getAllAchievements() {
        setAchievementModal(true)
    }

    function closeAchievementModal() {
        setAchievementModal(false)
    }

    function getAllGamesForLoadGame() {
        axios.get("/api/game/all/" + username)
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

    function goToPatchNotePage(){
        navigate("/patchNoteLogin")
    }

    return (
        <div className={"startPage"}>
            <div className={"NewGameButton"}>
                <button onClick={onClickNavigateToNewGamePage}>New Game</button>
            </div>
            <div className={"loadGameButton"}>
                <button onClick={openLoadGameModal}>Load Game</button>
            </div>
            <div className={"logoutGameButton"}>
                <div className={"buttonLogout"}>
                    <button onClick={logout}>Logout</button>
                </div>
                <div className={"patchButtonStartPage"}>
                    <button onClick={goToPatchNotePage}>PatchNote</button>
                </div>
                <div className={"buttonAchievement"}>
                    <button onClick={getAllAchievements}>Achievements</button>
                </div>
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
            </Modal>
            <Modal className={"modalAchievement"} isOpen={achievementModal}>
                <div className={"achievementGrid"}>
                    {user.achievements.map((achievement, index) => {
                        const frameClassName = achievement.reached ? "rainbowFrame" : "blackFrame";
                        return (
                            <div className={frameClassName} key={achievement.id}>
                                <div className={"achievementContent"}>
                                    {achievement.name} <div className={"infosAchievement"}>{achievement.description}</div>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div>
                    <button onClick={closeAchievementModal}>Close</button>
                </div>
            </Modal>
        </div>
    );
}
