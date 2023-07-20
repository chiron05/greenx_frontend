import React, { useEffect, useState } from 'react';
import "../css/Slider.css"
import { Link } from 'react-router-dom';
const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = () => {
    setCurrentSlide((currentSlide + 1) % imageData.length);
  };

  const handlePrev = () => {
    setCurrentSlide(currentSlide === 0 ? imageData.length - 1 : currentSlide - 1);
  };

  const preImage=require("../images/left.png")
  const nxtImage=require("../images/right.png")

  const [imageData,setImageData] = useState([])

  useEffect(() => {
    try{
    const fetchData = async () => {
        const response = await fetch('https://greenx-backend.onrender.com/graphql', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({query: `{ getAllCategory {_id name image description } } `,}),
        });
        const result = await response.json();
        setImageData(result.data.getAllCategory)
      } 
    fetchData();
    }catch(err){
      console.log(err);
    }
}, []);

  const startIndex = currentSlide;
  const endIndex = (currentSlide + 2) % imageData.length;

  return (
    <>
    <h1 style={{ textAlign: 'center' ,color:'#92c394',marginTop:"60px"}}>CATEGORY</h1>
    <div className="slider-container" style={{ backgroundColor: '#dae3dc' ,marginBottom:"110px"}}>
   
     <img src={preImage} alt="Button Image" width="70" height="50" color='#dae3dc'onClick={handlePrev} style={{cursor: 'pointer',marginRight:"30px"}}/>
      <div className="slids"> 
        { 
          imageData.slice(startIndex, endIndex + 1).map((data, index) => (
           
           <div key={data._id} className="slider__slide">
           <Link to={`/categorypage?categoryid=${data._id}`}>
            <img src={data.image} alt={data.name} />
            </Link>
            <div className="slider__name" style={{marginTop:"10px" ,fontWeight:"bold"}}>{data.name}</div>
            <div className="slider__description" style={{fontFamily: 'Open Sans, sans-serif'}}>{data.description.slice(0,300)}</div>
           </div>
        
        ))
        }
      </div>
      <img src={nxtImage} alt="Button Image" width="70" height="50" color='#dae3dc'onClick={handleNext} style={{cursor: 'pointer',marginLeft:"30px"}}/>
    </div>
    </>
    
  );
};

export default Slider;
