import React, {ChangeEvent, FormEvent, useState} from 'react';
import axios from "axios";
import {useNavigate} from "react-router-dom";
import "../css/RegisterPage.css"

export default function RegisterPage() {

    const[username, setUsername] =
        useState("")
    const[password, setPassword] =
        useState("")
    const navigate = useNavigate()

    function registerUser(e: FormEvent<HTMLFormElement>){
        e.preventDefault()
        axios.post("/api/user/register", {
            username,
            password
        })
            .then(() => {
                navigate("/login")
            })
    }

    function setUsernameHandler(e: ChangeEvent<HTMLInputElement>){
        setUsername(e.target.value)
    }

    function setPasswordHandler(e: ChangeEvent<HTMLInputElement>){
        setPassword(e.target.value)
    }

    return (
        <div className={"registerPage"}>
            <form onSubmit={registerUser}>
                <div>
                    <input type="text" placeholder={"Username"} onInput={setUsernameHandler}/>
                </div>
                <div>
                    <input type="password" placeholder={"Password"} onInput={setPasswordHandler}/>
                </div>
                <button>Register</button>
            </form>
        </div>
    );
}