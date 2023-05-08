import React from 'react';
import ProductCard from './ProductCard';
import '../css/Productpage.css'
import Card from './Card/Card';

const Productspage = ({products,setProducts}) => {


  return (
    <div className="productspage">
    <div></div>
    <div className="card-container">
        {products.map(product => {
          return <Card key={product._id} name={product.name} description={product.description} image={product.images[0]} price={product.price} ></Card>
          {/* return <ProductCard key={product._id} name={product.name} description={product.description} image={product.images[0]} price={product.price} /> */}
        })}
      </div>
    </div>
  );
};

export default Productspage;
