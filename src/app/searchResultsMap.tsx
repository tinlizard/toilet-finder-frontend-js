"use client"
import { useEffect } from "react"
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
import './searchResultsMap.css'

interface SearchResultsMapInterface {
    longitude: number,
    latitude: number,
    visibility: boolean
}

export default function SearchResultsMap({longitude, latitude, visibility}: SearchResultsMapInterface){
    const toiletLocation = new Feature({
        geometry: new Point(fromLonLat([longitude,latitude])),
        type: 'icon',
    })

    useEffect(()=>{
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

        toiletLocation.setStyle(iconStyle)

        const vectorSource = new VectorSource({
            features: [toiletLocation],
          })
  
          const vectorLayer = new VectorLayer({
            source: vectorSource,
          })

          const map = new Map({
            layers: [osmLayer,vectorLayer],
            view: new View({
              center: fromLonLat([longitude,latitude]),
              zoom: 15,
            })
          })
          return () => map.setTarget('search-map')
    },[])

    if(visibility){
        return(
            <div className="search-results-map">
                <div id="search-map"/>
            </div>
        )
    } else {
        return(
            <div></div>
        )
    }
}