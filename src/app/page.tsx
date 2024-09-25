"use client"
import "./home.css"
import SearchBar from "./searchbar";
import PopularMap from "./popularMap";
import { useState,useEffect,createContext} from "react";
import Image from "next/image";
import NearbyToilets from "./nearbyToilets";

export const InputContext = createContext("Enter city/country name, or address...")

export default function Home() {
  const [latitude, setLatitude] = useState<number | null>(null)
  const [longitude, setLongitude] = useState<number | null>(null)
  const [coordinates,setCoordinates] = useState<number[]>([0,0])
  const [loading,setLoading] = useState<boolean>(true)
  const [input,setInput] = useState<string>("Enter city/country name, or address...")
  const [results,setResults] = useState("Top-reviewed toilets in your area")

  const addElements = (newElements: number[]) => {
    setCoordinates([])
    setCoordinates([...newElements])
  }

  const getLocationInfo = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLatitude(position.coords.latitude);
        console.log(`got latitude: ${position.coords.latitude}, typeof latitude: ${typeof(position.coords.latitude)}`)
        setLongitude(position.coords.longitude);

        console.log(`got longitude: ${longitude}`)
        //addElements([position.coords.longitude,position.coords.latitude])

        console.log(coordinates)
        setLoading(false)
      }, 
      (error)=> console.log(`Error receiving geolocation data: ${error}`), 
      { enableHighAccuracy: true })
    } else {
      console.log('Geolocation is NOT Available');
    }
  };

  useEffect(() => {
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
          <PopularMap latitude={latitude} longitude={longitude}></PopularMap>
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
