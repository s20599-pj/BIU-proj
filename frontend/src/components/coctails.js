import React from "react";
import "../styles/coctailsList.css";
import {Link} from "react-router-dom";
import {useGlobalContext} from '../globalFunctions';
import SearchBar from "./searchBar";

export default function ShowAllCoctails(){
    const { coctails} = useGlobalContext();

    return(
        <div>
            <SearchBar />
            {coctails.map((coctail, index) => {
                return (
                    <div key={index}>
                        <img src={coctail.image} alt={"zdjecie drinka"}/>
                        <p>Drink: {coctail.name}</p>
                        <p>Typ drinka: {coctail.type}</p>
                        <p>Kliknij <Link to={`/coctails/${coctail.id}`}>tutaj</Link> aby poznać szczegóły</p>
                    </div>
                )
            })}
        </div>

    )
}