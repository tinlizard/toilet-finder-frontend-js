"use client"
import { useState, useContext, useEffect } from "react"
import "./login.css"
import { useAuth } from "../AuthContext"
import Cookies from 'js-cookie'

export default function Login(){
    const {loggedIn,setLoggedIn} = useAuth()

    const [username,setUsername] = useState<string>("")
    const [password,setPassword] = useState<string>("")
    const [loggedInText,setLoggedInText] = useState<string>("")

    async function getAuth() {
        const response = await fetch("http://127.0.0.1:8000/users/")
        const jsonResponse = await response.json()
        console.log(jsonResponse)
        
        for(let i=0; i<jsonResponse.length; i++){
            if(jsonResponse[i].username === username && jsonResponse[i].password === password) {
                console.log('logged in successfully')
                setLoggedIn(true)

                Cookies.set('loggedIn',loggedIn, {expires: 7})
                Cookies.set('username',username, {expires: 7})
                Cookies.set('password',password, {expires: 7})

                console.log(Cookies.get('loggedIn'))
                location.reload()
            }
            else {
                setLoggedInText("Login error. Check username and password combination.")
                console.log('failed to login')
            }
        }
    }

    return(
        <div className="login">
            <label>Email: </label>
            <br></br>
            <br></br>
            <input type="text" onChange={(e)=>setUsername(e.target.value)}></input>
            <br></br>
            <br></br>
            <label>Password: </label>
            <br></br>
            <br></br>
            <input type="password" onChange={(e)=>setPassword(e.target.value)}></input>
            <br></br>
            <br></br>
            <button onClick={()=>getAuth()}>Login</button>
            <h5>{loggedInText}</h5>
            <h6>Dont have an account yet? <a href="/register">Click here to register.</a></h6>
        </div>
    )
}
