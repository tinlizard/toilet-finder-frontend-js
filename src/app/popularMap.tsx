"use client"
import { useEffect } from 'react';
import './map.css'
import { Loader } from "@googlemaps/js-api-loader"
import { useState } from 'react';

interface Coordinates {
  latitude: number | null;
  longitude: number | null;
}

export default function PopularMap({latitude,longitude}: Coordinates){
  const [address, setAddress] = useState<string | null>(null);
  const [city, setCity] = useState<string | null>(null);
  const [data,setData] = useState<string | null>(null);

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
    zoom: 15,
    mapId: "NEARBY_TOILETS"
  };

    useEffect(() => {
        console.log(`initial longitude is ${longitude}`)

        loader
          .importLibrary('maps')
          .then(async ({Map, Geocoder}) => {
            const map = new Map(document.getElementById("map"), mapOptions)
            const {AdvancedMarkerElement} = await loader.importLibrary('marker')

            new AdvancedMarkerElement({map, position: mapOptions.center})
           
            /*
            An example of an AdvancedMarkerElement placed at custom coordinates. 

            new AdvancedMarkerElement({map, position: {lat:50.071900,lng:14.408242}})
            */

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
        fetch("http://127.0.0.1:8000/toilets/")
        .then(response=> response.json())
        .then(fetchData => {
          setData(JSON.stringify(fetchData))
          console.log(`Fetched data is ${data}`)
        })
        .catch(error => console.error(`Error fetching data from toilets database API! Error is: ${error}`))
      }
    }, [address])
    

    return(
       <div id="map">

       </div>
    )
}