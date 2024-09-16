"use client"
import { LoginContext } from "../searchbar";
import { useAuth } from "../AuthContext";
import "./account.css"
import Login from "../login/page";
import "../login/login.css"
import Cookies from "js-cookie";


export default function Account(){
    const {loggedIn,setLoggedIn} = useAuth()

    if (loggedIn || Cookies.get('loggedIn')){
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
