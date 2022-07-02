import React from "react";
import Ingredient from "./ingredients/ingredient";
import Steps from "./steps/steps.js"
import {Link, useParams} from "react-router-dom";
import ShowComments from "./comments/showComments";
import AddComment from "./comments/addComment";
import {useGlobalContext} from '../globalFunctions';
import Rating from "./rating";
import "../styles/coctailDetails.css"

export default function CoctailSpecificInfo(){
    let { coctailId } = useParams();
    const {getSpecificCoctail} = useGlobalContext();

    const coctailDetails = getSpecificCoctail(parseInt(coctailId));

    return(
                <div key={coctailId} className={"specificCoctail"}>
                    <img src={coctailDetails.image} alt={"zdjecie drinka"}/>
                    <Rating ratings={coctailDetails.ratings} coctail_id={coctailId} />
                    <p>Drink: {coctailDetails.name}</p>
                    <p>Typ drinka: {coctailDetails.type}</p>
                    <p>Rodzaj szklanki: {coctailDetails.glass}</p>
                    <p>Skladniki do drinka:</p>
                    <Ingredient ingredientList={coctailDetails.ingredients}/>
                    <p>Jak zrobić drinka:</p>
                    <Steps stepsList={coctailDetails.steps}/>
                    <ShowComments coctail={coctailDetails} />
                    <AddComment coctail={coctailDetails} />
                    <Link to={"/coctails"}>Cofnij do listy drinków</Link><br/>
                    <Link to={"/editCoctail/"+coctailId}>Edytuj drinka</Link>
                </div>
    )
}