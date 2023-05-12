import React from 'react';
import '../css/Productpage.css'
import Card from './Card/Card';

const Productspage = ({ products, setProducts }) => {


  return (
    <div className="productspage">
    <span style={{marginBottom:'20px',marginTop:'20px', fontFamily: 'Open Sans, sans-serif',fontSize:"3em"}}> Popular Products</span>
      <div className="card-container">
        {products.map(product => {
          return <Card key={product._id} id={product._id} name={product.name} description={product.description} image={product.images[0]} price={product.price} ></Card>
        })}
      </div>
    </div>
  );
};

export default Productspage;
