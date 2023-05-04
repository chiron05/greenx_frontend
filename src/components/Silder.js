import React, { useState } from 'react';
import "../css/Slider.css"

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = () => {
    setCurrentSlide((currentSlide + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentSlide(currentSlide === 0 ? images.length - 1 : currentSlide - 1);
  };

  const preImage=require("../images/left.png")
  const nxtImage=require("../images/right.png")
  const images = [
    {
      id: 1,
      url: 'https://www.qy1.de/img/axt-graensfors.jpg',
      alt: 'Image 1',
      description: 'arik sarik description k sarik description k sarik description k sarik description k sarik description k sarik description',
      name:"AGRICULTURE TOOLS"
    },
    {
      id: 2,
      url: 'https://cdn.shopify.com/s/files/1/0579/7924/0580/articles/shutterstock_301313486.jpg?v=1661870861',
      alt: 'Image 2',
      description: 'arik sarik description k sarik description k sarik description k sarik description k sarik description k sarik description',
      name:"FERTILIZERS"
    },
    {
      id: 3,
      url: 'https://www.lalpathlabs.com/blog/wp-content/uploads/2019/01/Fruits-and-Vegetables-950x633.jpg',
      alt: 'Image 3',
      description: 'barik sarik description k sarik description k sarik description k sarik arik sarik description k sarik description k sarik description k sarik arik sarik description k sarik description k sarik description k sarik  description k sarik description k sarik description',
      name:"FRUITS AND VEGETABLES"
    },
    {
      id: 4,
      url: 'https://www.lalpathlabs.com/blog/wp-content/uploads/2019/01/Fruits-and-Vegetables-950x633.jpg',
      alt: 'Image 4',
      description: 'This is the description for image 4.',
      name:"FRUITS AND VEGETABLES"
    },
    {
      id: 5,
      url: 'https://www.lalpathlabs.com/blog/wp-content/uploads/2019/01/Fruits-and-Vegetables-950x633.jpg',
      alt: 'Image 5',
      description: 'This is the description for image 5.',
      name:"FRUITS AND VEGETABLES"
    }
  ];

  const startIndex = currentSlide;
  const endIndex = (currentSlide + 2) % images.length;

  return (
    <>
    <h1 style={{ textAlign: 'center' ,color:'#92c394',marginTop:"60px"}}>CATEGORY</h1>
    <div className="slider-container" style={{ backgroundColor: '#dae3dc' ,marginBottom:"110px"}}>
     <img src={preImage} alt="Button Image" width="70" height="50" color='#dae3dc'onClick={handlePrev} style={{cursor: 'pointer',marginRight:"30px"}}/>
      <div className="slider">
        {images.slice(startIndex, endIndex + 1).map((image, index) => (
          <div key={image.id} className="slider__slide">
            <img src={image.url} alt={image.alt} />
            <div className="slider__name" style={{marginTop:"10px" ,fontWeight:"bold"}}>{image.name}</div>
            <div className="slider__description" style={{fontFamily: 'Open Sans, sans-serif'}}>{image.description}</div>
          </div>
        ))}
      </div>
      <img src={nxtImage} alt="Button Image" width="70" height="50" color='#dae3dc'onClick={handleNext} style={{cursor: 'pointer',marginLeft:"30px"}}/>
    </div>
    </>
    
  );
};

export default Slider;
