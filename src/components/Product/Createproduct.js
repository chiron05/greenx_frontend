import React, { useState } from 'react';
import './Createproduct.css'
import { Image } from 'cloudinary-react';
import { Cloudinary } from 'cloudinary-core';




const imge='../../images/img2.png'
const cloudinary = new Cloudinary({
  cloud_name: 'dgi3gedck',
  api_key: '864638863547999',
  api_secret: 'tB4PpiFcOVrG2pidsc-pi2JMSys'
});


const Createproduct = () => {
  const [productname, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [pincode, setPincode] = useState('');
  const [images, setImages] = useState([]);
  // const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadError, setUploadError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case 'productname':
        setName(value);
        break;
      case 'description':
        setDescription(value);
        break;
      case 'price':
        setPrice(value);
        break;
      case 'quantity':
        setQuantity(value);
        break;
      case 'pincode':
        setPincode(value);
        break;
      default:
        break;
    }
  };

 // Inside your component...
let imageData =[];
const handleImageUpload = async (event) => {
  let allimage=[];
  try {
    const files = event.target.files;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const data = new FormData()
    data.append("file",file)
    data.append("upload_preset","greenx")
    data.append("cloud_name","dyog3kn22")
    const resposne=await fetch("https://api.cloudinary.com/v1_1/dyog3kn22/image/upload",{
      method:"post",
      body:data
    })
    const result = await resposne.json();
    const imageUrl = result.secure_url;
    allimage[i]=imageUrl
    }
    console.log(allimage)
    let x=0;
    for(x=0;x<allimage.length;x++){
      imageData[x]=allimage[x]
    }
    console.log(imageData)
    setUploadError(''); // Clear the upload error
    console.log("images"+images)
  } catch (error) {
        setUploadError('Error uploading images. Please try again.');
        return;
  }

  
};




  const handleSubmit = async(e) => {
    e.preventDefault();

    // Here you can perform any necessary validation and submit the form data

    // Reset form fields
    setName('');
    setDescription('');
    setPrice('');
    setQuantity('');
    setPincode('');
    setImages([]);
  };

  return (

      <div className="gradient-background">

        <div className="form-container">
          <h2 style={{fontFamily: 'Open Sans, sans-serif' , color:'green'}}>CREATE A PRODUCT</h2>
          <form onSubmit={handleSubmit}>
            <div>
            <input type="text"  name="productname"  value={productname} onChange={handleInputChange} className="universeInput" placeholder="PRODUCT NAME..." ></input>
            </div>
            <div>
            <textarea type="text"   id="description"  name="description" value={description}  onChange={handleInputChange} className="universeInput" placeholder="DESCRIPTION..."></textarea>
            </div>
            <div>
               <input type="number" id="price" name="price"  value={price} onChange={handleInputChange} className="universeInput" placeholder="PRICE..."></input>
            </div>
            <div>
            <input type="text" id="quantity"  name="quantity"  value={quantity} onChange={handleInputChange} className="universeInput" placeholder="QUANTITY..."></input>
            </div>
            <div>
              <select
              className="universeInput"
              id="pincode"
              name="pincode"
              value={pincode}
              onChange={handleInputChange}
            >
              <option value="">SELECT A REGION/PINCODE..</option>
              <option value="10010">Canaocna: 10010</option>
              <option value="92812">Cuncolum: 92812</option>
            </select>
            </div>
            <div>
              <label htmlFor="images" style={{ fontFamily: 'Open Sans, sans-serif',marginTop:'20px',marginBottom:'10px',color:'#959598',marginLeft:'10px'}}>IMAGES...</label>
              <input
              type="file"
              id="images"
              name="files"
              accept="image/*"
              multiple
              className="universeInput"
              onChange={handleImageUpload}
            />
            {uploadError && <p style={{color:'red',fontFamily:'Open Sans, sans-serif'}}>{uploadError}</p>}
            </div>
            <button type="submit">SUBMIT</button>
           
          </form>
        </div>
      </div>

  );
};

export default Createproduct;
