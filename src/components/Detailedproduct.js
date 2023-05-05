import React from 'react'
import "../css/Detailedproduct.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Detailedproduct() {
  return (
    <div className="product-card">
      <div className="product-card__image"  style={{ height: '75vh', display: 'flex', justifyContent: 'center', alignItems: 'center' , backgroundSize: 'contain',backgroundRepeat: 'no-repeat',backgroundPosition: 'center',border: '30px solid #2182a1',
    borderRadius: '10px'}}>
      <Slider
    autoplay={true}
    // dots={true}
    infinite={true}
    speed={500}
    slidesToShow={1}
    slidesToScroll={1}
    style={{ width:'22vw'}}
  >
    <img src="https://m.media-amazon.com/images/I/81wYHRlRzFL._SL1500_.jpg"  alt="Product Image 1" />
    <img src="https://m.media-amazon.com/images/I/81wYHRlRzFL._SL1500_.jpg"  alt="Product Image 2" />
    <img src="https://m.media-amazon.com/images/I/81wYHRlRzFL._SL1500_.jpg"   alt="Product Image 3" />
  </Slider>
    </div>
      <div className="product-card__info">
        <h2 className="product-card__name">Product Name</h2>
        <p className="product-card__subheading">Product Subheading</p>
        <h3 className="product-card__rate">$120</h3>
        <p className="product-card__location">Location: Dummy</p>
        <p className="product-card__quantity">Quantity: 15kg</p>
        <p className="product-card__description">Product Description: loren uojgas sghgas asvasg ndgd ashj sjhas akjsnjas ashbajshmdhd dshd djhbsdh sjdbsd</p>
        <button class="product-card__button">WISHLIST</button>
      </div>
    </div>
  );
}

export default Detailedproduct