"use client"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import './navbar.css'

export default function NavbarMenu() {
        return(
            <div className="navbar">
                <ul>
                <Link href="/"><li><Image src={"/home.png"} width={30} height={30} alt="home-icon"></Image>Home</li></Link>
                <Link href="/saved"><li><Image src={"/bookmark.png"} width={30} height={30} alt="bookmark icon" style={{paddingRight:8}}></Image>Saved</li></Link>
                <Link href="/top-reviewed"><li><Image src={"/star.png"} width={30} height={30} alt="bookmark icon" style={{paddingRight:8}}></Image>Top reviewed bathrooms</li></Link>
                <Link href="/recents"><li><Image src={"/timer.png"} width={30} height={30} alt="timer icon"></Image>Recents</li></Link>
                <Link href="/account"><li><Image src={"/login.png"} width={30} height={30} alt="login icon"></Image>Account</li></Link>
                </ul>
            </div>
        )
}