import type { JSX } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import type { RootState } from "../app/store";

export const PublicRoute = ({children}: {children: JSX.Element})=>{
    const isAuthenticated = useSelector((state: RootState)=> state.auth.isAuthenticated)

    return !isAuthenticated ? children : <Navigate to='/home' replace/>
}