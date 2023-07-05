import React, {useEffect, useState} from 'react';
import {UserDTO} from "../model/UserType";
import axios from "axios";
import {useNavigate} from "react-router-dom";

export default function LeaderBoardPage() {
    const nav = useNavigate()
    const [leaderBoard, setLeaderBoard] =
    useState<UserDTO[]>()

    useEffect(()=>{
        getAllUserForLeaderboard()
    }, [])
    function getAllUserForLeaderboard(){
        axios.get("/api/user/all")
            .then(r =>{
                setLeaderBoard(r.data)
            })
    }

    function backToMenu(){
        nav("/start")
    }

    return (
        <div>
            <div>
                <button onClick={backToMenu}>Menu</button>
            </div>
            <div className={"leaderBoardLayout"}>
                {leaderBoard
                    ?.sort((a, b) => b.achievementPoints - a.achievementPoints)
                    .slice(0, 5) // Begrenzung auf 5 Einträge
                    .map((user, index) => (
                        <div key={user.id}>
                            <div style={{ color: "white" }}>{index + 1}.</div>
                            <div style={{ color: "white" }}>{user.username}</div>
                            <div style={{ color: "white" }}>{user.achievementPoints}</div>
                        </div>
                    ))}
            </div>
        </div>
    );
}
