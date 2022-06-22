import React from "react";
import Ingredient from "./ingredients/ingredient";
import coctails from "../data/coctails.json";
import Steps from "./steps/steps.js"
import {Link} from "react-router-dom";

export default function CoctailSpecificInfo({id}){
    return(
                <div key={id}>
                    <img src={coctails[id-1].image} alt={"zdjecie drinka"}/>
                    <p>Drink: {coctails[id-1].name}</p>
                    <p>Typ drinka: {coctails[id-1].type}</p>
                    <p>Skladniki do drinka:</p>
                    <Ingredient ingredientList={coctails[id-1].ingredients}/>
                    <p>Jak zrobić drinka:</p>
                    <Steps stepsList={coctails[id-1].steps}/>
                    huheuheuheueheuh
                    <Link to={"/"}>Cofnij do strony głównej</Link>
                </div>
    )
}