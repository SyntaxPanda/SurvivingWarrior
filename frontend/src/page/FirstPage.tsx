import React, {useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import "../css/FirstPage.css"
import {toast, ToastContainer} from "react-toastify";

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
            <ToastContainer
                position="top-center"
                autoClose={4000}
                hideProgressBar
                newestOnTop={false}
                rtl={false}
                pauseOnFocusLoss
                pauseOnHover
                theme="dark"
                style={{width: "20vw"}}
                limit={2}
            />
        </div>
    );
}