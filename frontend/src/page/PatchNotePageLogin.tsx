import React from 'react';
import {useNavigate} from "react-router-dom";
import "../css/PatchNotePageLogin.css"
import usePatch from "../hooks/usePatch";

export default function PatchNotePageLogin() {
    const nav = useNavigate()

    const {patchNotes} = usePatch()

    function backToStartPage() {
        nav("/start")
    }

    return (
        <div className={"patchPageStartPage"}>
            <div className={"buttonBackPatchPageStartPage"}>
                <button onClick={backToStartPage}>Back</button>
            </div>
            <div className={"patchStartPage"}>
                {patchNotes.reverse().map((patch) => (
                    <div className={"patchFileStartPage"}>
                        <h1>Version: {patch.version}</h1>
                        <h2>PatchNote: </h2>{patch.description.split('-').map((item, index) => (
                        <p key={index}>{item.trim()}</p>
                    ))}
                        <h3>PatchDate: {patch.date}</h3>
                    </div>
                ))}
            </div>
        </div>
    );
}
