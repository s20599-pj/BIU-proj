import React, {createContext, useContext, useEffect, useState} from 'react'

const GlobalContext = createContext({});
export const useGlobalContext = () => useContext(GlobalContext);

export default function GlobalContextProvider({children}){
    const [coctails, setCoctails] = useState(null);
    const [comments, setComments] = useState('');

    useEffect(() => {
        fetch("http://localhost:3001/api/getAll")
            .then(res => res.json())
            .then(data => {
                setCoctails(data.coctail);
                setComments(data.comments);
            })
    }, []);

    const getSpecificCoctail = (id) => {
        return coctails.find((coctail) => coctail.id === id);
    };

    const getComments = (coctailId) => {
        return comments.filter((comment) => comment.coctail_id === coctailId);
    }

    const addComment = (body, coctailId) => {
        console.log(body);
        const newComment = {
            coctail_Id: coctailId,
            author: body.author,
            description: body.description
        }
        console.log(newComment);
        const request = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newComment)
        }
        fetch("http://localhost:3001/api/saveComment", request)
            .then(response => {
                if(response.ok) {
                    return response.json();
                }
                else{
                    console.log(response.statusText);
                }
            })
            .then(data => {
                if(data){
                    setComments(data);
                    window.location.reload();
                }
                else
                    console.log("Server side error - cannot save comment");
            })
    }

    return (
        <GlobalContext.Provider
            value={{
                coctails,
                getSpecificCoctail,
                getComments,
                addComment
            }}
            >
            {children}
        </GlobalContext.Provider>
    )
}