import React, { useState, useEffect } from 'react';
import Card from '../Card/Card';
import { useLocation } from 'react-router-dom';
import NavbarDetailProduct from "../Navbar/NavbarDetailProduct"
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
                rating
              }
            }
          `,
        }),
      });

      const { data } = await response.json();
      console.log(data.getProductByNameAndLocation);
      setProducts(data.getProductByNameAndLocation);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  return (
    <>
    <NavbarDetailProduct/>
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
      }}
    >
      {(products.length!=0) ?
        <div style={{paddingTop:"100px"}}>{products.map((product, index) => (

          <Card key={product._id} id={product._id} name={product.name} description={product.description} price={product.price} prating={product.rating} image={product.images[0]} ></Card>
        ))}</div>
        :
        <div style={{display:"flex",justifyContent:"center",alignItems:"center",height:"100vh",color:"#92c394"}}>
          <h1>No Products Available....</h1>
        </div>}



    </div>
    </>
  );
};

export default SearchApp;
