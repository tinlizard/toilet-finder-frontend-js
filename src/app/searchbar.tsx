"use client"
import { useEffect, useState } from "react"
import Image from "next/image"
import NavbarMenu from "./navbar-menu"

export default function SearchBar(){
    const [input,setInput] = useState("Enter city/country name, or address...")
    const [data,setData] = useState("No data")
    const [visibility,setVisibility] = useState(false)

    async function fetchData(){
      const response = await fetch("http://127.0.0.1:8000/toilets/")
      const dataStuff = await response.json()
      setData(dataStuff)

      for(let i=0; i<data.length; i++){
        if(input === data[i].address || input === data[i].country || input == data[i].city){
          console.log(`${input} exists!`)
        }
        else {
          console.log('your input does not exist')
        }
      }
   }

    useEffect(() => {
      console.log(input)
    }, [input])
    
    return(
        <>
          <div className="sign-in-right">
              <button style={{backgroundColor: "#f2cc8b"}}>
                <Image src="/login.png"
                  width={35}
                  height={35}
                  alt="login icon button"
                >
                </Image>
              </button>
          </div>  
          <div className="title">
            <Image
            src="/toilet.png"
            width={70}
            height={70}
            alt="toilet icon"
            ></Image>
            <h1>Toilet-Finder.js</h1>
          </div>
          <div className="searchbar-container">
              <div className="searchbar">
                <button className="search-menu-button" onClick={()=>setVisibility(!visibility)}>
                  <Image 
                  src="/hamburger-menu.png"
                  width={20}
                  height={20}
                  alt="menu button icon"
                  ></Image>
                </button>
                <input type="text" className="searchbar-input" defaultValue={input} onFocus={()=>setInput("")} onChange={(e)=>setInput(e.target.value)}></input>
                <div>
                 <button className="searchbar-button" onClick={fetchData}>
                  <Image
                    src="/search-icon.png"
                    width={20}
                    height={20}
                    alt="search icon"
                  ></Image>
                 </button>
                </div>
            </div>
          </div>
          <NavbarMenu visible={visibility}></NavbarMenu>
        </>
    )
}