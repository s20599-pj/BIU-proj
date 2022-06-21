import React from "react";
import coctails from "../data/coctails.json";
import "../styles/coctailsList.css";

export default function ShowAllCoctails(){
    return(
        coctails.map((coctail, index) => {
            return(
                <div key={index}>
                    <img src={coctail.image} alt={"zdjecie drinka"}/>
                    <p>Drink: {coctail.name}</p>
                    <p>Typ drinka: {coctail.type}</p>
                    <p>Kliknij <a href={'/coctail/' + coctail.id}>tutaj</a> aby poznać szeczegóły</p>
                </div>
            )
        })
    )
}