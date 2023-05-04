import { useState, useEffect } from 'react';
import '../css/Home.css'
const dishes = [
  {
    id: 1,
    name: 'Agriculture tools',
    description: 'This is the his his is the first dish is the first dishhis is the first dish his is the first dish his is the first dish his is the first dishfirst dish',
    image: 'https://www.qy1.de/img/axt-graensfors.jpg',
  },
  {
    id: 2,
    name: 'fertilizers',
    description: 'This is the his hisasdas asdasda efwarefawrtaregta ergtergs is the first dish is the first dishhis is the first dish his is the first dish his is the first dish his is the first dishfirst dish',
    image:'https://cdn.shopify.com/s/files/1/0579/7924/0580/articles/shutterstock_301313486.jpg?v=1661870861'

    ,
  },
  {
    id: 3,
    name: 'Fruits and Vegetables',
    description: 'This is the his his is the first dish is the  the first dish his is the first dish his is the first dishfirst dish',
    image:'https://www.lalpathlabs.com/blog/wp-content/uploads/2019/01/Fruits-and-Vegetables-950x633.jpg',
  },
];

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Define the time interval between slides
  const slideInterval = 3000;

  // Change the current slide automatically after a certain interval
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentSlide((currentSlide + 1) % dishes.length);
    }, slideInterval);

    return () => clearTimeout(timer);
  }, [currentSlide]);

  return (
<div className='main'>
<div style={{ height: '80vh', width: '80vw' ,margin: '0 auto',backgroundColor: '#dae3dc',boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)'}}>
      {dishes.map((dish, index) => (
        <div
          key={dish.id}
          style={{
            display: index === currentSlide ? 'flex' : 'none',
            height: '100%',
            width: '100%',
          }}
        >
          <div style={{ flex: '1', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'start',paddingLeft:'100px' }}>
            <div style={{ fontSize: '20px',fontStyle: 'italic',color:"#046930" }}>Special Trending Products</div>
            <div style={{ fontSize: '40px',color:"#202b4e",fontWeight:'bold',fontFamily: 'Open Sans, sans-serif' }}>{dish.name}</div>
            <p style={{width:'20vw',height:'20vh',fontFamily: 'Open Sans, sans-serif'}}>{dish.description}</p>
            <button style={{backgroundColor:'#202b4e',borderRadius:'5px',height:'50px',width:'200px',color:'white',fontFamily: 'Poppins, sans-serif'}}>VIEW PRODUCT</button>
          </div>
          <div style={{ flex: '1', backgroundImage: `url(${dish.image})`, backgroundSize: 'cover' }} />
        </div>
      ))}
    </div>

    </div>
    
  );
};

export default Home;
