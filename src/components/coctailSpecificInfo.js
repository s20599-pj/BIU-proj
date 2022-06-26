import React, {useEffect} from "react";
import Ingredient from "./ingredients/ingredient";
import coctails from "../data/coctails.json";
import Steps from "./steps/steps.js"
import {Link, useParams} from "react-router-dom";

export default function CoctailSpecificInfo(){
    let { coctailId } = useParams();

    return(
                <div key={coctailId}>
                    <img src={coctails[coctailId-1].image} alt={"zdjecie drinka"}/>
                    <p>Drink: {coctails[coctailId-1].name}</p>
                    <p>Typ drinka: {coctails[coctailId-1].type}</p>
                    <p>Skladniki do drinka:</p>
                    <Ingredient ingredientList={coctails[coctailId-1].ingredients}/>
                    <p>Jak zrobić drinka:</p>
                    <Steps stepsList={coctails[coctailId-1].steps}/>
                    <Link to={"/coctails"}>Cofnij do listy drinków</Link>
                </div>
    )
}