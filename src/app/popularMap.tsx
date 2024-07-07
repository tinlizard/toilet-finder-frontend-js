"use client"
import { useEffect } from 'react';
import Map from 'ol/Map.js';
import OSM from 'ol/source/OSM.js';
import TileLayer from 'ol/layer/Tile.js';
import View from 'ol/View.js';
import * as olProj from 'ol/proj'
import './map.css'

interface Coordinates {
  coordinates: number[];
}

export default function PopularMap({coordinates}: Coordinates){
    useEffect(() => {
        const map = new Map({
            layers: [
              new TileLayer({
                source: new OSM(),
              }),
            ],
            target: 'map',
            view: new View({
              center: olProj.fromLonLat(coordinates),
              zoom: 13,
            }),
          });

          return () => map.setTarget(null);
    }, [])
    

    return(
       <div id="map">

       </div>
    )
}
