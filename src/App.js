import './App.css';
import {
  Route,
  BrowserRouter as Router,
  Switch,
} from "react-router-dom";

import React from 'react';
import Authentication from './components/Authentication';
import Detailedproduct from './components/Detailedproduct';
import Advertisement from './components/Advertisement';
import Dashboard from './components/Dashboard/Dashboard';
import Homepage from './components/Homepage';
import Card from './components/Card/Card';
import MainProducts from './components/MainProducts';



function App() {
  return (
    <Router>
       <Route
        render={({ location }) => (
          location.pathname !== '/authentication'
        )}
      />
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route path="/advertisement" component={Advertisement} />
        <Route path="/authentication" component={Authentication} />
        <Route path="/detailproduct" component={Detailedproduct} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/card" component={Card} />\
        <Route path="/mainproduct" component={MainProducts} />
      </Switch>
    </Router>
  );
}

export default App;
