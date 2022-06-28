import React, {createContext, useContext, useEffect, useState} from 'react'

const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

export default function GlobalFunctions({child}){
    const [coctails, setCoctails] = useState('');
    const [comments, setComments] = useState('');

    useEffect(() => {
        fetch("http://localhost:3001/api/getAll")
            .then(res => res.json())
            .then(response => {
                coctails(response.coctail);
                comments(response.comment);
                setCoctails(response.coctail);
                setComments(response.comment);
            })
    }, []);

    return (
        <GlobalContext.Provider
            value={{
                coctails,
                setCoctails,
                comments,
                setComments
            }}
            >
            {child}
        </GlobalContext.Provider>
    )
}