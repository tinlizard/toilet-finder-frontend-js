"use client"
import Image from "next/image"
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
                    <li><Image src={"/bookmark.png"} width={20} height={20} alt="bookmark icon" style={{paddingRight:8}}></Image>Saved</li>
                    <li><Image src={"/star.png"} width={20} height={20} alt="bookmark icon" style={{paddingRight:8}}></Image>Top reviewed bathrooms</li>
                    <li>Recents</li>
                </ul>
            </div>
        )
    }
}