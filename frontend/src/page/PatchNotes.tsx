import React from 'react';
import {useNavigate} from "react-router-dom";
import {Patch} from "../model/PatchType";
import "../css/PatchNotes.css"

export default function PatchNotes() {
    const nav = useNavigate()

    const patchNotes: Patch[] = [{
        version: "0.1", description: "· After death u will go to the DeathScreen directly without more playing\n" +
            "-· User got now notification if the had something false at login\n" +
            "-· User need now a longer Username for registration, longer than 3 letters\n" +
            "-· Create a new game need now a CharacterName and GameName its longer than 3 letters\n", date: "04.07.2023"
    },
        {
            version: "0.2", description: "· Now Player can see a button for PatchNotes\n" +
                "-· PatchNote site with new Patches (still in progress)\n" +
                "-· Fix text notification at DeathPage from \"Death\" to \"dead\"", date: "04.07.2023"
        }]

    function backToFirstPage() {
        nav("/")
    }

    return (
        <div className={"patchPageFirstPage"}>
            <div className={"buttonBackPatchPage"}>
                <button onClick={backToFirstPage}>Back</button>
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
