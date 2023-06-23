import React from 'react';
import {useNavigate} from "react-router-dom";

export default function FirstPage() {
    const navigate = useNavigate()

    function onClickLoginHandler(){
        navigate("/login")
    }

    function onClickRegisterHandler(){
        navigate("/register")
    }

    return (
        <div>
            <div>
                <button onClick={onClickLoginHandler}>Login</button>
            </div>
            <div>
                <button onClick={onClickRegisterHandler}>Register</button>
            </div>
        </div>
    );
}