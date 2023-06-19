import React, {useState} from 'react';
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

    function getAllGamesForLoadGame(){
    axios.get("/api/game/all")
        .then(response =>
        setGames(response.data))
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
