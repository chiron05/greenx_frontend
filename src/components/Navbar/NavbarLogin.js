import React from 'react';
import "../../css/Navbar.css"
import { Link } from 'react-router-dom';


function NavbarLogin() {


  return (
    <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#f1f7f1', boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)', padding: '10px', position: 'fixed', width: '99vw', zIndex: '10' }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <strong style={{ fontSize: '50px', fontStyle: 'italic', color: "#046930", marginLeft:"30px"}}>GreenX</strong>
      </div>
      <div style={{ display: 'flex', alignItems: 'center' ,marginRight:"50px"}}>
        <Link to='/'> <button style={{ borderRadius: '5px', border: 'none', backgroundColor: '#2182a1', color: '#2182a1', padding: '10px 20px' }}><div style={{ fontFamily: 'Open Sans, sans-serif', fontWeight: 'bold', color: 'white' }}>HOME</div></button></Link>
      </div>
    </nav>

  );
}

export default NavbarLogin;
