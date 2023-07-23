import React, { useState } from 'react'
import './Card.css'
import { Link } from 'react-router-dom';

import useLocalStorage from "../../Hooks/useLocalStorage"

const Card2 = ({ id, name, description, image, price }) => {
    const [liked, setLiked] = useState(false);
    const [rating, setRating] = useState(3.5);
    const [loggedStatus, setLoggedStatus] = useLocalStorage("loggedStatus")
    const toggleLike = () => {
        setLiked(!liked);
    }

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
                        <Link to={`/edit?id=${id}`} style={{ textDecoration: 'none', display: "flex" }}>
                            <div style={{ fontWeight: "500", color: "black", border: "2px dotted black", padding: "5px", borderRadius: "25px" }}>EDIT</div>
                        </Link>
                    </>
                    :
                    <Link to={`/authentication`} style={{ textDecoration: 'none' }}>
                        <div style={{ fontWeight: "500", color: "black", border: "2px dotted black", padding: "5px", borderRadius: "25px" }}>Login to Veiw Product</div>
                    </Link>}
            </div>
        </div>
    )
}

export default Card2