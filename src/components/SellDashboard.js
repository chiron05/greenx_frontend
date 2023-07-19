import React from 'react'
import NavbarDasBoard from "./Navbar/NavbarDashBoard"
import '../css/Productpage.css'
import Card from './Card/Card';
import { useState } from 'react';
import useLocalStorage from "../Hooks/useLocalStorage"
import { useEffect } from 'react';

const SellDashboard = () => {
  const [products, setProducts] = useState([]);
  const [sellproducts, setSellProducts] = useState([]);
  const [userID, setUserID] = useLocalStorage("userID")
  const [tick,setTick] = useState(false)
  const url = 'https://greenx-backend.onrender.com/graphql';

  const userDetails = async () => {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `{getUserById(userId: "${userID}") {
          bookmarks{_id name images description price}
      }
    }` ,
        variables: {}
      }),
    });
    const result = await response.json();
    console.log(result.data.getUserById.bookmarks);
    setProducts(result.data.getUserById.bookmarks)
    console.log(result.data.getUserById.bookmarks.length);
    if(result.data.getUserById.bookmarks.length!=0){
      setTick(true);
    }
  }

  const Inventory = async () => {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `{getSellerProducts(userId: "${userID}") {
          _id name images description price
      }
    }` ,
        variables: {}
      }),
    });
    const result = await response.json();
    console.log(result);

  
  }


  useEffect(() => {
    userDetails();
    Inventory();
  }, [])


  return (
    <>
      <NavbarDasBoard />

      <div className="productspage">
        <h1 style={{ textAlign: 'center', color: '#92c394', marginTop: "100px" }}>Wislist</h1>
        {(tick)?<div className="card-container" style={{ marginTop: "-220px" }}>
          {products.map(product => {
            return <Card key={product._id} id={product._id} name={product.name} description={product.description} image={product.images[0]} price={product.price} ></Card>
          })}
        </div>:
        <>Empty List</>
        }
        
      </div>

      <div className="productspage">
        <h1 style={{ textAlign: 'center', color: '#92c394', marginTop: "100px" }}>Inventory</h1>
        <div className="card-container" style={{ marginTop: "-220px" }}>
          {sellproducts.map(product => {
            return <Card key={product._id} id={product._id} name={product.name} description={product.description} image={product.images[0]} price={product.price} ></Card>
          })}
        </div>
      </div>
    </>
  )
}

export default SellDashboard