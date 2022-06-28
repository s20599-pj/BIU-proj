import React from 'react';

export default function Steps({stepsList}){
    return(
        <div className={"steps"}>
            <ul>
                {stepsList.map((step, key)=>{
                    return(
                        <li key={key}>{step}</li>
                    )
                })}
            </ul>
        </div>
    )
}