import './App.css';
import {
  Route,
  useLocation,
  BrowserRouter as Router,
  Switch,
} from "react-router-dom";

import Navbar from './components/Navbar/Navbar';
import React, { useEffect ,useState} from 'react';
import Authentication from './components/Authentication';
import Searchpage from './components/Searchpage';
import Home  from './components/Home';
import Slider from './components/Silder';
import Detailedproduct from './components/Detailedproduct';
import ProductCard from './components/ProductCard';
import Advertisement from './components/Advertisement';
import Dashboard from './components/Dashboard/Dashboard';
import Homepage from './components/Homepage';
import Loading from './components/Loading';
import Trial from './components/Trial';




function App() {

  return (
    <Router>
       <Route
        render={({ location }) => (
          location.pathname !== '/authentication' && <Navbar />
        )}
      />
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route path="/advertisement" component={Advertisement} />
        <Route path="/authentication" component={Authentication} />
        <Route path="/detailproduct" component={Detailedproduct} />
        <Route path="/dashboard" component={Loading} />
        <Route path="/trial" component={Trial} />
      </Switch>
    </Router>
  );
}

export default App;
