import React, { useEffect, useState } from 'react';
import Advertisement from './Advertisement';
import Home from './Home';
import Productspage from './Productspage';
import Searchpage from './Searchpage';
import Slider from './Silder';
import '../css/Homepage.css';
import AOS from 'aos';
import 'aos/dist/aos.css'; 
import Navbar from './Navbar/Navbar';


AOS.init();

const Homepage = () => {

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
    <Navbar/>
      <div data-aos="fade-up" data-aos-delay="5000" data-aos-duration="2000" id='home'><Home/></div>
      <div data-aos="fade-up"  data-aos-delay="5000" data-aos-duration="2000" id='search'><Searchpage/></div>
      <div data-aos="fade-up" data-aos-delay="5000" data-aos-duration="2000" id='category'><Slider /></div>
      <div data-aos="fade-up" data-aos-delay="5000" data-aos-duration="2000" id='join'> <Advertisement /></div> 
      <div data-aos="fade-up" data-aos-delay="5000" data-aos-duration="2000" id='products'> <Productspage products={products} setProducts={setProducts} />
    </div>  
    </>
  );
};

export default Homepage;
