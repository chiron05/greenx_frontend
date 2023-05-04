import './App.css';
import Navbar from './components/Navbar/Navbar';
import React, { useEffect } from 'react';
import Authentication from './components/Authentication';
import Searchpage from './components/Searchpage';
import Home  from './components/Home';


function App() {

  return (
    <>
    <Navbar/>
    <Home></Home>
    </>
  
     
  );
}

export default App;
