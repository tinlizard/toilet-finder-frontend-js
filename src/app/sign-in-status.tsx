"use client"
import Image from "next/image";
import Link from "next/link";

interface Status {
    isLoggedIn: boolean
}

export default function SignInStatus({isLoggedIn}: Status) {
    if(isLoggedIn) {
        return(
            <div className="sign-in-right">
                <button style={{backgroundColor: "#ffffff"}}>
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
            <div className="login-container">
                <div className="sign-in-right">
                    <h3><Link href="/login">Log in/Sign up</Link></h3>
                </div>
            </div>
        )
    }
}
