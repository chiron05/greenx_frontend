import React from 'react'
import Home from './Home'
import Searchpage from './Searchpage'
import Slider from './Silder'
import Advertisement from './Advertisement'
import Productspage from './Productspage'
import { useState, useEffect } from 'react';

const Homepage = () => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        const fetchProducts = async () => {
          const response = await fetch('https://greenx-backend.onrender.com/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query: '{ getAllProducts { _id name images description price} }' }),
          });
          const result = await response.json();
          setProducts(result.data.getAllProducts);
          
        };
    
        fetchProducts();
      }, []);
  return (
    <div>
        <Home></Home>
        <Searchpage></Searchpage>
        <Slider></Slider>
        <Advertisement></Advertisement>
        <Productspage products={products} setProducts={setProducts}></Productspage>
    </div>
  )
}

export default Homepage