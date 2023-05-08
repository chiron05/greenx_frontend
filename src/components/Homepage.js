import React, { useEffect, useState } from 'react';
import { useScroll, useSpring } from 'framer-motion';
import { Parallax } from 'react-parallax';
import Advertisement from './Advertisement';
import Home from './Home';
import Productspage from './Productspage';
import Searchpage from './Searchpage';
import Slider from './Silder';
import '../css/Homepage.css';

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
      <Parallax strength={300}>
        <Home />
      </Parallax>
      <Parallax strength={500}>
        <Searchpage />
      </Parallax>
      
      <Parallax strength={500}>
        <Slider />
      </Parallax>
      <Parallax strength={500}>
        <Advertisement />
      </Parallax>
      <Parallax strength={500}>
        <Productspage products={products} setProducts={setProducts} />
      </Parallax>
    </>
  );
};

export default Homepage;
