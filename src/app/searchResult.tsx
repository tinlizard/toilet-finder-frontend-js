"use client"
import { Toilet } from "./page"
import "./searchResults.css"
import Image, { StaticImageData } from "next/image"
import { useState, useEffect } from "react"
import maleIcon from './male.png'
import maleAndFemaleIcon from './maleandfemale.png'
import femaleIcon from './female.png'

interface SearchResults {
    visibility: boolean,
    resultsHeading: string,
    toilets: Toilet[],
}

export default function SearchResults({visibility,resultsHeading,toilets}: SearchResults){
    const [imageUrl, setImageUrl] = useState<StaticImageData[]>([maleAndFemaleIcon])

    const changeSexesIcon = () => {
        toilets.forEach((toilet)=>{
            if(toilet.sexes === 'Male/Female'){
                setImageUrl([...imageUrl,maleAndFemaleIcon])
            } else if (toilet.sexes === 'Male only') {
                setImageUrl([...imageUrl,maleIcon])
            } else {
                setImageUrl([...imageUrl,femaleIcon])
            }
        })
    }

    useEffect(()=>{
        changeSexesIcon()
    },[])

    const toiletsAddressesList = toilets.map((toilet,index) => <li key={toilet.id}>
        <b>{toilet.name} - {toilet.address}, {toilet.city}</b>
        <br></br>
        <Image src={imageUrl[index]} alt="sex icon (male/female, male only, female only)" width={11} height={15}/>{toilet.sexes}
        <br></br>
        <Image src="/marker.png" alt="location  marker" width={11} height={15}/>  {toilet.longitude}, {toilet.latitude}
    </li>)

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