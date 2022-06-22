import React from "react";
import coctails from "../data/coctails.json";
import "../styles/coctailsList.css";
import Ingredient from "../components/ingredients/ingredient"
import Steps from "./steps/steps";

export default function ShowAllCoctails(){
    return(
        coctails.map((coctail, index) => {
            return(
                <div key={index}>
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