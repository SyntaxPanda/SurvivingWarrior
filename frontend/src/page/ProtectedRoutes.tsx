import React from 'react';
import {Navigate, Outlet} from "react-router-dom";
import {User} from "../model/UserType";

type Props = {
    user:User|undefined
}
export default function ProtectedRoutes(props:Props) {

    const auth = props.user !== undefined && props.user.userName !== "anonymousUser"

    return (
        auth ? <Outlet/> : <Navigate to={"/"}/>
    );
}