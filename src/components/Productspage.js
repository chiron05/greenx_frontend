import React from 'react';
import ProductCard from './ProductCard';
import '../css/Productpage.css'
const Productspage = ({products,setProducts}) => {


  return (
    <div className="productspage">
    <div></div>
    <div className="card-container">
        {products.map(product => {
          return <ProductCard key={product._id} name={product.name} description={product.description} image={product.images[0]} price={product.price} />
        })}
      </div>
    </div>
  );
};

export default Productspage;
