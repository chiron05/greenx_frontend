import React, { useEffect, useState } from 'react'
import "../css/Detailedproduct.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Loading from './Loading';
import Navbar from './Navbar/Navbar';
import useLocalStorage from "../Hooks/useLocalStorage"



function Detailedproduct() {
  const [product, setProduct] = useState(null);


  const urlSearchParams = new URLSearchParams(window.location.search);
  const id = urlSearchParams.get('id');
  const [userID, setUserID] = useLocalStorage("userID")
  const url = 'https://greenx-backend.onrender.com/graphql';
  const [check,setCheck]= useState(false)
  var idkey = ""

  const userDetails = async ()=>{
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `{getUserById(userId: "${userID}") {
          bookmarks{_id}
      }
    }` ,
    variables: {}
    }),
    });
    const result = await response.json();
    // console.log(result)
    // setWishlist(result.data.getUserById.bookmarks)
    // console.log(wishlist);
    result.data.getUserById.bookmarks.map((pid,key)=>{
      if(pid._id==id){
        idkey =key
      }
    })
    console.log(idkey);
    if(idkey!=''){
      setCheck(true)
    }else{
      setCheck(false)
    }
  }

  

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch(url, {
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
      setProduct(result.data['getProductById']);
    };
    userDetails();
    fetchProducts();
  },[]);

const addToWishlist = async()=>{
  const requestBody = {
    query: `
        mutation {
          updateBookmarksAdd(
            productId: "${id}"
            userId: "${userID}"
            ){
              name
              _id
            }
        }
        `,
    variables: {}
};
const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(requestBody)
};
    console.log("trying");
    const response = await fetch(url, requestOptions);
    const data = await response.json();
    console.log('Mutation response:', data);
    userDetails();
}


const removeWishlist = async()=>{
  const requestBody = {
    query: `
        mutation {
          updateBookmarksRemove(
            productId: "${id}"
            userId: "${userID}"
            ){
              name
              _id
            }
        }
        `,
    variables: {}
};
const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(requestBody)
};
    console.log("trying");
    const response = await fetch(url, requestOptions);
    const data = await response.json();
    console.log('Mutation response:', data);
    userDetails();
}


  if (!product) {
    return <Loading></Loading>;
  }
  return (
    <div >
      <Navbar />
      <div>
      <div className="product-card">
        <div className="product-card__image" style={{
          height: '75vh', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', border: '30px solid #2182a1',
          borderRadius: '10px'
        }}>
          <Slider
            autoplay={true}
            infinite={true}
            speed={500}
            slidesToShow={1}
            slidesToScroll={1}
            style={{ width: '32vw' }}
          >{
              product.images.map((imges, index) => {
                return (
                  <img src={imges} alt="ProductImage1"/>
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
          {(check)?<button className="product-card__button2" onClick={removeWishlist}>WISHLISTED</button>:
          <button className="product-card__button" onClick={addToWishlist}>Add To Wishlist</button>}

        </div>
      </div>
      </div>
    </div>
  );
}

export default Detailedproduct