import axios from "axios";
import {useState} from "react";
import {User} from "../model/UserType";

export default function useUser() {

    const[user, setUser] =
        useState<User>()

    function login(username: string, password: string) {
        return axios.post("/api/user/login", undefined, {auth: {username, password}})
            .then((r) => setUser(r.data))
    }

    return {login, user}
}