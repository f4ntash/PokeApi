import React from 'react';
import { HashRouter as Router, Route, Switch, } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import backgroundImage from './pattern.png';
import NavBar from './layout/NavBar';
import Dashboard from './layout/Dashboard';
import Pokemon from './components/PokemonModal'
import LanguageSelect from './atoms/LanguageSelect';

function App()  {

    return (
      <Router>
        <div className="App" style={{ background: `url(${backgroundImage})` }}>
        <LanguageSelect />
          <NavBar/>
          <div className="container">
            <Switch>
              <Route exact path="/" component={Dashboard} />
              <Route exact path="/pokemon/:pokemonIndex" component={Pokemon} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }


export default App;
