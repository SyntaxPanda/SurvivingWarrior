import React from 'react';
import {useNavigate} from "react-router-dom";
import "../css/FirstPage.css"

export default function FirstPage() {
    const navigate = useNavigate()

    function onClickLoginHandler() {
        navigate("/login")
    }

    function onClickRegisterHandler() {
        navigate("/register")
    }

    function onClickHandlerPatchNotesFirstPage(){
        navigate("/patchNotes")
    }

    return (
        <div className={"firstPage"}>
            <div className={"buttonGroup"}>
                <div className={"loginButton"}>
                    <button onClick={onClickLoginHandler}>Login</button>
                </div>
                <div className={"registerButton"}>
                    <button onClick={onClickRegisterHandler}>Register</button>
                </div>
                <div className={"patchNotesButton"}>
                    <button onClick={onClickHandlerPatchNotesFirstPage}>Patch Notes</button>
                </div>
            </div>
        </div>
    );
}