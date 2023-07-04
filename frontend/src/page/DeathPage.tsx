import React, {useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import {toast, ToastContainer} from "react-toastify";
import "../css/DeathPage.css"

export default function DeathPage() {
    const nav = useNavigate()

    useEffect(() => {
        deathToMenu()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    function deathToMenu() {
        toast("You are dead! Game Over!")
        setTimeout(() => {
            nav("/start")
        }, 3500)
    }

    return (
        <div className={"deathPage"}>
            <ToastContainer
                position="top-center"
                autoClose={1500}
                newestOnTop={false}
                rtl={false}
                pauseOnFocusLoss
                pauseOnHover
                theme="dark"
                style={{width: "20vw"}}
            />
        </div>
    );
}