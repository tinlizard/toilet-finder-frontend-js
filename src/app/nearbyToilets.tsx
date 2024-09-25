"use client"
import { useEffect, useState } from 'react';
import { Loader } from "@googlemaps/js-api-loader"

interface Coordinates {
    longitude: number | null;
    latitude: number | null;
}

export default function NearbyToilets({longitude,latitude}: Coordinates){
    const longitudeString = longitude?.toString()
    const latitudeString = latitude?.toString()
    const coordinateString = `${longitudeString}, ${latitudeString}`
    const [address,setAddress] = useState<string>("")

    useEffect(()=>{
        
    })

    return(
        <div className="nearby-toilets">
            <ol>
            <li>
                Toilet 1
                <p>longitude: {longitude}</p>
                <p>latitude: {latitude}</p>
                <p>address: {address}</p>
            </li>
            </ol>
        </div>
    )
}