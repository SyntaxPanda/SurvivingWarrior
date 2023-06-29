import React, {ChangeEvent, FormEvent, useState} from 'react';
import axios from "axios";
import {useNavigate} from "react-router-dom";
import "../css/RegisterPage.css"
import {toast} from "react-toastify";

export default function RegisterPage() {

    const [username, setUsername] =
        useState("")
    const [password, setPassword] =
        useState("")
    const navigate = useNavigate()

    function registerUser(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        axios.post("/api/user/register", {
            username,
            password
        })
            .then(() => {
                navigate("/login")
            })
    }

    function setUsernameHandler(e: ChangeEvent<HTMLInputElement>) {
        setUsername(e.target.value)
    }

    function setPasswordHandler(e: ChangeEvent<HTMLInputElement>) {
            if (e.target.value.length < 8) {
                toast('Das Passwort muss mindestens 8 Zeichen lang sein.');
            }
            if (!/[A-Z]/.test(e.target.value)) {
                toast('Das Passwort muss mindestens einen Großbuchstaben enthalten.');
            }
            if (!/[a-z]/.test(e.target.value)) {
                toast('Das Passwort muss mindestens einen Kleinbuchstaben enthalten.');
            }
            if (!/[!@#$%^&*]/.test(e.target.value)) {
                toast('Das Passwort muss mindestens ein Sonderzeichen enthalten (!@#$%^&*).');
            }
            setPassword('Das Passwort erfüllt alle Kriterien.');
    }

    function backOnClickHandler() {
        navigate("/")
    }

    return (
        <div className={"registerPage"}>
            <form className={"formRegisterPage"} onSubmit={registerUser}>
                <div className={"usernameRegisterPage"}>
                    <input type="text" placeholder={"Username"} onInput={setUsernameHandler}/>
                </div>
                <div className={"passwordRegisterPage"}>
                    <input type="password" placeholder={"Password"} onInput={setPasswordHandler}/>
                </div>
                <div className={"registerButtonRegisterPage"}>
                    <button>Register</button>
                </div>
            </form>
            <div className={"backButtonRegisterPage"}>
                <button onClick={backOnClickHandler}>Back</button>
            </div>
        </div>
    );
}