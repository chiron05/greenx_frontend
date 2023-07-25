import React, { useState, useEffect } from 'react';
import Card from '../Card/Card';
import { useLocation } from 'react-router-dom';

const SearchApp = () => {
  const [products, setProducts] = useState([]);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const locationParam = queryParams.get('location');
  const searchFieldParam = queryParams.get('searchfield');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('https://greenx-backend.onrender.com/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `
            query {
              getProductByNameAndLocation(productName: "${searchFieldParam}", pincode: "${locationParam}") {
                _id
                name
                description
                images
                price
              }
            }
          `,
        }),
      });

      const { data } = await response.json();
      setProducts(data.getProductByNameAndLocation);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
      }}
    >
    

    {products.map((product, index) => (
      
      <Card key={product._id} id={product._id} name={product.name} description={product.description} price={product.price} image={product.images[0]} ></Card>
      ))}
        
    </div>
  );
};

export default SearchApp;
