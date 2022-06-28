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

    return (
        <GlobalContext.Provider
            value={{
                coctails,
                getSpecificCoctail,
                getComments
            }}
            >
            {children}
        </GlobalContext.Provider>
    )
}