import React,{ useState } from 'react';
import "../css/Searchpage.css"
const searchIcon=require('../images/searchicon.png')
function Searchpage() {
    const [location, setLocation] = useState(''); // Initialize state for location input
    const [locationsList, setLocationsList] = useState(['Canacona', 'Margao', 'Mapusa', 'Ponda', 'Cuncolim']); // List of options for dropdown menu
  
    const handleLocationChange = (event) => {
      setLocation(event.target.value);
    }
  
    const handleLocationSelect = (location) => {
      setLocation(location);
    }
  return (
    <div className="search-page">
    <span style={{color:'white',fontSize:'30px',fontWeight:"600"}}> Search Products In your locality</span>
     <div className="search-bar">
     <div className="location">
        <select value={location} onChange={handleLocationChange}>
          <option value="">Select location</option>
          {locationsList.map((location) => (
            <option key={location} value={location}>{location}</option>
          ))}
        </select>
      </div>
      <div className="search-field">
        <input type="text" placeholder="Search" />
      </div>
      <img src={searchIcon} alt="Search" style={{height:'40px', width:'40px'}}/>
    </div>
    </div>
  );
}

export default Searchpage;
