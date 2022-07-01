import './App.css';
import React from "react";
import {BrowserRouter, Link, Route, Routes} from 'react-router-dom'
import ShowAllCoctails from "./components/coctails";
import CoctailSpecificInfo from "./components/coctailSpecificInfo";
import {useGlobalContext} from "./globalFunctions";
import EditDrink from "./components/adminPanel/adminEditDrink";
import AddDrink from "./components/adminPanel/adminAddDrink";

function App() {
    const {loading} = useGlobalContext();

    if(loading)
        return (<p>loading...</p>)

    return (
        <BrowserRouter>
            <Routes>
                <Route path={"/"} exact element={<ShowAllCoctails itemsPerPage={5}/> } />
                <Route path={"/coctails"} exact element={<ShowAllCoctails itemsPerPage={5}/> } />
                <Route path={"/coctails/:coctailId"} exact element={<CoctailSpecificInfo />}/>
                <Route path={"/editCoctail/:coctailId"} exact element={<EditDrink />} />
                <Route path={"/addCoctail"} exact element={<AddDrink />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App;
