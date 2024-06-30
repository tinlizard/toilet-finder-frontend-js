"use client"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import './navbar.css'

export default function NavbarMenu({visible}) {
    if(!visible){
        return(
            <div className="navbar-none">
            </div>
        )
    } else {
        return(
            <div className="navbar">
                <ul>
                <Link href="/saved"><li><Image src={"/bookmark.png"} width={20} height={20} alt="bookmark icon" style={{paddingRight:8}}></Image>Saved</li></Link>
                <Link href="/top-reviewed"><li><Image src={"/star.png"} width={20} height={20} alt="bookmark icon" style={{paddingRight:8}}></Image>Top reviewed bathrooms</li></Link>
                <Link href="/recents"><li><Image src={"/timer.png"} width={20} height={20} alt="timer icon"></Image>Recents</li></Link>
                </ul>
            </div>
        )
    }
}