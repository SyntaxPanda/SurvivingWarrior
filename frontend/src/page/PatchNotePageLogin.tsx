import React from 'react';
import {useNavigate} from "react-router-dom";
import "../css/PatchNotes.css"
import usePatch from "../hooks/usePatch";

export default function PatchNotePageLogin() {
    const nav = useNavigate()

    const {patchNotes} = usePatch()

    function backToStartPage() {
        nav("/start")
    }

    return (
        <div className={"patchPageFirstPage"}>
            <div className={"buttonBackPatchPage"}>
                <button onClick={backToStartPage}>Back</button>
            </div>
            <div className={"patch"}>
                {patchNotes.reverse().map((patch) => (
                    <div className={"patchFile"}>
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
