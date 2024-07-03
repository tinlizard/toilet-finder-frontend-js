"use client"
import { useEffect } from 'react';
import Map from 'ol/Map.js';
import OSM from 'ol/source/OSM.js';
import TileLayer from 'ol/layer/Tile.js';
import View from 'ol/View.js';
import './map.css'

export default function PopularMap(){
    useEffect(() => {
        const map = new Map({
            layers: [
              new TileLayer({
                source: new OSM(),
              }),
            ],
            target: 'map',
            view: new View({
              center: [0, 0],
              zoom: 2,
            }),
          });

          return () => map.setTarget(null);
    }, [])
    

    return(
       <div id="map" style={{width: "400px", height: "300px"}}/>
    )
}
