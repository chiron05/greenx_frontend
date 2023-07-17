import React, { useEffect, useState } from 'react';
import '../css/Productpage.css'
import Card from './Card/Card';

const Productspage = () => {
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
    <div className="productspage">
    <h1 style={{ textAlign: 'center' ,color:'#92c394',marginTop:"60px"}}>ALL PRODUCTS</h1>
      <div className="card-container">
        {products.map(product => {
          return <Card key={product._id} id={product._id} name={product.name} description={product.description} image={product.images[0]} price={product.price} ></Card>
        })}
      </div>
    </div>
  );
};

export default Productspage;
