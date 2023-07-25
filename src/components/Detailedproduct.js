import React, { useEffect, useState } from "react";
import "../css/Detailedproduct.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Loading from "./Loading";
// import NavbarDetailProduct from './Navbar/NavbarDetailProduct';
import useLocalStorage from "../Hooks/useLocalStorage";
import { colors } from "@mui/material";

function Detailedproduct() {
  const [product, setProduct] = useState(null);

  const urlSearchParams = new URLSearchParams(window.location.search);
  const id = urlSearchParams.get("id");
  const [userID, setUserID] = useLocalStorage("userID");
  const url = "https://greenx-backend.onrender.com/graphql";
  const [check, setCheck] = useState(false);

  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userNum, setUserNum] = useState("");
  const [address, setAddress] = useState("");

  const userDetails = async () => {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `{getUserById(userId: "${userID}") {
          name
          contactnum
          email
          address
          bookmarks{_id}
      }
    }`,
        variables: {},
      }),
    });
    const result = await response.json();
    setUserName(result.data.getUserById.name.toUpperCase());
    setUserEmail(result.data.getUserById.email.trim());
    setUserNum(result.data.getUserById.contactnum.trim());
    console.log(result.data.getUserById.address);
    if (result.data.getUserById.address == null) {
      setAddress("Not Available at this Moment");
    } else {
      setAddress(result.data.getUserById.address.trim());
    }
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
        }
      }`,
        }),
      });
      const result = await response.json();
      setProduct(result.data["getProductById"]);
    };
    fetchProducts();
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
    console.log("trying");
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
    console.log("trying");
    const response = await fetch(url, requestOptions);
    const data = await response.json();
    console.log("Mutation response:", data);
    userDetails();
  };

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
                );
              })}
            </Slider>
          </div>
          <div className="product-card__info">
            <h2 className="product-card__name">{product.name}</h2>
            <p className="product-card__subheading">{product.description}</p>
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
            alignItems:"center",
            textAlign:"center",
            color:"#92c394"
          }}>SELLER DETAILS</h1>
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
                <span style={{ fontFamily: 'Open Sans, sans-serif'}}>{userName}</span>
                <span style={{ fontFamily: 'Open Sans, sans-serif'}}>Location: {address}</span>

                <span style={{ fontFamily: 'Open Sans, sans-serif'}}></span>
              </div>
              <br />
              <div class="carduser-header">
                <span style={{ fontFamily: 'Open Sans, sans-serif'}}>Phone Number: {userNum}</span>
                <span style={{ fontFamily: 'Open Sans, sans-serif'}}>Email: {userEmail}</span>
                <div class="contact-buttons">
                  <a
                    href={`https://api.whatsapp.com/send?phone=${userNum}`}
                    target="_blank"
                    class="whatsapp-button"
                  >
                    <img
                      src="https://icon-library.com/images/whatsapp-icon-download/whatsapp-icon-download-21.jpg"
                      style={{ height: "50px" }}
                      alt="WhatsApp"
                    />
                  </a>
                  <a href={`mailto:${userEmail}`} class="email-button">
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
      </div>
    </div>
  );
}

export default Detailedproduct;
