import logo from './logo.svg';
import './App.css';
import coctails from "./data/coctails.json";


function App() {
  return (
    <div className="App">
      {
        coctails.map((coctail, index) =>{
          return (
              <div key={index}>
                <p>{coctail.name}</p>
                <p>{coctail.type}</p>
              </div>
          )
        })
      }
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
