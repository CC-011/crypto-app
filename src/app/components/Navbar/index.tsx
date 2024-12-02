"use client";
import { useState } from "react";
import Link from "next/link";
console.log("hello")
export default function Navbar() {
  const [cities, setCities] = useState(["paris", "london"]);
  const [value, setValue] = useState("");
  const handleChange = (e) => {
    setValue(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setCities([...cities, value]);
    setValue("");
  };
  return (
    <div>
        <form onSubmit={handleSubmit}>
            <input onChange={handleChange} 
            value={value} 
            style={{ color: "black" }}/>
        </form>
        <ul>
      {cities.map((city) => (
        <li key={city}>
         <Link href={`/city/${city}`}>{city.toUpperCase()}</Link>   
        </li>        
      ))}
      </ul>
    </div>      
  );
}
