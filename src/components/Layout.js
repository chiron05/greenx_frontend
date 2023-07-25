import React from 'react';
import Footer from './Footer';


const Layout = ({ children }) => {
  return (
    <div>
      {/* Add your header or any other common components here */}
      {children}
      <Footer />
    </div>
  );
};

export default Layout;