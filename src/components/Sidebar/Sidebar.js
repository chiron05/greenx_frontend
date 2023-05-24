import React from 'react';
import './Sidebar.css'; // Import the CSS file for styling

const Sidebar = ({ onClose }) => {
  return (
    <div className="sidebar">
      <ul className="sidebar-menu">
        <li className="menu-item">Home</li>
        <li className="menu-item">About</li>
        <li className="menu-item">Services</li>
        <li className="menu-item">Contact</li>
        <button className="close-btn" onClick={onClose}>X</button>
      </ul>
    </div>
  );
};

export default Sidebar;
