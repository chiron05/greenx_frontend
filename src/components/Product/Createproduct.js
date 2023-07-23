import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './Createproduct.css'
import { Cloudinary } from 'cloudinary-core';
import Swal from 'sweetalert2';
import { css } from '@emotion/react';
import ProgressBar from 'react-progress-bar-plus';
import 'react-progress-bar-plus/lib/progress-bar.css';
import useLocalStorage from "../../Hooks/useLocalStorage"
import { useHistory } from 'react-router-dom';


const imge='../../images/img2.png'
const cloudinary = new Cloudinary({
  cloud_name: 'dgi3gedck',
  api_key: '864638863547999',
  api_secret: 'tB4PpiFcOVrG2pidsc-pi2JMSys'
});
const override = css`
  display: block;
  margin: 0 auto;
`;


const Createproduct = () => {
  const history = useHistory();
  const [userID, setUserID] = useLocalStorage("userID")
  const [isUploading, setIsUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [submitProgress, setSubmitProgress] = useState(0);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const categoryid = queryParams.get('id');


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


  const handleImageUpload = async (event) => {
    setIsUploading(true);
  
    try {
     
      const files = event.target.files;
  
      const uploadPromises = Array.from(files).map((file) => {
        const data = new FormData();
        data.append('file', file);
        data.append('upload_preset', 'greenx');
        data.append('cloud_name', 'dyog3kn22');
  
        return fetch('https://api.cloudinary.com/v1_1/dyog3kn22/image/upload', {
          method: 'POST',
          body: data,
        })
          .then((response) => response.json())
          .then((result) => result.secure_url);
      });
  
      const uploadedImages = await Promise.all(uploadPromises);
      console.log(uploadedImages)
      setImages(uploadedImages);
     
      setUploadError(''); // Clear the upload error
    } catch (error) {
      setUploadError('Error uploading images. Please try again.');
    }
  
    setIsUploading(false);
  };
  



  const handleSubmit = async(e) => {
    e.preventDefault();
     console.log('entery image'+images)
    setUploadError('')
    setSubmitProgress(10)
    // Validation for name field
  if (productname.length < 3 || productname.length > 50) {
    setUploadError('Name should be between 3 and 50 characters.');
    return;
  }

  // Validation for description field
  if (description.length < 50 || description.length > 500) {
    setUploadError('Description should be between 50 and 500 characters.');
    return;
  }

   // Validation for price field
   if (isNaN(price)) {
    setUploadError('Price should be a valid number.');
    return;
  }
  setSubmitProgress(20)
    // Here you can perform any necessary validation and submit the form data
    if (
      !productname ||
      !description ||
      !price ||
      !quantity ||
      !pincode ||
      images.length === 0
    ) {
      setUploadError('Please fill in all the required fields.');
      return;
    }
   
    //saving into database
     // Construct the GraphQL mutation
     setSubmitProgress(30)
  const mutation = `
  mutation {
    createProduct(input: {
      name: "${productname}",
      description: "${description}",
      price: ${price},
      quantity: "${quantity}",
      sellerID: "${userID}",
      categoryID: "${categoryid}",
      pincode: "${pincode}",
      images: ["${images.join('", "')}"]
    }) {
      _id
      name
      price
      quantity
      images
      sellerID
      pincode
      city_name
    }
  }
`;

try {
  // Make the API request
  const response = await fetch('https://greenx-backend.onrender.com/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query: mutation }),
  });

  const result = await response.json();

  setSubmitProgress(80)
  if (result.errors) {
    console.log(result.errors)
    // Handle the error
    Swal.fire({
      icon: 'error',
      title: 'Submission Error',
      text: 'An error occurred while submitting the form. Please try again later.',
    });
  } else {
    // Data was saved successfully
    setSubmitProgress(100)
    const product = result.data.createProduct;

    // Reset form fields
    setName('');
    setDescription('');
    setPrice('');
    setQuantity('');
    setPincode('');
    setImages([]);

    // Show success message
    Swal.fire({
      icon: 'success',
      title: 'Submission Successful',
      text: 'Your form has been submitted successfully.',
    });
  }
  setSubmitProgress(0);
  setTimeout(()=>{
    history.push('/sellerdashboard');
},3000)
} catch (error) {
  // Handle any network or other errors
  setSubmitProgress(0);
  Swal.fire({
    icon: 'error',
    title: 'Submission Error',
    text: 'An error occurred while submitting the form. Please try again later.',
  });
}
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
              <option value="" style={{fontFamily: 'Open Sans, sans-serif'}}>SELECT A REGION/PINCODE..</option>
              <option value="403512" style={{fontFamily: 'Open Sans, sans-serif'}}>PERNEM: 403512</option>
              <option value="403101" style={{fontFamily: 'Open Sans, sans-serif'}}>BARDEZ: 403101</option>
              <option value="403504" style={{fontFamily: 'Open Sans, sans-serif'}}>BICHOLIM: 403504</option>
              <option value="403530" style={{fontFamily: 'Open Sans, sans-serif'}}>SATTARI: 403530</option>
              <option value="403001" style={{fontFamily: 'Open Sans, sans-serif'}}>TISWADI: 403001</option>
              <option value="403401" style={{fontFamily: 'Open Sans, sans-serif'}}>PONDA: 403401</option>
              <option value="403706" style={{fontFamily: 'Open Sans, sans-serif'}}>QUEPEM: 403706</option>
              <option value="403704" style={{fontFamily: 'Open Sans, sans-serif'}}>SANGUEM: 403704</option>
              <option value="403707" style={{fontFamily: 'Open Sans, sans-serif'}}>SALCETE: 403707</option>
              <option value="403702" style={{fontFamily: 'Open Sans, sans-serif'}}>CANACONA: 403702</option>
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
            <button type="submit" disabled={isUploading}>
                {isUploading ? 'Uploading...' : 'SUBMIT'}
           </button>
           {isUploading && (
            <div className="progress-bar-container">
               <ProgressBar percent={submitProgress} autoIncrement intervalTime={50} />
            </div>
      )}
          </form>
        </div>
      </div>

  );
};

export default Createproduct;
