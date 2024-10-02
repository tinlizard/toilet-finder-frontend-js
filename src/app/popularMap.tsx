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
  name: string,
  address: string,
  city: string,
  country: string, 
  reviews: number,
  latitude: number,
  longitude: number,
  sexes: string,
}

export default function PopularMap({latitude,longitude,toilet}: Coordinates | Toilet){
    const userLocation = new Feature({
      geometry: new Point(fromLonLat([longitude,latitude])),
      type: 'icon',
    })

    const [toiletsArr, setToiletsArr] = useState([
      ...toilet.map((t) => new Feature({
        geometry: new Point(fromLonLat([t.longitude, t.latitude])),
      }))
    ]);
    


    useEffect(() => {
        console.log(`initial longitude is ${longitude}`)
      
        const osmLayer = new TileLayer({
          preload: Infinity,
          source: new OSM(),
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

        for(let i=0; i<toiletsArr.length; i++){
          toiletsArr[i].setStyle(iconStyle)
          
        }

        const vectorSource = new VectorSource({
          features: [userLocation, ...toiletsArr],
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
        <div id="map"/>
    )
}