'use client'
import SearchResultsMap from '../searchResultsMap'
import "./map-result.css"
import { useSearchParams } from 'next/navigation'

export default function ToiletMapSearchResult() {
    const searchParams = useSearchParams()
    const longitude = searchParams.get('long')
    const latitude = searchParams.get('lat')

    return(
        <div className="map-link-search-results">
            <h1>Toilet Map</h1>
            <SearchResultsMap longitude={parseFloat(longitude)} latitude={parseFloat(latitude)}></SearchResultsMap>
        </div>
    )
}
