import React, { useEffect, useState } from 'react'
import "../../css/Detailedproduct.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Loading from '../Loading';





function Edit() {
    const [product, setProduct] = useState(null);
    const urlSearchParams = new URLSearchParams(window.location.search);
    const id = urlSearchParams.get('id');
    const url = 'https://greenx-backend.onrender.com/graphql';


    useEffect(() => {
        const fetchProducts = async () => {
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    query: `{getProductById(productID: "${id}") {
            _id
            name
            description
            price
            quantity
            images
            sellerID
            rating
            categoryID
            pincode
            city_name
        }
      }` }),
            });
            const result = await response.json();
            setProduct(result.data['getProductById']);
        };
        fetchProducts();
    }, []);

    const editProduct = async () => {
        const requestBody = {
            query: `
            mutation {
                updateProduct(
                    productId:"${id}" data:{
                    name:"${product.name}"
                    price:${product.price}
                    description:"${product.description}"
                    quantity:"${product.quantity}"
                    images: ["${product.images.join('","')}"] 
                    pincode:"${product.pincode}"
                    city_name:"${product.city_name}"
                }){
                        _id
                        name
                        description
                        price
                        quantity
                        images
                        sellerID
                        rating
                        categoryID
                        pincode
                        city_name
                    }
                }
                `,
            variables: {}
        };

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestBody)
        };

        console.log(product);

        const response = await fetch(url, requestOptions);
        const data = await response.json();
        console.log('Mutation response:', data);
    }


    if (!product) {
        return <Loading></Loading>;
    }
    return (
        <div >
            <div>
                <div className="product-card">
                    <div className="product-card__image" style={{
                        height: '75vh', display: 'flex', justifyContent: 'center', alignItems: 'center', border: '30px solid #2182a1',
                        borderRadius: '10px'
                    }}>
                        <Slider
                            autoplay={true}
                            infinite={true}
                            speed={500}
                            slidesToShow={1}
                            slidesToScroll={1}
                            style={{ width: '32vw' }}
                        >{
                                product.images.map((imges, index) => {
                                    return (
                                        <img src={imges} style={{ objectFit: 'cover', height: '75vh', width: '32vw', borderRadius: '10px', border: '30px solid #2182a1' }} alt={`ProductImage${index + 1}`} />
                                    )
                                })
                            }
                        </Slider>
                    </div>
                    <div className="product-card__info">
                        <h2 className="product-card__location">Title<input type="text" class="plain-input" style={{marginLeft:"65px"}} value={product.name} placeholder="Enter text here" onChange={(e) => { setProduct({ ...product, name: e.target.value }) }} /></h2>
                        <h3 className="product-card__location">Price<input type="number" class="plain-input" style={{marginLeft:"58px"}}  value={product.price} placeholder="Enter text here" onChange={(e) => { setProduct({ ...product, price: e.target.value }) }} /></h3>


                        <h3 className="product-card__location">Locality
                            <select
                            style={{marginLeft:"35px", width:"300px",height:"60px" }}
                                className="universeInput"
                                placeholder={product.pincode}
                                onChange={(e) => { setProduct({ ...product, city_name: e.target.value.slice(6), pincode: e.target.value.slice(0, 6) }) }}
                            >
                                <option value="" style={{ fontFamily: 'Open Sans, sans-serif' }}>SELECT A REGION/PINCODE..</option>
                                <option value="403512PERNEM" style={{ fontFamily: 'Open Sans, sans-serif' }}>PERNEM: 403512</option>
                                <option value="403101BARDEZ" style={{ fontFamily: 'Open Sans, sans-serif' }}>BARDEZ: 403101</option>
                                <option value="403504BICHOLIM" style={{ fontFamily: 'Open Sans, sans-serif' }}>BICHOLIM: 403504</option>
                                <option value="403530SATTARI" style={{ fontFamily: 'Open Sans, sans-serif' }}>SATTARI: 403530</option>
                                <option value="403001TISWADI" style={{ fontFamily: 'Open Sans, sans-serif' }}>TISWADI: 403001</option>
                                <option value="403401PONDA" style={{ fontFamily: 'Open Sans, sans-serif' }}>PONDA: 403401</option>
                                <option value="403706QUEPEM" style={{ fontFamily: 'Open Sans, sans-serif' }}>QUEPEM: 403706</option>
                                <option value="403704SANGUEM" style={{ fontFamily: 'Open Sans, sans-serif' }}>SANGUEM: 403704</option>
                                <option value="403707SALCETE" style={{ fontFamily: 'Open Sans, sans-serif' }}>SALCETE: 403707</option>
                                <option value="403702CANACONA" style={{ fontFamily: 'Open Sans, sans-serif' }}>CANACONA: 403702</option>
                            </select></h3>


                        <h3 className="product-card__location">Quantity<input type="text" class="plain-input" value={product.quantity} placeholder="Enter text here" onChange={(e) => { setProduct({ ...product, quantity: e.target.value }) }} /></h3>
                        <h3 className="product-card__location" style={{marginTop:"30px"}}>Description<br /><textarea style={{margin:"20px , 0px"}} class="plain-input2" value={product.description} placeholder="Enter text here" onChange={(e) => { setProduct({ ...product, description: e.target.value }) }} /></h3>
                        <button className="product-card__button" onClick={editProduct}>EDIT PRODUCT</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Edit