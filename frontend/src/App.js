import './App.css';
import React from "react";
import {BrowserRouter, Link, Route, Routes} from 'react-router-dom'
import ShowAllCoctails from "./components/coctails";
import CoctailSpecificInfo from "./components/coctailSpecificInfo";

class App extends React.Component {
  render() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={"/"} exact element={<ShowAllCoctails itemsPerPage={5}/> } />
                <Route path={"/coctails"} exact element={<ShowAllCoctails itemsPerPage={5}/> } />
                <Route path={"/coctails/:coctailId"} exact element={<CoctailSpecificInfo />}/>
            </Routes>
        </BrowserRouter>
    );
  }
}

export default App;
