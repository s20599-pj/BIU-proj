import React from "react"

export default function Ingredient({ingredientList}){
    return(
      <div className={"ingredients"}>
          <ul>
              {ingredientList.map((ingredient, key) =>{
                  return(
                      <li key={key}>{ingredient.amount} {ingredient.counter} {ingredient.name} </li>
                      )

              })}
          </ul>
      </div>
    );
}