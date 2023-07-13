import React from 'react';
import { Grid } from '@material-ui/core';
import Card from '../Card/Card';

const ProductList = () => {
  const productList = [
    {
      id: 1,
      name: 'Product 1',
      image: 'https://example.com/product1.jpg',
    },
    {
      id: 2,
      name: 'Product 2',
      image: 'https://example.com/product2.jpg',
    },
    {
      id: 3,
      name: 'Product 3',
      image: 'https://example.com/product3.jpg',
    },
    {
        id: 3,
        name: 'Product 3',
        image: 'https://example.com/product3.jpg',
      },
      {
        id: 3,
        name: 'Product 3',
        image: 'https://example.com/product3.jpg',
      },
      {
        id: 3,
        name: 'Product 3',
        image: 'https://example.com/product3.jpg',
      },
    // Add more products here...
  ];

  return (
    <div style={{ maxHeight: '100vh', overflowY: 'auto' ,background: 'linear-gradient(to left, #EFF7B0 50%, #B8E1B8 50%)'}}>
      <div
        style={{
          height: '50%',
          marginBottom: '16px',
          marginTop: '10px',
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          
        }}
      >
        {/* Display image with border and centered text */}
        <img
          src="https://res.cloudinary.com/drntday51/image/upload/v1683355375/greenx/of7wvogpvkgobtxuv2c1.jpg"
          alt="Upper Section"
          style={{
            width: '60vw',
            height: '40vh',
            objectFit: 'cover',
            borderRadius: '8px',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
            width: '100%',
          }}
        >
          <h2 style={{ color: '#fff', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>
            AGRICULTURE PRODUCTS
          </h2>
        </div>
      </div>
      <Grid container spacing={2} style={{marginLeft:'10px'}}>
        {/* Display cards */}
        {productList.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card description="sadnasd" />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default ProductList;
