import React from 'react';
import {useGlobalContext} from "../../globalFunctions";

export default function ShowComments({coctail}){
    const {getComments} = useGlobalContext();

    const coctailComments = getComments(parseInt(coctail.id));
    console.log(coctailComments);
    return(
        <div className={"comments"}>
            <p>Komentarze</p>
            <ul>
                {coctailComments.map((comment,key) => {
                    return(
                        <li key={key}>{comment.author}({comment.date}): {comment.description}</li>
                    )
                })}
            </ul>
        </div>
    )
}