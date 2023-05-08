import React, { useEffect, useState } from 'react';
import { useScroll, useSpring } from 'framer-motion';
import { Parallax } from 'react-parallax';
import Advertisement from './Advertisement';
import Home from './Home';
import Productspage from './Productspage';
import Searchpage from './Searchpage';
import Slider from './Silder';
import '../css/Homepage.css';
import AOS from 'aos';
import 'aos/dist/aos.css'; 

AOS.init();

const Homepage = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

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
      <div data-aos="fade-up" data-aos-delay="5000" data-aos-duration="2000"><Home/></div>
      <div data-aos="fade-up"  data-aos-delay="5000" data-aos-duration="2000"><Searchpage/></div>
      <div data-aos="fade-up" data-aos-delay="5000" data-aos-duration="2000"><Slider /></div>
      <div data-aos="fade-up" data-aos-delay="5000" data-aos-duration="2000"> <Advertisement /></div> 
      <div data-aos="fade-up" data-aos-delay="5000" data-aos-duration="2000"> <Productspage products={products} setProducts={setProducts} />
    </div> 
        
       
    </>
  );
};

export default Homepage;
