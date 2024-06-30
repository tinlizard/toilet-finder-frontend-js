"use client"
import { useState } from "react";
import Image from "next/image";

interface Status {
    isLoggedIn: boolean
}

export default function SignInStatus({isLoggedIn}:Status) {
    if(isLoggedIn) {
        return(
            <div className="sign-in-right">
                <button style={{backgroundColor: "#f2cc8b"}}>
                    <Image src="/login.png"
                        width={35}
                        height={35}
                        alt="login icon button"
                    >
                </Image>
                </button>
                <h3>Logged in</h3>
        </div>  
        ) 
    } else {
        return(
            <div className="sign-in-right">
                <h3>Log in/Sign up</h3>
            </div>
        )
    }
}
