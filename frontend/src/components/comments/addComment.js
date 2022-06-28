import React from 'react';

function AddNewComment({commentId, coctailId, author, date, descriptionr}){
    let newComment = {
        "id": {commentId},
        "coctail_id": {coctailId},
        "author": ``,
        "date": "",
        "description": ""
    }

}

export default function AddComment({coctail}){

    return(
     <div className={"addComment"}>
         <input type="text" name="author" placeholder={"Nazwa autora komentarza"} />
         <input type={"date"} name={"data"} />
         <textarea name="comment_desc" cols="30" rows="10" required placeholder={"Treść komentarza"} minLength={20}/>
         <input type={"submit"} name={"addComment"} value={"Dodaj komentarz"} onClick={<AddNewComment/>} />
     </div>
    )
}