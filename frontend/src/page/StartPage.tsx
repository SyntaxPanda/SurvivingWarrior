import React, {useEffect, useState} from 'react';
import "../css/StartPage.css"
import {Link, useNavigate} from "react-router-dom";
import Modal from "react-modal";
import {Game} from "../model/GameType";
import axios from "axios";

export default function StartPage() {
    const navigate = useNavigate();

    const[modalOpen, setModalOpen] = useState(false)

    const[games, setGames] =
        useState<Game[]>([])

    function onClickNavigateToNewGamePage(){
        navigate("/newgame")
    }

    const [username, setUsername] =
        useState("")

    function setUsernameIfLogin(){
        axios.get("/api/user/username")
            .then(response =>{
                setUsername(response.data)
            })
    }

    useEffect(() =>{
        setUsernameIfLogin()
    }, [])

    function getAllGamesForLoadGame(){
    axios.get("/api/game/all/" + username)
        .then(response =>
        setGames(response.data))
        setUsername("")
    }

    function openLoadGameModal(){
        setModalOpen(true)
        getAllGamesForLoadGame()
    }

    function closeLoadGameModal(){
        setModalOpen(false)
    }

    return (
        <div>
            <div className={"NewGameButton"}>
                <button onClick={onClickNavigateToNewGamePage}>New Game</button>
            </div>
            <div>
                <button onClick={openLoadGameModal}>Load Game</button>
            </div>
            <Modal isOpen={modalOpen}>
                {games.map((game) => {
                    return (
                        <div>
                            <Link to={"/game/" + game.gameId} onClick={() => {
                    }}>
                            <h3>{game.gameName}</h3>
                            <p>{game.storyId}</p>
                        </Link>
                        </div>
                    );
                })}
                <button onClick={closeLoadGameModal}>Close</button>
            </Modal>
        </div>
    );
}
