"use client"
import "./home.css"
import SearchBar from "./searchbar";
import PopularMap from "./popularMap";
import { useState,useEffect,createContext } from "react";
import { load } from "ol/Image";
import Image from "next/image";

export const CoordinateContext = createContext<number[]>([0,0])

export default function Home() {
  const [latitude, setLatitude] = useState<number>(0)
  const [longitude, setLongitude] = useState<number>(0)
  const [coordinates,setCoordinates] = useState<number[]>([0,0])
  const [loading,setLoading] = useState<boolean>(true)

  const getLocationInfo = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLatitude(position.coords.latitude);
        console.log('got latitude')
        setLongitude(position.coords.longitude);
        console.log('got longitude')
        setCoordinates([4,5])
        console.log(coordinates)
        setLoading(false)
      })
    } else {
      console.log('Geolocation is NOT Available');
    }
  };

  useEffect(() => {
    getLocationInfo()
  }, []);

  if(loading){
    return (
      <div>
        <SearchBar></SearchBar>
        <div className="home-h1">
          <h1>Loading geolocation data... please make sure you have allowed geolocation services.</h1>
        </div>
        <div className="home-gif">
         <Image src={"/loading.gif"} width={100} height={100} alt="loading animation gif"></Image>
        </div>
      </div>
    )
  } else {
    return(
      <div>
        <SearchBar></SearchBar>
        <div className="map-container">
        <PopularMap></PopularMap>
      </div>
      <div className="home-container">
      <div className="home-h1">
        <h1>Top-reviewed toilets in your area</h1>
      </div>
      <div className="home-main">
        <ol>
          <li>
            Toilet 1
            <p>latitude: {latitude}</p>
          </li>
          <li>Toilet 2
            <p>longitude: {longitude}</p>
          </li>
        </ol>
      </div>
      </div>
      </div>
    )
  }
}
