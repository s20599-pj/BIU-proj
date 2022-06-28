import logo from './logo.svg';
import './App.css';
import React from "react";

import {
  BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'

class App extends React.Component {
  render() {
    return (

        <div className="App">
          <Link to={"/coctails"}>lista</Link>
        </div>
    );
  }

}

export default App;
