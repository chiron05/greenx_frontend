import React from 'react'
import useLocalStorage from "../../Hooks/useLocalStorage"
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import NavbarBack from '../Navbar/NavbarBack';
import Card3 from '../Card/Card3';


const DeleteProduct = () => {
  const url = 'https://greenx-backend.onrender.com/graphql';
  const history = useHistory();
  const [products, setProducts] = useState([]);
  const [userID, setUserID] = useLocalStorage("userID")
  const [stick, setStick] = useState(false)
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
    setProducts(result.data.getSellerProducts)
    if (result.data.getSellerProducts.length != 0) {
      setStick(true);
    }
  }

  useEffect(() => {
    Inventory();
  }, [])





  return (
    <>
    <NavbarBack/>
      <section style={{ display: "block", paddingTop: "100px", paddingBottom: "0px" }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
          {(stick) ? <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-around", flexWrap: "wrap", width: "70%" }}>
            {products.map(product => {
              return <Card3 key={product._id} id={product._id} name={product.name} description={product.description} image={product.images[0]} price={product.price} ></Card3>
            })}
          </div> :
            <>Empty List....</>
          }
        </div>
      </section>
    </>
  )
}

export default DeleteProduct