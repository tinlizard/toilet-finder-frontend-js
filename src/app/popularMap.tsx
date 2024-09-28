"use client"
import { useEffect } from 'react';
import './map.css'
import { Loader } from "@googlemaps/js-api-loader"
import { useState } from 'react';

interface Coordinates {
  latitude: number | null;
  longitude: number | null;
}

interface Toilet {
  latitude: number,
  longitude: number,
}

export default function PopularMap({latitude,longitude}: Coordinates){
  const [address, setAddress] = useState<string | null>(null);
  const [city, setCity] = useState<string | null>(null);
  const [data,setData] = useState<Toilet[]>([{latitude: 46.057930, longitude: 14.502650}]);

  const loader = new Loader({
    apiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY,
    version: "weekly",
    libraries: ["places"]
  });

  const secondLoader = new Loader(
    loader.options
  );
  
  const mapOptions = {
    center: {
      lat: latitude,
      lng: longitude,
    },
    zoom: 4,
    mapId: "NEARBY_TOILETS"
  };

  const fetchToilets = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/toilets/")
      const localData = await response.json()
      setData(localData)
      console.log(`Fetched data is ${data}`)
    } catch(error) {
      console.error(`Geocoder failed due to: ${error}`)
    }
  }

    useEffect(() => {
        console.log(`initial longitude is ${longitude}`)
        fetchToilets()

        loader
          .importLibrary('maps')
          .then(async ({Map}) => {
            const map = new Map(document.getElementById("map"), mapOptions)
            const {AdvancedMarkerElement} = await loader.importLibrary('marker')
           
            /*
            An example of an AdvancedMarkerElement placed at custom coordinates. 
            */

            for(let i=0; i<data.length; i++){
              new AdvancedMarkerElement({map, position: {lat: data[i].latitude, lng: data[i].longitude}})
            }

            //new AdvancedMarkerElement({map, position: {lat:46.057930,lng:14.510550}})
            //new AdvancedMarkerElement({map, position: {lat:46.052820,lng:14.502650}})
          })
          .catch((error)=>console.log(`Error loading Google Maps Map: ${error}`))

          secondLoader
         .importLibrary('geocoding')
         .then(async({Geocoder})=>{
           const geocoder = new Geocoder()
           
           geocoder
           .geocode({ location: { lat: latitude, lng: longitude } })
           .then((response: any) => {
             if (response.results && response.results.length > 0) {
               setAddress(response.results[0].formatted_address);
               console.log(`Address is: ${response.results[0].formatted_address}`);
             } else {
               console.error('No results found');
             }
           })
           .catch((error: any) => {
             console.error(`Geocoder failed due to: ${error}`);
           });
         })
    }, [])

    useEffect(() => {
      if(address && address.includes("Praha")) {
          setCity("Prague")
      }
    }, [address])
    

    return(
       <div id="map">

       </div>
    )
}