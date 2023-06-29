import React, {useEffect, useState} from 'react';
import "../css/StartPage.css"
import {Link, useNavigate} from "react-router-dom";
import Modal from "react-modal";
import {Game} from "../model/GameType";
import axios from "axios";
import "../css/StartPage.css"

export default function StartPage() {
    const navigate = useNavigate();

    const [modalOpen, setModalOpen] = useState(false)

    const [games, setGames] =
        useState<Game[]>([])

    function onClickNavigateToNewGamePage() {
        navigate("/newgame")
    }

    const [username, setUsername] =
        useState("")

    function setUsernameIfLogin() {
        axios.get("/api/user/username")
            .then(response => {
                setUsername(response.data)
            })
    }

    useEffect(() => {
        setUsernameIfLogin()
    }, [])

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
                    <button onClick={closeLoadGameModal}>Close</button>
                </div>
            </Modal>
        </div>
    );
}
