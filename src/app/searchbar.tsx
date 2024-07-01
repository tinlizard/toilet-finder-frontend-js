"use client"
import { useEffect, useState } from "react"
import Image from "next/image"
import SignInStatus from "./sign-in-status"

interface Toilet {
  address: string,
  country: string,
  city: string,
}

export default function SearchBar(){
    const [input,setInput] = useState("Enter city/country name, or address...")
    const [data,setData] = useState<Toilet[]>([{address: "No data", country: 'No data', city: 'No data'}]) //default values for data
    const [loggedIn,setLoggedIn] = useState(false)

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
          <SignInStatus isLoggedIn={loggedIn}></SignInStatus>
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
                <input type="text" className="searchbar-input" defaultValue={input} onFocus={()=>setInput("")} onChange={(e)=>setInput(e.target.value)}></input>
                <div>
                 <button className="searchbar-button" onClick={fetchData}>
                  <Image
                    src="/search-icon.png"
                    width={50}
                    height={50}
                    alt="search icon"
                  ></Image>
                 </button>
                </div>
            </div>
          </div>
        </>
    )
}
