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
    zoom: 15,
    mapId: "NEARBY_TOILETS"
  };

    useEffect(() => {
        loader
          .importLibrary('maps')
          .then(async ({Map}) => {
            const map = new Map(document.getElementById("map"), mapOptions)
            const {AdvancedMarkerElement} = await loader.importLibrary('marker')
            new AdvancedMarkerElement({map, position: mapOptions.center})


            /*
            An example of an AdvancedMarkerElement placed at custom coordinates. 

            new AdvancedMarkerElement({map, position: {lat:50.071900,lng:14.408242}})
            */
          })
          .catch((error)=>console.log(`Error loading Google Maps Map: ${error}`))
    }, [])
    

    return(
       <div id="map">

       </div>
    )
}