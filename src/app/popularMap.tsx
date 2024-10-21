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
import { Toilet } from './page';

interface MapsInterface {
  latitude: number;
  longitude: number;
  toilet: Toilet[];
  visible: boolean,
}

export default function PopularMap({latitude,longitude,toilet,visible}: MapsInterface){
    const userLocation = new Feature({
      geometry: new Point(fromLonLat([longitude,latitude])),
      type: 'icon',
    })

    //make sure all the toilets are represented as features
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

    if(visible){
      return(
        <div>
          <h1 style={{marginLeft: 220}}>Map of Worldwide Public Toilets</h1>
          <div id="map"/>
        </div>
      )
    } else {
      return(
        <div></div>
      )
    }
}