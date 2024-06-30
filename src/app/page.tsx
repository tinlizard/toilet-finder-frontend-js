"use client"
import Image from "next/image";
import "./home.css"
import { useState } from "react";

export default function Home() {
  const [data,setData] = useState("No data")

  return (
    <div className="home-container">
      <div className="home-h1">
        <h1>Top-reviewed toilets in your area</h1>
      </div>
      <div className="home-main">
        <ol>
          <li>
            Toilet 1
            <p>The awesome stuff</p>
          </li>
          <li>Toilet 2</li>
        </ol>
      </div>
    </div>
  );
}
