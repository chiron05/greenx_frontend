import React from 'react';
import Geomap from './css/Geoproduct.css';
import Card from '../Card/Card';

const Geoproducts = (props) => {
  const { products } = props;

  return (
    <div className='geomain-container'>
      {products.map((product, index) => (
        <div key={index} className='geocontainer-card'>
          <Card
            id={product._id}
            name={product.name}
            description={product.description}
            image={product.images[0]}
            price={product.price}
          />
        </div>
      ))}
    </div>
  );
};

export default Geoproducts;
