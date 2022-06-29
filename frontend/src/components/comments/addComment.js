import React from 'react';
import {useGlobalContext} from "../../globalFunctions";
import {useForm} from 'react-hook-form';



export default function AddComment({coctail}){
    const {addComment} = useGlobalContext();
    const {register, handleSubmit} = useForm();

    const onSubmit = (body, e) =>
    {
        e.preventDefault();
        addComment(body, coctail.id);
    }

    return(
     <form className={"addComment"} onSubmit={handleSubmit(onSubmit)}>
         <input type="text" name="author" placeholder={"Nazwa autora komentarza"} {...register('author')} />
         <textarea name="comment_desc" cols="30" rows="10" required placeholder={"Treść komentarza"} minLength={20} {...register("description")} />
         <button className={'addCommentButton'} type={"submit"}>Wyślij komentarz</button>
     </form>
    )
}