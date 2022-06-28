import React, {useEffect, useState} from "react";
import "../styles/coctailsList.css";
import Ingredient from "./ingredients/ingredient"
import Steps from "./steps/steps";
import {Link} from "react-router-dom";
import {useParams} from "react-router-dom";
import {useGlobalContext} from '../globalFunctions'

export default function ShowAllCoctails(){
    let params = useParams();

    const {coctails} = useGlobalContext();

    const getAllCoctails = () => {
        coctails();
    }

    return(
        getAllCoctails.map((coctail, index) => {

            return(
                <div key={index}>
                    <img src={coctail.image} alt={"zdjecie drinka"}/>
                    <p>Drink: {coctail.name}</p>
                    <p>Typ drinka: {coctail.type}</p>
                    <p>Kliknij <Link to={`/coctails/${coctail.id}`}>tutaj</Link> aby poznać szczegóły</p>
                </div>
            )
        })
    )
}