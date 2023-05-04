import './App.css';
import Navbar from './components/Navbar/Navbar';
import React, { useEffect } from 'react';
import Authentication from './components/Authentication';


function App() {

  return (
    <>
        <Navbar/>
    <Authentication></Authentication>
    </>
  
     
  );
}

export default App;
