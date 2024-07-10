"use client"
import { useEffect } from 'react';
import Map from 'ol/Map.js';
import OSM from 'ol/source/OSM.js';
import TileLayer from 'ol/layer/Tile.js';
import View from 'ol/View.js';
import { Feature } from 'ol';
import { Point } from 'ol/geom';
import Style from 'ol/style/Style';
import Icon from 'ol/style/Icon';
import { Vector } from 'ol/source';
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

        const poi = new Feature({
            geometry: new Point(olProj.fromLonLat(coordinates)),
            name: 'POI'
        });

        const poiStyle = new Style({
          image: new Icon({
              anchor: olProj.fromLonLat(coordinates),
              src: '../../public/poi.png',
          })
        });

        const vectorSource = new Vector({
          features: [poi]
      });
      
      const vectorLayer = new Vector({
          source: vectorSource
      });
      
      map.addLayer(vectorLayer);
      
      
        poi.setStyle(poiStyle);
        return () => map.setTarget(null);
    }, [])
    

    return(
       <div id="map">

       </div>
    )
}
