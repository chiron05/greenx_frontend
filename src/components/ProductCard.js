import React, { useState } from 'react';
import "../css/ProductCard.css"
import { Link } from 'react-router-dom';

const ProductCard = ({id,name,description,image,price}) => {
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
    <div style={{ border: '1px solid black', width: '400px', margin: '10px auto', textAlign: 'center',boxShadow: ' 3px 5px rgba(0, 0, 0, 0.5)' ,borderRadius:"10px"}}>
      <div>
        <span onClick={toggleLike} style={{ color: liked ? 'red' : 'grey', cursor: 'pointer' }}>&#10084;</span>
        <img src={image} alt="Product" id="prod-img"/>
        <h3 style={{ flexGrow: 1, margin: '0 10px', textAlign: 'center', fontSize: '20px', fontWeight: 'bold', fontFamily: 'Castoro Titling' }}>{name}</h3>
        <p style={{ height: '100px', padding: "10px", fontFamily: 'Open Sans, sans-serif' }}>{description}</p>
        <div style={{ display: 'flex', justifyContent: 'center',color:'yellow' }}>
          {getStars()}
        </div>
        <h3>Price: {price}/-</h3>
      </div>
      <div>
      <Link to={`/detailproduct?id=${id}`}>
            <div style={{backgroundColor:'#202b4e',borderRadius:'5px',height:'50px',width:'200px',color:'white',fontFamily: 'Poppins, sans-serif'}}>VIEW PRODUCT</div>
            </Link>
        <button style={{ height: "50px", width: "300px", backgroundColor: '#2182a1', fontFamily: "sans-serif", fontWeight: "bold", fontSize: "20px", color: "white" }}>WISHLIST</button>
      </div>
    </div>
  );
}

export default ProductCard;
