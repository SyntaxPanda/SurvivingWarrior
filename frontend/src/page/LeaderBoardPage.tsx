import React, {useEffect, useState} from 'react';
import {UserDTO} from "../model/UserType";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import "../css/Leaderboard.css"

export default function LeaderBoardPage() {
    const nav = useNavigate()
    const [leaderBoard, setLeaderBoard] =
        useState<UserDTO[]>()

    useEffect(() => {
        getAllUserForLeaderboard()
    }, [])

    function getAllUserForLeaderboard() {
        axios.get("/api/user/all")
            .then(r => {
                setLeaderBoard(r.data)
            })
    }

    function backToMenu() {
        nav("/start")
    }

    return (
        <div className={"leaderBoardPage"}>
            <div>
                <button onClick={backToMenu}>Menu</button>
            </div>
            Leaderboard
            <div className={"leaderBoardLayout"}>
                <div className={"leaderBoardLayoutLevelCounter"}>
                    Best of LevelCounter
                    {leaderBoard
                        ?.sort((a, b) => b.levelCounter - a.levelCounter)
                        .slice(0, 3) // Begrenzung auf 5 Einträge
                        .map((user, index) => (
                            <div key={user.id}>
                                <div style={{color: "white"}}>{index + 1}.</div>
                                <div style={{color: "white"}}>Name: {user.username}</div>
                                <div style={{color: "white"}}>LevelCounter: {user.levelCounter}</div>
                            </div>
                        ))}
                </div>
                <div className={"leaderBoardLayoutDragonCounter"}>
                    Best of DragonCounter
                    {leaderBoard
                        ?.sort((a, b) => b.dragonCounter - a.dragonCounter)
                        .slice(0, 3) // Begrenzung auf 5 Einträge
                        .map((user, index) => (
                            <div key={user.id}>
                                <div style={{color: "white"}}>{index + 1}.</div>
                                <div style={{color: "white"}}>Name: {user.username}</div>
                                <div style={{color: "white"}}>DragonCounter: {user.dragonCounter}</div>
                            </div>
                        ))}
                </div>
                <div className={"leaderBoardLayoutGoldCounter"}>
                    Best of GoldCounter
                    {leaderBoard
                        ?.sort((a, b) => b.goldCounter - a.goldCounter)
                        .slice(0, 3) // Begrenzung auf 5 Einträge
                        .map((user, index) => (
                            <div key={user.id}>
                                <div style={{color: "white"}}>{index + 1}.</div>
                                <div style={{color: "white"}}>Name: {user.username}</div>
                                <div style={{color: "white"}}>GoldCounter: {user.goldCounter}</div>
                            </div>
                        ))}
                </div>
                <div className={"leaderBoardLayoutAchievementPoints"}>
                    Best of AchievementPoints
                    {leaderBoard
                        ?.sort((a, b) => b.achievementPoints - a.achievementPoints)
                        .slice(0, 3) // Begrenzung auf 5 Einträge
                        .map((user, index) => (
                            <div key={user.id}>
                                <div style={{color: "white"}}>{index + 1}.</div>
                                <div style={{color: "white"}}>Name: {user.username}</div>
                                <div style={{color: "white"}}>AchievementPoints: {user.achievementPoints}</div>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
}
