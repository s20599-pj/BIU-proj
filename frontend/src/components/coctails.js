import React, {useEffect, useState} from "react";
import "../styles/coctailsList.css";
import {Link} from "react-router-dom";
import {useGlobalContext} from '../globalFunctions';
import SearchBar from "../layout/searchBar";
import ReactPaginate from 'react-paginate'


export default function ShowAllCoctails({itemsPerPage}){
    const [currentItems, setCurrentItems] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);

    const {coctails} = useGlobalContext();

    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;
        setCurrentItems(coctails.slice(itemOffset, endOffset))
        setPageCount(Math.ceil(coctails.length/itemsPerPage));
    },  [itemOffset, itemsPerPage]);

    const handlePageClick = (e) => {
        const newOffset = e.selected * itemsPerPage % coctails.length;
        console.log(newOffset)
        setItemOffset(newOffset);
    }

    return(
        <div className={"mainPage"}>
            <SearchBar />
            <div className={"coctails"}>
                {coctails.map((coctail, index) => {
                    return (
                        <div className={"coctailWrapper"}>
                            <div key={index} className={"coctailList"}>
                                <img src={coctail.image} alt={"zdjecie drinka"}/>
                                <p>Drink: {coctail.name}</p>
                                <p>Typ drinka: {coctail.type}</p>
                                <p>Kliknij <Link to={`/coctails/${coctail.id}`}>tutaj</Link> aby poznać szczegóły</p>
                            </div>
                        </div>
                    )
                })}
            </div>
            <ReactPaginate
                breakLabel={"..."}
                nextLabel={"next >"}
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={pageCount}
                previousLabel={"< previous"}
                renderOnZeroPageCount={null}
                className={"paginate"}
            />
        </div>

    )
}