"use client"
import "./home.css"
import SearchBar from "./searchbar";
import PopularMap from "./popularMap";
import { useState,useEffect,createContext} from "react";
import Image from "next/image";
import NearbyToilets from "./nearbyToilets";

export const InputContext = createContext("Enter city/country name, or address...")

interface Toilet {
  name: string,
  address: string,
  city: string,
  country: string, 
  reviews: number,
  latitude: number,
  longitude: number,
  sexes: string,
}

export default function Home() {
  const [latitude, setLatitude] = useState<number | null>(null)
  const [longitude, setLongitude] = useState<number | null>(null)
  const [loading,setLoading] = useState<boolean>(true)
  const [input,setInput] = useState<string>("Enter city/country name, or address...")
  const [results,setResults] = useState("Top-reviewed toilets in your area")
  const [toilets,setToilets] = useState<Toilet[]>([{
    name: "McDonald's",
    address:"Čopova ulica 14, 1000",
    city:"Ljubljana",
    country:"Slovenia",
    reviews: 0,
    latitude: 46.052820,
    longitude: 14.502650,
    sexes:"Male/Female"
  }])

  const getLocationInfo = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLatitude(position.coords.latitude);
        console.log(`got latitude: ${position.coords.latitude}, typeof latitude: ${typeof(position.coords.latitude)}`)
        setLongitude(position.coords.longitude);

        console.log(`got longitude: ${longitude}`)
        setLoading(false)
      }, 
      (error)=> console.log(`Error receiving geolocation data: ${error}`), 
      { enableHighAccuracy: true })
    } else {
      console.log('Geolocation is NOT Available');
    }
  };

  const fetchToilets = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/toilets/")
      const localData = await response.json()
      setToilets(localData)
      console.log(`Fetched data is ${toilets}`)
    } catch(error) {
      console.error(`Geocoder failed due to: ${error}`)
    }
  }

  useEffect(() => {
    fetchToilets()
    getLocationInfo()    
  }, []);

  useEffect(() => {
      if(input!=="Enter city/country name, or address..."){
        setResults(`Search results for ${input}`)
      }
  }, [input])

  if(loading){
    return (
      <div>
          <SearchBar input={input} setInput={setInput}></SearchBar>
        <div className="home-h1">
          <h1>Loading top toilets in your area... please make sure you have allowed geolocation services.</h1>
        </div>
        <div className="home-gif">
         <Image src={"/loading.gif"} width={100} height={100} alt="loading animation gif"></Image>
        </div>
      </div>
    )
  } else {
    return(
      <div>
          <SearchBar input={input} setInput={setInput}></SearchBar>
        <div className="map-container">
          <PopularMap latitude={latitude} longitude={longitude} toilet={toilets}></PopularMap>
      </div>
      <div className="home-container">
      <div className="home-h1">
        <h1>{results}</h1>
      </div>
      <div className="home-main">
        <NearbyToilets longitude={longitude} latitude={latitude}></NearbyToilets>
      </div>
      </div>
      </div>
    )
  }
}