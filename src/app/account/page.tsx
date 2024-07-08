"use client"
import { LoginContext } from "../searchbar";
import { useContext } from 'react';
import "./account.css"
import Login from "../login/page";
import "../login/login.css"


export default function Account(){
    const {login,setLoggedIn} = useContext<boolean>(LoginContext)

    if (login){
        return(
            <div className="account">
                <p>Logged in</p>
            </div>
        )
    } else {
        return(
            <div className="account">
                <p>Not logged in. To continue to your account, please login.</p>
                <Login></Login>
            </div>
        )
    }
}
