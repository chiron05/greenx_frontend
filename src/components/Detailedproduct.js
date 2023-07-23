import React, { useEffect, useState } from 'react'
import "../css/Detailedproduct.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Loading from './Loading';
// import NavbarDetailProduct from './Navbar/NavbarDetailProduct';
import useLocalStorage from "../Hooks/useLocalStorage"



function Detailedproduct() {
  const [product, setProduct] = useState(null);


  const urlSearchParams = new URLSearchParams(window.location.search);
  const id = urlSearchParams.get('id');
  const [userID, setUserID] = useLocalStorage("userID")
  const url = 'https://greenx-backend.onrender.com/graphql';
  const [check,setCheck]= useState(false)


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
    var idkey = null
    result.data.getUserById.bookmarks.map((pid,key)=>{
      if(pid._id==id){
        idkey =key
      }
    })
    if(idkey!=null){
      setCheck(true)
    }else{
      setCheck(false)
    }
  }

  

  useEffect(() => {
    userDetails();
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
      {/* <NavbarDetailProduct /> */}
      <div>
      <div className="product-card">
        <div className="product-card__image" style={{
          height: '75vh', display: 'flex', justifyContent: 'center', alignItems: 'center', border: '30px solid #2182a1',
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
                <img src={imges} style={{ objectFit: 'cover', height: '75vh', width: '32vw', borderRadius: '10px', border: '30px solid #2182a1' }} alt={`ProductImage${index + 1}`} />
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