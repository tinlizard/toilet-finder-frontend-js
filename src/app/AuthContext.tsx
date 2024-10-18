"use client"
import { useState, createContext, useContext } from "react"

const AuthContext = createContext<boolean>(false)

export const AuthProvider = ({children}) => {
    const [loggedIn,setLoggedIn] = useState<boolean>(false)

    return <AuthContext.Provider value={{loggedIn,setLoggedIn}}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)