import React from 'react';
import {useGlobalContext} from "../globalFunctions";
import '../styles/layer.css'

export default function SearchBar() {
    const {searchBar, setCoctails, setDefaultCoctails} = useGlobalContext();

    const handleChange = (e) => {
        e.preventDefault();
        let compare = e.target.value.toLowerCase();
        if(compare.length == 0){
            setDefaultCoctails();
        }
        else {
            const results = searchBar.filter((search) => {
                if(search.name.toLowerCase().match(compare)) {
                    return search;
                }
                else {
                    return search.type.toLowerCase().match(compare);
                }
            });
            setCoctails(results);
        }
    }

    return (
        <div className={"search"}>
            <input id={"searchBar"}
                   type={"text"}
                   placeholder={"Podaj nazwę lub rodzaj drinka"}
                   onChange={event => handleChange(event)}
            />
        </div>
    )
}