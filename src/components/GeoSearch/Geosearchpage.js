import React, { useEffect, useState } from 'react';
import './css/Geosearchpage.css';
import Geoproduct from './Geoproducts';
import Geomap from './Geomap';
import Card from '../Card/Card';
import Navbar from '../Navbar/Navbar';

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
            getNearByProductByUserLocation(longitude:73.852844, latitude:15.381424) {
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
        `
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
      <div className="geosearchpage bg-image">
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
