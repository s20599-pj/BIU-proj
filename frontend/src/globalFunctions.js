import React, {createContext, useContext, useEffect, useState} from 'react'

const GlobalContext = createContext({});
export const useGlobalContext = () => useContext(GlobalContext);
const LOCATION = "http://localhost:3000/"

export default function GlobalContextProvider({children}){
    const [coctails, setCoctails] = useState(null);
    const [comments, setComments] = useState('');
    const [searchBar, setSearchBar] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("http://localhost:3001/api/getAll")
            .then(res => res.json())
            .then(data => {
                setCoctails(data.coctail);
                setComments(data.comments);
                setSearchBar(data.coctail);
                setLoading(false);
            })
    }, []);

    const getSpecificCoctail = (id) => {
        return coctails.find((coctail) => coctail.id === id);
    };

    const getComments = (coctailId) => {
        return comments.filter((comment) => comment.coctail_id === coctailId);
    }

    const addComment = (body, coctailId) => {
        const newComment = {
            coctail_Id: coctailId,
            author: body.author,
            description: body.description
        }
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

    const sendRate = (coctail_id, ratings) => {
        const rating = {
            coctail_id: coctail_id,
            ratings: ratings
        }

        const request = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(rating)
        }

        fetch("http://localhost:3001/api/saveRating", request)
            .then(response => {
                if(response.ok) {
                    return response.json();
                }
                else {
                    console.log(response.statusText);
                }
            })
            .then(data => {
                if(data){
                    setCoctails(data);
                    window.location.reload();
                }
                else{
                    console.log("Server error - cannot add new rating");
                }
            })
    }

    const setDefaultCoctails = () => {
        fetch("http://localhost:3001/api/getAll")
            .then(res => res.json())
            .then(data => {
                setCoctails(data.coctail);
            })
    }

    const saveCoctails = (coctail, toUpdate) => {
        const newData = new FormData();
        const image = coctail.file;
        newData.append("coctail", JSON.stringify(coctail))
        newData.append("image", image)
        delete coctail.image

        const request = {
            method: 'POST',
            body: newData
        }
        if(toUpdate){
            fetch('http://localhost:3001/api/updateCoctail', request)
                .then(res => {
                    if(res.ok) {
                        return res.json();
                    }
                    else{
                        console.log(res.statusText);
                    }
                })
                .then(data => {
                    if(data) {
                        setCoctails(data.coctail);
                        window.location.href = LOCATION + "coctails/" + coctail.id;
                    }
                    else{
                        console.log("Server side error - cannot update coctail");
                    }
                })
        }
        else{
            fetch('http://localhost:3001/api/addCoctail', request)
                .then(res => {
                    if(res.ok) {
                        return res.json();
                    }
                    else{
                        console.log(res.statusText);
                    }
                })
                .then(data => {
                    if(data) {
                        setCoctails(data.coctail);
                        window.location.href = LOCATION;
                    }
                    else{
                        console.log("Server side error - cannot add coctail");
                    }
            })
        }
    }

    return (
        <GlobalContext.Provider
            value={{
                coctails,
                searchBar,
                setCoctails,
                loading,
                getSpecificCoctail,
                getComments,
                addComment,
                sendRate,
                setDefaultCoctails,
                saveCoctails
            }}
            >
            {children}
        </GlobalContext.Provider>
    )
}