import React, { useEffect, useState, useRef } from 'react';
import { Grid } from '@material-ui/core';
import Card from '../Card/Card';
import { useLocation } from 'react-router-dom';


const ProductList = ({ products }) => {
  const location = useLocation();
  const [productList, setProductList] = useState([]);
  const prevLocation = useRef(location);
  const searchParams = new URLSearchParams(location.search);
  const [catData, setCatData] = useState([{
    name: "categoryname",
    image: "image"
  }])
  const getCategoryDetails = async () => {
    const response = await fetch('https://greenx-backend.onrender.com/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `{getCategoryById(categoryId: "${searchParams.get('categoryid')}") {
          name
          image
      }
    }` ,
        variables: {}
      }),
    });
    const result = await response.json();
    // console.log(result);
    setCatData(result.data.getCategoryById)
  }

  
  useEffect(() => {
    getCategoryDetails();
    if (searchParams.toString() !== prevLocation.current.search) {
      setProductList([])
      if (searchParams.has('location')) {
        // console.log(searchParams.get('categoryid'));
        // console.log(searchParams.get('location'));
        // console.log(searchParams.get('min'));
        // console.log(searchParams.get('max'));
        // console.log(searchParams.get('rating'));
        const query = `
          query {
            getProductsByFilter(input: {
              categoryID: "${searchParams.get('categoryid')}"
              pincode: "${searchParams.get('location')}"
              min: ${parseInt(searchParams.get('min'))}
              max: ${parseInt(searchParams.get('max'))}
              rating: [${searchParams.get('rating')}]
            }) {
              _id
              name
              description
              price
              images
              rating
              categoryID
              sellerID
              pincode
              city_name
            }
          }
        `;

        fetch('https://greenx-backend.onrender.com/graphql', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ query }),
        })
          .then(response => response.json())
          .then(data => {
            // console.log(data)
            const productList = data.data.getProductsByFilter;
            setProductList(productList);
          })
          .catch(error => {
            console.error('Error fetching product list:', error);
          });
      } else {
        // Handle the case when 'location' is not present in the search params
        // console.log("yoooooooooo11")
        const query = `
        query{
          getProductsByCategoryId(categoryID:"${searchParams.get('categoryid')}"){
           _id
           name
           description
           price
           images
           rating
           categoryID
           sellerID
           pincode
           city_name
         }
         }
      `;

        fetch('https://greenx-backend.onrender.com/graphql', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ query }),
        })
          .then(response => response.json())
          .then(data => {
            // console.log(data)
            const allrpoduct = data.data.getProductsByCategoryId
            // const productsList = data.data.getProductsByFilter;
            setProductList(allrpoduct);
          })
          .catch(error => {
            console.error('Error fetching product list:', error);
          });

      }
    }
  }, [location.search]);



  // Add more products here...

  return (
    <>
    
      <div style={{ maxHeight: '100vh', overflowY: 'auto', background: 'linear-gradient(to left, #EFF7B0 50%, #B8E1B8 50%)' }}>
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
          <img
            src={catData[0].image}
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
              {catData[0].name.toUpperCase()}
            </h2>
          </div>
        </div>
        <Grid container spacing={2} style={{ marginLeft: '10px' }}>
          {productList.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Card id={product._id} name={product.name} description={product.description} image={product.images[0]} price={product.price} prating={product.rating}/>
            </Grid>
          ))}
        </Grid>
      </div>
    </>
  );
};

export default ProductList;
