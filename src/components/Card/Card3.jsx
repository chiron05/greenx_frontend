import React, { useState } from 'react'
import './Card.css'
import { Link } from 'react-router-dom';
import useLocalStorage from "../../Hooks/useLocalStorage"
import { useHistory } from 'react-router-dom';
const Card3 = ({ id, name, description, image, price, prating }) => {
    const history = useHistory();
    const [rating, setRating] = useState(prating);
    const [loggedStatus, setLoggedStatus] = useLocalStorage("loggedStatus")

    const url = 'https://greenx-backend.onrender.com/graphql';


    const getStars = () => {
        let stars = [];
        for (let i = 0; i < 5; i++) {
            if (i < Math.floor(rating)) {
                stars.push(<span key={i}>&#9733;</span>);
            } else if (i === Math.floor(rating) && rating % 1 !== 0) {
                stars.push(<span key={i}>&#9734;</span>);
            } else {
                stars.push(<span key={i}>&#9734;</span>);
            }
        }
        return stars;
    }

    const deleteProduct = async () => {

        const question = "Please enter Product name to confirm delete(" + name + "):"
        const userInput = prompt(question);

        if (userInput == name) {
            const requestBody = {
                query: `
                mutation {
                    deleteProduct(productId:"${id}")
                    }
                    `,
                variables: {}
            };

            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(requestBody)
            };
            const response = await fetch(url, requestOptions);
            const data = await response.json();
            alert(data.data.deleteProduct)
            setTimeout(() => {
                history.push('/sellerdashboard');
            }, 1000);
        } else {
            setTimeout(() => {
                alert("Invalid Product Name")
            }, 1000);
        }
    }

    return (
        <div class="card">
            <img class="cardimg" src={image}></img>
            <div class="cardinfo">
                <p class="texttitle">{name} </p>
                <p class="textbody">{description.slice(0, 50) + "...more"}</p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', color: 'yellow' }}>
                {getStars()}
            </div>
            <div class="cardfooter">
                <span class="texttitle">₹{price}</span>
                {(loggedStatus) ?
                    <>
                        <Link to={`/detailproduct?id=${id}`} style={{ textDecoration: 'none', display: "flex" }}>
                            <div style={{ fontWeight: "500", color: "black", border: "2px dotted black", padding: "5px", borderRadius: "25px" }}>Product Details</div>
                        </Link>
                        <div style={{ fontWeight: "500", color: "black", border: "2px dotted black", padding: "5px", borderRadius: "25px", cursor: "pointer" }} onClick={deleteProduct}>DELETE</div>

                    </>
                    :
                    <Link to={`/authentication`} style={{ textDecoration: 'none' }}>
                        <div style={{ fontWeight: "500", color: "black", border: "2px dotted black", padding: "5px", borderRadius: "25px" }}>Login to Veiw Product</div>
                    </Link>}
            </div>
        </div>
    )
}

export default Card3