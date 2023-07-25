import React, { useEffect, useState } from 'react';
import './css/Geosearchpage.css';
import Geoproduct from './Geoproducts';
import Geomap from './Geomap';
import Card from '../Card/Card';
import Navbar from '../Navbar/Navbar';
import NavbarDetailProduct from '../Navbar/NavbarDetailProduct';

const Geosearchpage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // const urlParams = new URLSearchParams(window.location.search);
    // const lng = urlParams.get('lng');
    // const lat = urlParams.get('lat');

    fetch('https://greenx-backend.onrender.com/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `
          query {
            getNearByProductByUserLocation(latitude:15.494775,longitude:73.829287) {
              _id
              name
              description
              price
              images
              sellerID
              categoryID
              pincode
              city_name
            }
          }
        `//panaji

        // query: `
        //   query {
        //     getNearByProductByUserLocation(latitude:15.014035,longitude:74.085239) {
        //       _id
        //       name
        //       description
        //       price
        //       images
        //       sellerID
        //       categoryID
        //       pincode
        //       city_name
        //     }
        //   }
        // `//canacona

        // query: `
        //   query {
        //     getNearByProductByUserLocation(latitude:15.422771,longitude:73.979980) {
        //       _id
        //       name
        //       description
        //       price
        //       images
        //       sellerID
        //       categoryID
        //       pincode
        //       city_name
        //     }
        //   }
        // `//ponda
      })
    })
      .then(response => response.json())
      .then(data => {
        console.log(data)
        setProducts(data.data.getNearByProductByUserLocation);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);

  return (
    <>
    <NavbarDetailProduct/>
      <div className="geosearchpage bg-image" style={{paddingTop:"60px"}}>
        <div className="geo-left-section">
          <Geomap></Geomap>
        </div>
        <div className="geo-right-section smooth_scroll">
          <Geoproduct products={products}></Geoproduct>
        </div>
      </div>
    </>
  );
};

export default Geosearchpage;
