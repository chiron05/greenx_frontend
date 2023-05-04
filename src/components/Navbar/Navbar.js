import React from 'react';
import "../../css/Navbar.css"
function Navbar() {
  const icon=require('../../images/icon.png')
  return (
    <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#f1f7f1', padding: '10px' }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img src={icon} alt="icon" style={{ width: '30px', height: '30px', marginRight: '60px',marginLeft:"50px",cursor: 'pointer' }} />
        <strong style={{ fontSize: '50px',fontStyle: 'italic',color:"#046930" }}>GreenX</strong>
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
      <span style={{ marginRight: '20px', fontFamily: 'Open Sans, sans-serif', fontWeight: 'bold' ,color:'#546360',cursor: 'pointer' }}>NEW ARRIVAL</span>

      <span style={{ marginRight: '20px', fontFamily: 'Open Sans, sans-serif' , fontWeight: 'bold',color:'#546360' ,cursor: 'pointer'}}>Popular</span>
      <button style={{ borderRadius: '5px', border: 'none', backgroundColor: '#2182a1', color: '#2182a1', padding: '10px 20px' }}><div style={{ fontFamily: 'Open Sans, sans-serif', fontWeight: 'bold' ,color:'white' }}>Log In/ Sign Up</div></button>
      </div>
    </nav>
  );
}

export default Navbar;
