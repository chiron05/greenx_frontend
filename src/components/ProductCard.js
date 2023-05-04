import React, { useState } from 'react';
import "../css/ProductCard.css"

const ProductCard = () => {
  const [liked, setLiked] = useState(false);
  const [rating, setRating] = useState(3.5);

  const toggleLike = () => {
    setLiked(!liked);
  }

  const getStars = () => {
    let stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < Math.floor(rating)) {
        stars.push(<span key={i}>&#9733;</span>);
      } else if (i === Math.floor(rating) && rating % 1 !== 0) {
        stars.push(<span key={i}>&#9734;</span>);
      } else {
        stars.push(<span key={i}>&#9734;</span>);
      }
    }
    return stars;
  }

  return (
    <div style={{ border: '1px solid black', width: '300px', margin: '10px auto', textAlign: 'center',boxShadow: ' 3px 5px rgba(0, 0, 0, 0.5)' ,borderRadius:"10px"}}>
      <div>
        <span onClick={toggleLike} style={{ color: liked ? 'red' : 'grey', cursor: 'pointer' }}>&#10084;</span>
        <img src="https://www.qy1.de/img/axt-graensfors.jpg" alt="Product" />
        <h3 style={{ flexGrow: 1, margin: '0 10px', textAlign: 'center', fontSize: '20px', fontWeight: 'bold', fontFamily: 'Castoro Titling' }}>Product Name</h3>
        <p style={{ height: '100px', padding: "10px", fontFamily: 'Open Sans, sans-serif' }}>Product description asdasd asdkjjka sjd asd nas daisnajdsajsdnajs dasndoan adsasda sdna sdj jdafd sfdjbaf awfawe fabnds fhadf asdfiadsnfc adsnbdsc as dvcahncfawn efcna s dcfsandc asbcfawned </p>
        <div style={{ display: 'flex', justifyContent: 'center',color:'yellow' }}>
          {getStars()}
        </div>
        <h3>Price: $10.00</h3>
      </div>
      <div>
        <button style={{ height: "50px", width: "300px", backgroundColor: '#2182a1', fontFamily: "sans-serif", fontWeight: "bold", fontSize: "20px", color: "white" }}>WISHLIST</button>
      </div>
    </div>
  );
}

export default ProductCard;
