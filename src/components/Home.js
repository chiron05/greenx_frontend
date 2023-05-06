import { useState, useEffect } from 'react';
import '../css/Home.css'
import { Link } from 'react-router-dom';

const Home = () => {

  const [currentSlide, setCurrentSlide] = useState(0);
  const slideInterval = 3000;
  const [products, setProducts] = useState([]);

  const handleSlider = () => {
    const timer = setTimeout(() => {
      setCurrentSlide((currentSlide + 1) % products.length);
    }, slideInterval);

    return () => clearTimeout(timer);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('https://greenx-backend.onrender.com/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: '{ getAllProducts { _id name images description } }' }),
      });
      const result = await response.json();
      setProducts(result.data.getAllProducts);
      
    };

    fetchProducts();
  }, []);

  useEffect(() => {

    if (products.length > 0) {
      handleSlider();
    }
  }, );
  return (
<div className='main'>
<div style={{ height: '80vh', width: '80vw' ,margin: '0 auto',backgroundColor: '#dae3dc',boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)'}}>
      {products.map((product, index) => (
        <div
          key={product._id}
          style={{
            display: index === currentSlide ? 'flex' : 'none',
            height: '100%',
            width: '100%',
          }}
        >
          <div style={{ flex: '1', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'start',paddingLeft:'100px' }}>
            <div style={{ fontSize: '20px',fontStyle: 'italic',color:"#046930" }}>Special Trending Products</div>
            <div style={{ fontSize: '40px',color:"#202b4e",fontWeight:'bold',fontFamily: 'Open Sans, sans-serif' }}>{product.name}</div>
            <p style={{width:'20vw',height:'20vh',fontFamily: 'Open Sans, sans-serif'}}>{product.description}</p>
            <Link to={`/detailproduct?id=${product._id}`}>
            <button style={{backgroundColor:'#202b4e',borderRadius:'5px',height:'50px',width:'200px',color:'white',fontFamily: 'Poppins, sans-serif'}}>VIEW PRODUCT</button>
            </Link>
          </div>
          <div style={{ flex: '1', backgroundImage: `url(${product.images[0]})`, backgroundSize: 'cover' }} />
        </div>
      ))}
    </div>

    </div>
    
  );
};

export default Home;
