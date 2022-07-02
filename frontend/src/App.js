import './utility/App.css';
import React from "react";
import {BrowserRouter, Link, Route, Routes} from 'react-router-dom'
import ShowAllCoctails from "./components/coctails";
import CoctailSpecificInfo from "./components/coctailSpecificInfo";
import {useGlobalContext} from "./globalFunctions";
import EditDrink from "./components/adminPanel/adminEditDrink";
import AddDrink from "./components/adminPanel/adminAddDrink";
import Footer from "./layout/footer";
import Navigation from "./layout/navigation";
import AdminLogin from "./components/adminPanel/adminLogin";
import NotFound from "./layout/404";

function App() {
    const {loading} = useGlobalContext();

    if(loading)
        return (<p>loading...</p>)

    return (

        <BrowserRouter>
            <Navigation />
            <Routes>
                <Route path={"/"} exact element={<ShowAllCoctails itemsPerPage={5}/> } />
                <Route path={"/coctails"} exact element={<ShowAllCoctails itemsPerPage={5}/> } />
                <Route path={"/coctails/:coctailId"} exact element={<CoctailSpecificInfo />}/>
                <Route path={"/editCoctail/:coctailId"} exact element={<EditDrink />} />
                <Route path={"/addCoctail"} exact element={<AddDrink />} />
                <Route path={"/adminLogin"} exact element={<AdminLogin />} />
                <Route path={"*"} exact element={<NotFound />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    )
}

export default App;
