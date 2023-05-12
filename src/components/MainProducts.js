import React from 'react'
import Navbar from "./Navbar/Navbar"
import Card from './Card/Card'
import { useEffect } from 'react';
import { useState } from 'react';
import "../css/MainProducts.css"
const MainProducts = () => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        const fetchProducts = async () => {
            const response = await fetch('https://greenx-backend.onrender.com/graphql', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ query: '{ getAllProducts { _id name images description price} }' }),
            });
            const result = await response.json();
            setProducts(result.data.getAllProducts);
        };
        fetchProducts();
    }, []);
    return (
        <>
            <Navbar />
            <div style={{ width: '100vw', display: 'flex' }}>
                <div style={{ width: '20vw', background: "#bbd9d2", height: '400vh' }}>
                    <div class="input-container" style={{ marginTop: '100px'}}>
                        <input type="text" name="text" class="input" placeholder="search..."/>
                            <span class="icon">
                                <svg width="19px" height="19px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path opacity="1" d="M14 5H20" stroke="#000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path opacity="1" d="M14 8H17" stroke="#000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M21 11.5C21 16.75 16.75 21 11.5 21C6.25 21 2 16.75 2 11.5C2 6.25 6.25 2 11.5 2" stroke="#000" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"></path> <path opacity="1" d="M22 22L20 20" stroke="#000" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                            </span>
                    </div>
                </div>
                <div style={{ width: '80vw', background: "#099b79", height: "400vh" }}>
                    <div className="productspage" style={{ marginTop: '100px'}}>
                        <div className="card-container" >
                            {products.map(product => {
                                return <Card key={product._id} id={product._id} name={product.name} description={product.description} image={product.images[0]} price={product.price} ></Card>
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MainProducts