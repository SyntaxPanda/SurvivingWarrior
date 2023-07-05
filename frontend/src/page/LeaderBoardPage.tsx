import React, {useEffect, useState} from 'react';
import {User} from "../model/UserType";
import axios from "axios";

export default function LeaderBoardPage() {

    const [leaderBoard, setLeaderBoard] =
    useState<User[]>()

    useEffect(()=>{
        getAllUserForLeaderboard()
    }, [])
    function getAllUserForLeaderboard(){
        axios.get("/apu/user/all")
            .then(r =>{
                setLeaderBoard(r.data)
            })
    }


    return (
        <div>
            <div>
                {leaderBoard
                    ?.sort((a, b) => b.achievementPoints - a.achievementPoints)
                    .map((user, index) => (
                        <div key={user.id}>
                            <div>
                                {index + 1}. {user.userName}
                            </div>
                            <div>{user.achievementPoints}</div>
                        </div>
                    ))}
            </div>
        </div>
    );
}
