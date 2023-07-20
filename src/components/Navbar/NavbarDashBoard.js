import React, { useState } from 'react';
import "../../css/Navbar.css"
import { Link } from 'react-router-dom';
import useLocalStorage from "../../Hooks/useLocalStorage"
import { useHistory } from 'react-router-dom';

function NavbarDashBoard() {
  const [loggedStatus, setLoggedStatus] = useLocalStorage("loggedStatus")
  const [token, setToken] = useLocalStorage("token")
  const [userID, setUserID] = useLocalStorage("userID")
  const history = useHistory();

  const LogoutUser = () => {
      history.push('/');
      alert("User Logged Out Successfully")
      setLoggedStatus(false)
      setToken(null)
      setUserID(null)
  }

  return (
    <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#f1f7f1', boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)', padding: '10px', position: 'fixed', width: '99vw', zIndex: '10' }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <strong style={{ fontSize: '50px', fontStyle: 'italic', color: "#046930", marginLeft: "30px" }}>GreenX</strong>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', marginRight: "50px" }}>
        {(loggedStatus) ?
          <>
            <Link to='/'> <button style={{ borderRadius: '5px', border: 'none', backgroundColor: '#2182a1', color: '#2182a1', padding: '10px 20px', margin: "10px" }}><div style={{ fontFamily: 'Open Sans, sans-serif', fontWeight: 'bold', color: 'white' }}>HOME</div></button>
            </Link>
            <button style={{ borderRadius: '5px', border: 'none', backgroundColor: '#2182a1', color: '#2182a1', padding: '10px 20px', margin: "10px" }}><div onClick={LogoutUser} style={{ fontFamily: 'Open Sans, sans-serif', fontWeight: 'bold', color: 'white' }}>LOGOUT</div></button>
          </> :
          <Link to='/authentication'> <button style={{ borderRadius: '5px', border: 'none', backgroundColor: '#2182a1', color: '#2182a1', padding: '10px 20px' }}><div style={{ fontFamily: 'Open Sans, sans-serif', fontWeight: 'bold', color: 'white' }}>LOG IN / SIGN UP</div></button>
          </Link>}
      </div>
    </nav>

  );
}

export default NavbarDashBoard;
