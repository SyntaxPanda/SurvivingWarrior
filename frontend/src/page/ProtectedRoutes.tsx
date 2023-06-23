import React from 'react';
import {Navigate, Outlet} from "react-router-dom";

type Props = {
    user:string
}
export default function ProtectedRoutes(props:Props) {

    const auth = props.user !== undefined && props.user !== "Pls Login"

    return (
        auth ? <Outlet/> : <Navigate to={"/start"}/>
    );
}