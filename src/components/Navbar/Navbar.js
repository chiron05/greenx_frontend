import React,{useState} from 'react';
import "../../css/Navbar.css"
import { Link } from 'react-router-dom';


function Navbar() {


  return (
    <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#f1f7f1', boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)', padding: '10px', position: 'fixed', width: '99vw', zIndex: '10' }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <strong style={{ fontSize: '50px', fontStyle: 'italic', color: "#046930", marginLeft:"30px"}}>GreenX</strong>
      </div>
      <div style={{ display: 'flex', alignItems: 'center' ,marginRight:"50px"}}>
        <Link to='/'  style={{textDecoration: 'none' }}><span style={{ marginRight: '20px', fontFamily: 'Open Sans, sans-serif', fontWeight: 'bold', color: '#546360', cursor: 'pointer', textDecoration: 'none' }}>
          HOME
          </span></Link>
        <span ><a href='#home' style={{ marginRight: '20px', fontFamily: 'Open Sans, sans-serif', fontWeight: 'bold', color: '#546360', cursor: 'pointer', textDecoration: 'none' }}>
          TRENDING
        </a></span>
        <span ><a href='#search' style={{ marginRight: '20px', fontFamily: 'Open Sans, sans-serif', fontWeight: 'bold', color: '#546360', cursor: 'pointer', textDecoration: 'none' }}>
          SEARCH
        </a></span>
        <span ><a href='#category' style={{ marginRight: '20px', fontFamily: 'Open Sans, sans-serif', fontWeight: 'bold', color: '#546360', cursor: 'pointer', textDecoration: 'none' }}>
          CATEGORY
        </a></span>
        <span ><a href='#join' style={{ marginRight: '20px', fontFamily: 'Open Sans, sans-serif', fontWeight: 'bold', color: '#546360', cursor: 'pointer', textDecoration: 'none' }}>
          JOIN US
        </a></span>
        <span ><a href='#products' style={{ marginRight: '20px', fontFamily: 'Open Sans, sans-serif', fontWeight: 'bold', color: '#546360', cursor: 'pointer', textDecoration: 'none' }}>
          POPULAR PRODUCTS
        </a></span>

        <Link to='/authentication'> <button style={{ borderRadius: '5px', border: 'none', backgroundColor: '#2182a1', color: '#2182a1', padding: '10px 20px' }}><div style={{ fontFamily: 'Open Sans, sans-serif', fontWeight: 'bold', color: 'white' }}>LOG IN / SIGN UP</div></button></Link>
      </div>
    </nav>

  );
}

export default Navbar;
