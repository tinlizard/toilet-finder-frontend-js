"use client"
import { useEffect } from 'react';
import Map from 'ol/Map.js';
import OSM from 'ol/source/OSM.js';
import TileLayer from 'ol/layer/Tile.js';
import View from 'ol/View.js';
import Style from 'ol/style/Style';
import Icon from 'ol/style/Icon';
import VectorSource from 'ol/source/Vector';
import { Point } from 'ol/geom';
import VectorLayer from 'ol/layer/Vector';
import * as olProj from 'ol/proj'
import './map.css'
import { Feature } from 'ol';

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

        const locationMarker = new Feature({
          type: 'icon',
          geometry: new Point(olProj.fromLonLat(coordinates)),
        })

        const markerLayer = new VectorLayer({
          source: new VectorSource({
            features: [locationMarker],
            }),
            style: new Style({
              image: new Icon({
                anchor: [0.5,1],
                width: 30,
                height: 40,
                src: 'marker.png' 
              })
            }),
        })
      
      
        map.addLayer(markerLayer)
        return () => map.setTarget(null); //ignore typescript error here, this still works
    }, [])
    

    return(
       <div id="map">

       </div>
    )
}
