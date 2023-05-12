import React, { useEffect, useState } from 'react'
import "../css/Detailedproduct.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Loading from './Loading';
import Navbar from './Navbar/Navbar';
function Detailedproduct() {
  const [product, setProduct] = useState(null);
  const urlSearchParams = new URLSearchParams(window.location.search);
  const id = urlSearchParams.get('id');
  console.log(id); // Output: 6455f94da708ce6b2c0b3700


  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('https://greenx-backend.onrender.com/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: `{getProductById(productID: "${id}") {
          _id
          name
          description
          price
          quantity
          images
        }
      }` }),
      });
      const result = await response.json();
      console.log(result)
      setProduct(result.data['getProductById']);
      console.log(product.images)
    };

    fetchProducts();
  }, []);

  if (!product) {
    return <Loading></Loading>;
  }
  return (
    <>
      <Navbar/>
      <div className="product-card">
        <div className="product-card__image" style={{
          height: '75vh', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', border: '30px solid #2182a1',
          borderRadius: '10px'
        }}>
          <Slider
            autoplay={true}
            // dots={true}
            infinite={true}
            speed={500}
            slidesToShow={1}
            slidesToScroll={1}
            style={{ width: '22vw' }}
          >{
              product.images.map((imges, index) => {
                return (
                  <img src={imges} alt="Product Image 1" style={{ objectFit: 'cover' }} />
                )
              })
            }
          </Slider>
        </div>
        <div className="product-card__info">
          <h2 className="product-card__name">{product.name}</h2>
          <p className="product-card__subheading">Product Subheading</p>
          <h3 className="product-card__rate">{"PRICE: " + product.price + "/-"}</h3>
          <p className="product-card__location">Location: Dummy</p>
          <p className="product-card__quantity">{"QUANTITY: " + product.quantity}</p>
          <p className="product-card__description">{"DESCRIPTION: " + product.description}</p>
          <button className="product-card__button">WISHLIST</button>
        </div>
      </div>
    </>
  );
}

export default Detailedproduct