import React, { useState } from 'react';
import './Createproduct.css'
const imge='../../images/img2.png'
const Createproduct = () => {
  const [productname, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [pincode, setPincode] = useState('');
  const [images, setImages] = useState([]);

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

  const handleImageUpload = (e) => {
    const selectedImages = Array.from(e.target.files);
    setImages(selectedImages);
  };

  const handleSubmit = (e) => {
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
            <input type="text"  name="productname"  value={productname} onChange={handleInputChange} class="universeInput" placeholder="PRODUCT NAME..." ></input>
            </div>
            <div>
            <textarea type="text"   id="description"  name="description" value={description}  onChange={handleInputChange} class="universeInput" placeholder="DESCRIPTION..."></textarea>
            </div>
            <div>
               <input type="number" id="price" name="price"  value={price} onChange={handleInputChange} class="universeInput" placeholder="PRICE..."></input>
            </div>
            <div>
            <input type="text" id="quantity"  name="quantity"  value={quantity} onChange={handleInputChange} class="universeInput" placeholder="QUANTITY..."></input>
            </div>
            <div>
              <select
              class="universeInput"
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
              name="images"
              accept="image/*"
              multiple
              class="universeInput"
              onChange={handleImageUpload}
            />
            </div>
            <button type="submit">Create</button>
           
          </form>
        </div>
      </div>

  );
};

export default Createproduct;
