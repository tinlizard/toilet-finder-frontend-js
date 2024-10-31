"use client"
import "./home.css"
import SearchBar from "./searchbar";
import PopularMap from "./popularMap";
import SearchResults from "./searchResult";
import { useState,useEffect,createContext} from "react";
import Image from "next/image";

export const InputContext = createContext("Enter city/country name, or address...")

export interface Toilet {
  id: number,
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
  const [latitude, setLatitude] = useState<number>(0)
  const [longitude, setLongitude] = useState<number>(0)
  const [loading,setLoading] = useState<boolean>(true)
  const [input,setInput] = useState<string>("Enter city/country name, or address...")
  const [results,setResultsHeading] = useState<string>("") 
  const [mapVisibility,setMapVisibility] = useState<boolean>(true)
  const [toilets,setToilets] = useState<Toilet[]>([{
    id: 0,
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
        setLongitude(position.coords.longitude);

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
        setResultsHeading(`Search results for ${input}`)
      }
  }, [input])

  if(loading){
    return (
      <div>
          <SearchBar input={input} setInput={setInput} setMapVisibility={setMapVisibility}></SearchBar>
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
          <SearchBar input={input} setInput={setInput} setMapVisibility={setMapVisibility}></SearchBar>
        <div className="map-container">
          <PopularMap latitude={latitude} longitude={longitude} toilet={toilets} visible={mapVisibility}></PopularMap>
          <SearchResults visibility={!mapVisibility} resultsHeading={results} toilets={toilets}></SearchResults>
        </div>
      </div>
    )
  }
}