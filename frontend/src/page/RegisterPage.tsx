import React, {ChangeEvent, FormEvent, useState} from 'react';
import axios from "axios";
import {useNavigate} from "react-router-dom";
import "../css/RegisterPage.css"
import {toast, ToastContainer} from "react-toastify";

export default function RegisterPage() {

    const [username, setUsername] =
        useState("")
    const [password, setPassword] =
        useState("")
    const navigate = useNavigate()

    function registerUser(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        if (password.length > 7) {
            if (/[A-Z]/.test(password)) {
                if (/[a-z]/.test(password)) {
                    if (/[!@#$%^&*]/.test(password)) {
                        if (username.length >= 4) {
                            axios.post("/api/user/register", {
                                username,
                                password
                            })
                                .then(() => {
                                    navigate("/login")
                                })
                        } else {
                            toast("Username need 4 or more letters.")
                        }
                    } else {
                        toast('Das Passwort muss mindestens ein Sonderzeichen enthalten (!@#$%^&*).');
                    }
                } else {
                    toast('Das Passwort muss mindestens einen Kleinbuchstaben enthalten.');
                }
            } else {
                toast('Das Passwort muss mindestens einen Großbuchstaben enthalten.');
            }
        } else {
            toast('Das Passwort muss mindestens 8 Zeichen lang sein.');
        }
    }

    function setUsernameHandler(e: ChangeEvent<HTMLInputElement>) {
        setUsername(e.target.value)
    }

    function setPasswordHandler(e: ChangeEvent<HTMLInputElement>) {
        setPassword(e.target.value);
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
            <ToastContainer
                position="top-center"
                autoClose={2000}
                newestOnTop={false}
                rtl={false}
                pauseOnFocusLoss
                pauseOnHover
                theme="light"
                style={{width: "20vw"}}
            />
        </div>
    );
}