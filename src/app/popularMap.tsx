"use client"
import { useEffect } from 'react';
import './map.css'
import { Loader } from "@googlemaps/js-api-loader"

interface Coordinates {
  latitude: number | null;
  longitude: number | null;
}

export default function PopularMap({latitude,longitude}: Coordinates){
  const loader = new Loader({
    apiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY,
    version: "weekly",
    libraries: ["places"]
  });
  
  const mapOptions = {
    center: {
      lat: latitude,
      lng: longitude,
    },
    zoom: 15
  };

    useEffect(() => {
        loader
          .importLibrary('maps')
          .then(({Map}) => {
            new Map(document.getElementById("map"), mapOptions);
          })
          .catch((error)=>console.log(`Error loading Google Maps Map: ${error}`))
    }, [])
    

    return(
       <div id="map">

       </div>
    )
}