import { Toilet } from "./page"
import "./searchResults.css"

interface SearchResults {
    visibility: boolean,
    resultsHeading: string,
    toilets: Toilet[],
}

export default function SearchResults({visibility,resultsHeading,toilets}: SearchResults){
    const toiletsAddressesList = toilets.map(toilet => <li key={toilet.id}>{toilet.address},{toilet.city}</li>)
    
    if(visibility){
        return(
            <div className="search-results">
                <h1>
                    {resultsHeading}
                </h1>
                <ul>
                    {toiletsAddressesList}
                    
                </ul>
            </div>
        )
    } else {
        return(
            <div className="search-results"></div>
        )
    }
}