import React from 'react';
import {useNavigate} from "react-router-dom";
import "../css/FirstPage.css"

export default function FirstPage() {
    const navigate = useNavigate()

    function onClickLoginHandler(){
        navigate("/login")
    }

    function onClickRegisterHandler(){
        navigate("/register")
    }

    return (
        <div className={"firstPage"}>
            <div>
                <button onClick={onClickLoginHandler}>Login</button>
            </div>
            <div>
                <button onClick={onClickRegisterHandler}>Register</button>
            </div>
        </div>
    );
}