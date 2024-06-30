"use client"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import './navbar.css'

interface NavbarInterface {
    visible: boolean
}

export default function NavbarMenu({visible}: NavbarInterface) {
    if(!visible){
        return(
            <div className="navbar-small">
                <ul>
                  <Link href="/saved"><li><Image src={"/bookmark.png"} width={30} height={30} alt="bookmark icon" style={{paddingRight:8}}></Image></li></Link>
                  <Link href="/top-reviewed"><li><Image src={"/star.png"} width={30} height={30} alt="bookmark icon" style={{paddingRight:8}}></Image></li></Link>
                <Link href="/recents"><li><Image src={"/timer.png"} width={30} height={30} alt="timer icon"></Image></li></Link>
                  <Link href="/login"><li><Image src={"/login.png"} width={30} height={30} alt="login icon"></Image></li></Link>
                </ul>
            </div>
        )
    } else {
        return(
            <div className="navbar">
                <ul>
                <Link href="/saved"><li><Image src={"/bookmark.png"} width={30} height={30} alt="bookmark icon" style={{paddingRight:8}}></Image>Saved</li></Link>
                <Link href="/top-reviewed"><li><Image src={"/star.png"} width={30} height={30} alt="bookmark icon" style={{paddingRight:8}}></Image>Top reviewed bathrooms</li></Link>
                <Link href="/recents"><li><Image src={"/timer.png"} width={30} height={30} alt="timer icon"></Image>Recents</li></Link>
                <Link href="/login"><li><Image src={"/login.png"} width={30} height={30} alt="login icon"></Image>Account</li></Link>
                </ul>
            </div>
        )
    }
}
