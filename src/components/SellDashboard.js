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
  const [tick, setTick] = useState(false)
  const [stick, setStick] = useState(false)
  const url = 'https://greenx-backend.onrender.com/graphql';
  const [userName, setUserName] = useLocalStorage("")
  const [userEmail, setUserEmail] = useLocalStorage("")
  const [userNum, setUserNum] = useLocalStorage("")

  const userDetails = async () => {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `{getUserById(userId: "${userID}") {
          name
          contactnum
          email
          bookmarks{_id name images description price}
      }
    }` ,
        variables: {}
      }),
    });
    const result = await response.json();
    setUserName(result.data.getUserById.name.toUpperCase())
    setUserEmail(result.data.getUserById.email)
    setUserNum(result.data.getUserById.contactnum)
    setProducts(result.data.getUserById.bookmarks)

    if (result.data.getUserById.bookmarks.length != 0) {
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
    if (result.data.getSellerProducts.length != 0) {
      setStick(true);
    }

  }


  useEffect(() => {
    userDetails();
    Inventory();
    userDetails();
  }, [])


  return (
    <>
      <NavbarDasBoard />
      <section style={{ display: "flex", flexDirection: "row", justifyContent: "space-around", alignItems: "center", paddingTop: "150px", paddingBottom: "150px", paddingRight: "250px" }}>
        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-around", alignItems: "center" }}>
          <div className="container-main">
            <div className="description" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div className="welcome-container" style={{ textAlign: "center" }}>
                <h1 className='titlehead'>HELLO {userName}</h1>
                <h1 className='titlehead'>Welcome to GREEN<span style={{ color: "#ff00006d" }}>X</span>!</h1>
              </div>
            </div>
            <div className="circle">
              <img src="https://static.vecteezy.com/system/resources/previews/017/345/884/original/go-green-text-sign-with-hand-planting-tree-environment-protection-and-save-world-free-png.png" alt="Description of" />
            </div>
          </div>
        </div>
      </section>

      <section style={{ display: "block", paddingTop: "250px"}}>
        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-around", alignItems: "center" }}>
          <button className='addBtn'> Pick up!</button>
          <button className='addBtn'> Pick up!</button>
          <button className='addBtn'> Pick up!</button>
          <button className='addBtn'> Pick up!</button>
        </div>
      </section>






      <section id='wishlist' style={{ display: "block", paddingTop: "100px" }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
          <h1 style={{ textAlign: 'center', color: '#92c394', marginTop: "60px" }}>Your Wislist</h1>
          {(tick) ? <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-around", flexWrap: "wrap", width: "70%" }}>
            {products.map(product => {
              return <Card key={product._id} id={product._id} name={product.name} description={product.description} image={product.images[0]} price={product.price} ></Card>
            })}
          </div> :
            <>Empty List....</>
          }

        </div>
      </section>

      <section id='inventory' style={{ display: "block", paddingTop: "100px", paddingBottom: "200px" }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
          <h1 style={{ textAlign: 'center', color: '#92c394', marginTop: "60px" }}>Your Inventory</h1>
          {(stick) ? <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-around", flexWrap: "wrap", width: "70%" }}>
            {sellproducts.map(product => {
              return <Card key={product._id} id={product._id} name={product.name} description={product.description} image={product.images[0]} price={product.price} ></Card>
            })}
          </div> :
            <>Empty List....</>
          }
        </div>
      </section>
    </>
  )
}

export default SellDashboard