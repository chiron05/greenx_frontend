import React, { useEffect} from 'react';
import Advertisement from './Advertisement';
import Home from './TrendingProducts';
import Productspage from './Productspage';
import Searchpage from './Searchpage';
import Slider from './Silder';
import '../css/Homepage.css';
import AOS from 'aos';
import 'aos/dist/aos.css'; 
import Navbar from './Navbar/Navbar';
import useLocalStorage from "../Hooks/useLocalStorage"
AOS.init();

const Homepage = () => {
  const [token, setToken] = useLocalStorage("token",null)
  const [loggedStatus, setLoggedStatus] = useLocalStorage("loggedStatus",false)
  const [userID, setUserID] = useLocalStorage("userID",null)

    useEffect(()=>{

      const GetLocation =()=>{
        if(loggedStatus==true){
          navigator.geolocation.getCurrentPosition((position)=>{
            console.log("Latitude is :", position.coords.latitude);
            console.log("Longitude is :", position.coords.longitude);
          })
        }
      }
      GetLocation();
    },[])



  return (
    <>
    <Navbar/>
      <div data-aos="fade-up" data-aos-delay="5000" data-aos-duration="2000" id='home'><Home/></div>
      <div data-aos="fade-up"  data-aos-delay="5000" data-aos-duration="2000" id='search'><Searchpage/></div>
      <div data-aos="fade-up" data-aos-delay="5000" data-aos-duration="2000" id='category'><Slider /></div>
      <div data-aos="fade-up" data-aos-delay="5000" data-aos-duration="2000" id='join'> <Advertisement /></div> 
      <div data-aos="fade-up" data-aos-delay="5000" data-aos-duration="2000" id='products'> <Productspage/></div>  
    </>
  );
};

export default Homepage;
