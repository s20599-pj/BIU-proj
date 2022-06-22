import React from "react";
import Ingredient from "./ingredients/ingredient";
import coctails from "../data/coctails.json";
import Steps from "./steps/steps.js"

export default function CoctailSpecificInfo({id}){
    return(
        coctails.map((coctail, index) => {
            return(
                <div key={id}>
                    <img src={coctail.image} alt={"zdjecie drinka"}/>
                    <p>Drink: {coctail.name}</p>
                    <p>Typ drinka: {coctail.type}</p>
                    <p>Kliknij <a href={'/coctail/' + coctail.id}>tutaj</a> aby poznać szeczegóły</p>
                    <p>Skladniki do drinka:</p>
                    <Ingredient ingredientList={coctail.ingredients}/>
                    <p>Jak zrobić drinka:</p>
                    <Steps stepsList={coctail.steps}/>
                </div>
            )
        })
    )
}