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
import Createproduct from './components/Product/Createproduct';
import CategorySelection from './components/Product/CategorySelection';
import Geosearchpage from './components/GeoSearch/Geosearchpage';
import CategoryPage from './components/CategoryPage/CategoryPage';
import SellDashboard from './components/SellDashboard';
import Chatbot from './components/Chatbot/Chatbot';
import EditProducts from './components/Seller/EditProducts';
import DeleteProduct from './components/Seller/DeleteProduct';
import Edit from './components/Seller/Edit';
import SearchApp from './components/SearchPage/SearchPage';
import Footer from './components/Footer';
import Layout from './components/Layout';





function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route path="/advertisement" component={Advertisement} />
        <Route path="/searchpage" component={SearchApp} />
        <Route path="/geosearchpage" component={Geosearchpage} />
        <Route path="/categorypage" component={CategoryPage} />
        <Route path="/createproduct" component={Createproduct} />
        <Route path="/CategorySelection" component={CategorySelection} />
        <Route path="/authentication" component={Authentication} />
        <Route path="/detailproduct" component={Detailedproduct} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/card" component={Card} />
        <Route path="/chatbot" component={Chatbot} />
        <Route path="/mainproduct" component={MainProducts} />
        <Route path="/sellerdashboard" component={SellDashboard} />
        <Route path="/editproduct" component={EditProducts} />
        <Route path="/deleteproduct" component={DeleteProduct} />
        <Route path="/edit" component={Edit} />
      </Switch>
    </Router>
    
  );
}

export default App;
