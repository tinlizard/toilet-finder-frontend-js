"use client"
import { useState, useContext } from "react"
import "./login.css"
import { LoginContext } from "../searchbar"

export default function Login(){
    const {login,setLoggedIn} = useContext<boolean>(LoginContext)

    const [username,setUsername] = useState<string>("")
    const [password,setPassword] = useState<string>("")

    async function getAuth() {
        const response = await fetch("http://127.0.0.1:8000/users")
        const jsonResponse = await response.json()
        
        for(let i=0; i<jsonResponse.length; i++){
            if(jsonResponse[i].username === username && jsonResponse[i].password === password) {
                setLoggedIn(true)
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
            <input type="text" onChange={(e)=>setPassword(e.target.value)}></input>
            <br></br>
            <br></br>
            <button onClick={()=>getAuth()}>Login</button>
        </div>
    )
}
