import React,{useState} from 'react'
import './Card.css'
import BookmarkIcon from '@mui/icons-material/Bookmark';
const Card = ({name,description,image,price}) => {
    const [liked, setLiked] = useState(false);
    const [rating, setRating] = useState(3.5);
  
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
    <div style={{ display: 'flex', justifyContent: 'center',color:'yellow' }}>
          {getStars()}
        </div>
    <div class="cardfooter">
    <span class="texttitle">${price}</span>
   
    <div class="cardbutton">
    <svg class="svg-icon" viewBox="0 0 20 20">
        <BookmarkIcon></BookmarkIcon>
      </svg>
    </div>
  </div>
  </div>
  )
}

export default Card