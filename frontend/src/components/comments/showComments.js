import React from 'react';

export default function ShowComments({coctail}){
    return(
        <div className={"comments"}>
            <p>Komentarze</p>
            <ul>
                {/*{comments.map((comment,key) => {*/}
                {/*    if(comment.coctail_id == coctail.id)*/}
                {/*        return(*/}
                {/*            <li key={key}>{comment.author}({comment.date}): {comment.description}</li>*/}
                {/*        )*/}
                {/*})}*/}
            </ul>
        </div>
    )
}