import React from "react";
import coctails from "../data/coctails.json";
import "../styles/coctailsList.css";
import Ingredient from "../components/ingredients/ingredient"
import Steps from "./steps/steps";
import {Link} from "react-router-dom";

export default function ShowAllCoctails(){
    return(
        coctails.map((coctail, index) => {
            return(
                <div key={index}>
                    <img src={coctail.image} alt={"zdjecie drinka"}/>
                    <p>Drink: {coctail.name}</p>
                    <p>Typ drinka: {coctail.type}</p>
                    <p>Kliknij <Link to={"/coctail/"+coctail.id}>tutaj</Link> aby poznać szczegóły</p>
                </div>
            )
        })
    )
}