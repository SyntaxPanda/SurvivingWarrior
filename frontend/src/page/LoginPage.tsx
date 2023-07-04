import React, {ChangeEvent, FormEvent, useState} from 'react';
import {useNavigate} from "react-router-dom";
import "../css/LoginPage.css"
import {toast, ToastContainer} from "react-toastify";

type Props = {
    login: (username: string, password: string) => Promise<void>
}
export default function LoginPage(props: Props) {
    const [username, setUserName] =
        useState("")
    const [password, setPassword] =
        useState("")
    const navigate = useNavigate()


    function userLogin(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        props.login(username, password)
            .then(() => {
                navigate("/start")
            })
            .catch(() => {
                toast("Username or Password false")
                setPassword("")
            })
    }

    function onInputPasswordHandler(e: ChangeEvent<HTMLInputElement>) {
        setPassword(e.target.value)
    }

    function onInputUserNameHandler(e: ChangeEvent<HTMLInputElement>) {
        setUserName(e.target.value)
    }

    function backMenuHandler() {
        navigate("/")
    }

    return (
        <div className={"loginPage"}>
            <form className={"formLoginPage"} onSubmit={userLogin}>
                <div className={"usernameLoginPage"}>
                    <input type="text" placeholder={"UserName"} onInput={onInputUserNameHandler}/>
                </div>
                <div className={"passwordLoginPage"}>
                    <input type="password" placeholder={"Password"} onInput={onInputPasswordHandler}/>
                </div>
                <div className={"loginButtonLoginPage"}>
                    <button>Login</button>
                </div>
            </form>
            <div className={"backButtonLoginPage"}>
                <button onClick={backMenuHandler}>Back</button>
            </div>
            <ToastContainer
                position="top-center"
                autoClose={2000}
                newestOnTop={false}
                rtl={false}
                pauseOnFocusLoss
                pauseOnHover
                theme="colored"
                style={{width: "20vw"}}
                limit={1}
            />
        </div>
    );
}