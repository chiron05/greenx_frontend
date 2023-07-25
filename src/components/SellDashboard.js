import React from 'react'
import NavbarDasBoard from "./Navbar/NavbarDashBoard"
import '../css/Productpage.css'
import Card from './Card/Card';
import { useState } from 'react';
import useLocalStorage from "../Hooks/useLocalStorage"
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const SellDashboard = () => {
  const history = useHistory();
  const [products, setProducts] = useState([]);
  const [sellproducts, setSellProducts] = useState([]);
  const [userID, setUserID] = useLocalStorage("userID")
  const [tick, setTick] = useState(false)
  const [stick, setStick] = useState(false)
  const url = 'https://greenx-backend.onrender.com/graphql';
  const [userName, setUserName] = useState("")
  const [userEmail, setUserEmail] = useState("")
  const [userNum, setUserNum] = useState("")

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
    console.log(result);
    setSellProducts(result.data.getSellerProducts)
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



      <section style={{ display: "flex", flexDirection: "row", justifyContent: "space-around", alignItems: "center", paddingTop: "100px", paddingBottom: "100px", paddingRight: "250px" }}>
        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-around", alignItems: "center" }}>
          <div className="container-main">
            <div className="description" style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "300px", height: "300px" }}>
              <div className="welcome-container" style={{ textAlign: "center" }}>
                <h1 className='titlehead typing-animation' style={{fontFamily: 'Open Sans, sans-serif'}}>HELLO {userName}</h1>
                <h1 className='titlehead typing-animation' style={{fontFamily: 'Open Sans, sans-serif'}}>Welcome to GREEN<span style={{ color: "#ff00006d" }}>X</span>!</h1>
              </div>
            </div>
            <div className="circle" style={{ width: "500px", height: "500px" }}>
              <img src="https://static.vecteezy.com/system/resources/previews/017/345/884/original/go-green-text-sign-with-hand-planting-tree-environment-protection-and-save-world-free-png.png" alt="Description of" />
            </div>
          </div>
        </div>
      </section>






      <section id='inventorymanagement' style={{ display: "flex", paddingTop: "200px", flexDirection: "column", justifyContent: "space-around", alignItems: "center" }}>
        <h1 style={{ textAlign: 'center', color: '#92c394', marginTop: "60px", marginBottom: "60px",fontWeight:"500",fontSize:"3em" }}>INVENTORY</h1>
        <div className="btnBack" style={{ display: "flex", flexDirection: "row", justifyContent: "space-around", alignItems: "center", width:"80%"}}>
          <div  style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", width: "50%", height: "60vh"}}>
            <button class="Addbtn" style={{margin:"20px 30px", width:"200px"}} onClick={()=>{history.push('/CategorySelection')}}>
            ADD PRODUCT
            </button>
            <button class="Addbtn" style={{margin:"20px 30px",width:"200px"}} onClick={()=>{history.push('/editproduct')}}>
            EDIT PRODUCT
            </button>
            <button class="Addbtn" style={{margin:"20px 30px",width:"200px"}} onClick={()=>{history.push('/deleteproduct')}}>
            DELETE PRODUCT
            </button>
          </div>
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", width: "50%", height: "60vh" }}>
            <div style={{ width: "80%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center", overflow: "hidden" }}>
              <img src="https://www.kindpng.com/picc/m/770-7708589_certificate-in-inventory-management-inventory-management-system-png.png" alt="Description of" />
            </div>
          </div>
        </div>
      </section>
      <section style={{ display: "block", paddingTop: "0px", paddingBottom: "0px" }}>
      <h1 style={{ textAlign: 'center', color: '#92c394', marginTop: "60px",fontWeight:"500",fontSize:"3em"}}>LISTED PRODUCTS</h1>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
          {(stick) ? <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-around", flexWrap: "wrap", width: "70%" }}>
            {sellproducts.map(product => {
              return <Card key={product._id} id={product._id} name={product.name} description={product.description} image={product.images[0]} price={product.price} ></Card>
            })}
          </div> :
            <>Empty....</>
          }
        </div>
      </section>





      <section id='wishlist' style={{ display: "block", paddingTop: "100px",paddingBottom:"100px" }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
          <h1 style={{ textAlign: 'center', color: '#92c394', marginTop: "60px",fontWeight:"500",fontSize:"3em" }}>YOUR WISHLIST</h1>
          {(tick) ? <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-around", flexWrap: "wrap", width: "70%" }}>
            {products.map(product => {
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