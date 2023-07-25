import React from 'react';

const Footer = () => {
  const year = new Date().getFullYear();

  const footerStyle = {
    backgroundColor: "gray",
    textAlign: "center",
    padding: "8px",
    position: "fixed",
    left: 0,
    bottom: 0,
    width: "100%",
  };

  return <div style={footerStyle}>{`Copyright © Upbeat Code ${year}`}</div>;
};

export default Footer;
