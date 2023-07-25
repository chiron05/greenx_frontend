import React, { useEffect, useState } from "react";
import "../css/Detailedproduct.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Loading from "./Loading";
import useLocalStorage from "../Hooks/useLocalStorage";
import { useHistory } from 'react-router-dom';

function Detailedproduct() {
  const [product, setProduct] = useState(null);
  const history = useHistory();
  const urlSearchParams = new URLSearchParams(window.location.search);
  const id = urlSearchParams.get("id");
  const [userID, setUserID] = useLocalStorage("userID");
  const url = "https://greenx-backend.onrender.com/graphql";
  const [check, setCheck] = useState(false);

  const [sellerName, setSellerName] = useState("");
  const [sellerEmail, setSellerEmail] = useState("");
  const [sellerNum, setSellerNum] = useState("");
  const [selleraddress, setSellerAddress] = useState("");

  const [comment, setComment] = useState("")
  const [rating, setRating] = useState(0);
  const userDetails = async () => {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `{getUserById(userId: "${userID}") {
          bookmarks{_id}
      }
    }`,
        variables: {},
      }),
    });
    const result = await response.json();
    var idkey = null;
    result.data.getUserById.bookmarks.map((pid, key) => {
      if (pid._id == id) {
        idkey = key;
      }
    });
    if (idkey != null) {
      setCheck(true);
    } else {
      setCheck(false);
    }
  };



  useEffect(() => {
    userDetails();
    const fetchProducts = async () => {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `{getProductById(productID: "${id}") {
          _id
          name
          description
          price
          quantity
          sellerID
          images
          pincode
          city_name
          rating
          feedbacks{feedbackId rating comment}
        }
      }`,
        }),
      });
      const result = await response.json();
      console.log(result);
      setProduct(result.data["getProductById"]);
      setRating(result.data["getProductById"].rating)

      const response2 = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `{getUserById(userId: "${result.data["getProductById"].sellerID}") {
              name
              contactnum
              email
              address
          }
        }`,
          variables: {},
        }),
      });
      const result2 = await response2.json();
      setSellerName(result2.data.getUserById.name.toUpperCase());
      setSellerEmail(result2.data.getUserById.email);
      setSellerNum(result2.data.getUserById.contactnum);
      if (result2.data.getUserById.address == null) {
        setSellerAddress("Not Available at this Moment");
      } else {
        setSellerAddress(result2.data.getUserById.address.trim());
      }
    };
    fetchProducts()
  }, []);


  const addToWishlist = async () => {
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
      variables: {},
    };

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    };
    const response = await fetch(url, requestOptions);
    const data = await response.json();
    userDetails();
  };

  const removeWishlist = async () => {
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
      variables: {},
    };
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    };
    const response = await fetch(url, requestOptions);
    const data = await response.json();
    userDetails();
  };

  const submitFeedback = async () => {
    if (comment == "") {
      alert("Empty Comment!")
    }
    else {
      const requestBody = {
        query: `
        mutation {
          addFeedback(
            productId: "${id}"
            userId: "${userID}"
            comment:"${comment}"
            ){
              name
              _id
            }
        }
        `,
        variables: {},
      };
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      };
      const response = await fetch(url, requestOptions);
      const data = await response.json();
      console.log(data);
      setComment("")
      alert("Comment Added!")
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
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


  if (!product) {
    return <Loading></Loading>;
  }
  return (
    <div>
      <div>
        <div className="product-card">
          <div
            className="product-card__image"
            style={{
              height: "75vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              border: "30px solid #2182a1",
              borderRadius: "10px",
            }}
          >
            <Slider
              autoplay={true}
              infinite={true}
              speed={500}
              slidesToShow={1}
              slidesToScroll={1}
              style={{ width: "32vw" }}
            >
              {product.images.map((imges, index) => {
                return (
                  <div style={{ width: "400px", height: "400px" }}>
                    <img
                      src={imges}
                      style={{
                        objectFit: "cover",
                        height: "75vh",
                        width: "32vw",
                        borderRadius: "10px",
                        border: "30px solid #2182a1",
                      }}
                      alt={`ProductImage${index + 1}`}
                    />
                  </div>
                );
              })}
            </Slider>
          </div>
          <div className="product-card__info">
            <h2 className="product-card__name">{product.name}</h2>
            <p className="product-card__subheading">{product.description}</p>
            <h2 className="product-card__quantity" style={{marginBottom:"-5px"}}>Rating</h2>
            <div style={{ display: 'flex', justifyContent: 'center', color: 'yellow' ,fontSize:"2.5em"}}>
                {getStars()}
            </div>
            <h3 className="product-card__rate">
              {"Price: " + product.price + "/-"}
            </h3>
            <p className="product-card__location">
              {"Locality: " + product.city_name + "," + product.pincode}
            </p>
            <p className="product-card__quantity">
              {"Quantity: " + product.quantity}
            </p>
            {check ? (
              <button
                className="product-card__button2"
                onClick={removeWishlist}
              >
                WISHLISTED
              </button>
            ) : (
              <button className="product-card__button" onClick={addToWishlist}>
                Add To Wishlist
              </button>
            )}
          </div>
        </div>


        <h1 style={{
          marginTop: "300px",
          alignItems: "center",
          textAlign: "center",
          color: "#92c394"
        }}>Seller Details</h1>
        <div
          style={{
            width: "100%",
            height: "50vh",
            marginBottom: "100px",
            display: "flex",
            justifyContent: "space-evenly",
          }}
        >

          <div style={{ width: "40%" }}>
            <img
              src="https://static.vecteezy.com/system/resources/thumbnails/017/637/549/small_2x/kind-farmer-on-the-background-of-his-farm-barn-and-farmer-s-house-flat-illustration-vector.jpg"
              style={{ width: "100%", height: "100%", zIndex: "3" }}
            />
          </div>
          <div
            style={{
              width: "40%",
              background: "#c9ddca",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div class="carduser">
              <div class="carduser-header">
                <span style={{ fontFamily: 'Open Sans, sans-serif' }}>{sellerName}</span>
                <span style={{ fontFamily: 'Open Sans, sans-serif' }}>Location: {selleraddress}</span>

                <span style={{ fontFamily: 'Open Sans, sans-serif' }}></span>
              </div>
              <br />
              <div class="carduser-header">
                <span style={{ fontFamily: 'Open Sans, sans-serif' }}>Phone Number: {sellerNum}</span>
                <span style={{ fontFamily: 'Open Sans, sans-serif' }}>Email: {sellerEmail}</span>
                <div class="contact-buttons">
                  <a
                    href={`https://api.whatsapp.com/send?phone=${sellerNum.trim()}`}
                    target="_blank"
                    class="whatsapp-button"
                  >
                    <img
                      src="https://icon-library.com/images/whatsapp-icon-download/whatsapp-icon-download-21.jpg"
                      style={{ height: "50px" }}
                      alt="WhatsApp"
                    />
                  </a>
                  <a href={`mailto:${sellerEmail}`} class="email-button">
                    <img
                      src="https://static.vecteezy.com/system/resources/previews/020/009/614/original/email-and-mail-icon-black-free-png.png"
                      style={{ height: "50px" }}
                      alt="Email"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>




        <div
          style={{
            width: "100%",
            marginBottom: "100px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >

          {(product.feedbacks.length != 0) ? <>
            <div style={{ textAlign: 'center', color: '#92c394', marginBottom: "60px", fontSize: "2em", fontWeight: "500" }}>Comments({product.feedbacks.length})</div>
            <div style={{ width: "80%", height: "auto", display: "flex", flexDirection: "column", alignItems: "center" }}>
              {product.feedbacks.map((data, key) =>
                <p className="message-box" key={key}>&gt;&nbsp;&nbsp; &nbsp;{data.comment}</p>
              )}
            </div>

          </> : <>
          
            <div style={{ textAlign: 'center', color: '#92c394', marginBottom: "60px", fontSize: "2em", fontWeight: "500" }}>Comments({product.feedbacks.length})</div>
            <p className="message-box" style={{textAlign:"center"}}>No Comments Posted....</p>
          </>}
          <div class="comment-box" style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
            <textarea placeholder="Write your comment here..." onChange={(e) => { setComment(e.target.value) }}></textarea>
            <button onClick={submitFeedback}>Submit</button>
          </div>
        </div>



      </div>
    </div>
  );
}

export default Detailedproduct;
