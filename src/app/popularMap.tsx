"use client"
import { useEffect } from 'react';
import './map.css'
import {Icon, Style} from 'ol/style.js';
import {Vector as VectorSource} from 'ol/source.js';
import {Vector as VectorLayer} from 'ol/layer.js';
import {fromLonLat} from 'ol/proj.js';
import Feature from 'ol/Feature.js';
import Map from 'ol/Map.js';
import Point from 'ol/geom/Point.js';
import View from 'ol/View.js';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
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
  const [data,setData] = useState<Toilet[]>([{latitude: 46.057930, longitude: 14.502650}]);


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
        const osmLayer = new TileLayer({
          preload: Infinity,
          source: new OSM(),
      })

        const userLocation = new Feature({
          geometry: new Point(fromLonLat([longitude,latitude])),
          type: 'icon',
        })

        const iconStyle = new Style({
            image: new Icon({
              anchor: [0.5, 1],
              width: 20,
              height: 30,
              src: './marker.png'
            })
        })
    
        userLocation.setStyle(iconStyle)

        const vectorSource = new VectorSource({
          features: [userLocation],
        })

        const vectorLayer = new VectorLayer({
          source: vectorSource,
        })

        const map = new Map({
          layers: [osmLayer,vectorLayer],
          target: document.getElementById('map'),
          view: new View({
            center: fromLonLat([longitude,latitude]),
            zoom: 4,
          })
        })
        return () => map.setTarget(null)
    }, [])
    

    return(
       <div id="map">

       </div>
    )
}