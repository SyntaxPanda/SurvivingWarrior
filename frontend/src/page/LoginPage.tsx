import React, {ChangeEvent, FormEvent, useState} from 'react';
import {useNavigate} from "react-router-dom";
import "../css/LoginPage.css"

type Props={
    login: (username:string, password:string) => Promise<void>
}
export default function LoginPage(props:Props) {
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
            .catch(error => console.error(error))
    }

    function onInputPasswordHandler(e: ChangeEvent<HTMLInputElement>) {
        setPassword(e.target.value)
    }

    function onInputUserNameHandler(e: ChangeEvent<HTMLInputElement>) {
        setUserName(e.target.value)
    }

    function backMenuHandler(){
        navigate("/")
    }

    return (
        <div className={"loginPage"}>
            <form onSubmit={userLogin}>
                <div>
                    <input type="text" placeholder={"UserName"} onInput={onInputUserNameHandler}/>
                </div>
                <div>
                    <input type="password" placeholder={"Password"} onInput={onInputPasswordHandler}/>
                </div>
                <button>Login</button>
            </form>
            <button onClick={backMenuHandler}>Back</button>
        </div>
    );
}