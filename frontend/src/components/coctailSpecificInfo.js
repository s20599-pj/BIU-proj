import React, {useEffect} from "react";
import Ingredient from "./ingredients/ingredient";
import Steps from "./steps/steps.js"
import {Link, useParams} from "react-router-dom";
import ShowComments from "./comments/showComments";
import AddComment from "./comments/addComment";


export default function CoctailSpecificInfo({coctails}){
    let { coctailId } = useParams();
    let currentCoctail = coctails[coctailId-1];



    return(
                <div key={coctailId}>
                    <img src={currentCoctail.image} alt={"zdjecie drinka"}/>
                    <p>Drink: {currentCoctail.name}</p>
                    <p>Typ drinka: {currentCoctail.type}</p>
                    <p>Skladniki do drinka:</p>
                    <Ingredient ingredientList={currentCoctail.ingredients}/>
                    <p>Jak zrobić drinka:</p>
                    <Steps stepsList={currentCoctail.steps}/>
                    <ShowComments coctail={currentCoctail} />
                    <AddComment coctail={currentCoctail} />
                    <Link to={"/coctails"}>Cofnij do listy drinków</Link>
                </div>
    )
}