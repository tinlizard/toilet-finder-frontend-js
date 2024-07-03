"use client"
import "./home.css"
import SearchBar from "./searchbar";
import PopularMap from "./popularMap";

export default function Home() {
  return (
    <div>
      <SearchBar></SearchBar>
      <div className="home-container">
      <div className="home-h1">
        <h1>Top-reviewed toilets in your area</h1>
      </div>
      <div className="home-main">
        <PopularMap></PopularMap>
        <ol>
          <li>
            Toilet 1
            <p>Placeholder text</p>
          </li>
          <li>Toilet 2</li>
        </ol>
      </div>
    </div>
    </div>
  );
}
