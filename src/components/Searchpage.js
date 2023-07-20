import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import "../css/Searchpage.css"
const searchIcon = require('../images/searchicon.png');

function Searchpage() {
  const [location, setLocation] = useState('');
  const [field, setField] = useState('');
  const history = useHistory();

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  }

  const handleSearch = () => {
    if (location && field) {
      history.push(`/searchpage?location=${location}&searchfield=${field}`);
    }
  }

  return (
    <div className="search-page">
      <span style={{ color: 'white', fontSize: '30px', fontWeight: "600" }}> Search Products In your locality</span>
      <div className="search-bar">
        <div className="location">
          <select value={location} onChange={handleLocationChange}>
          <option value="">Select location</option>
            <option  value="403512">PERNEM</option>
            <option  value="403101">BARDEZ</option>
            <option  value="403504">BICHOLIM</option>
            <option  value="403530">SATTARI</option>
            <option  value="403001">TISWADI</option>
            <option  value="403401">PONDA</option>
            <option  value="403706">QUEPEM</option>
            <option  value="403704">SANGUEM</option>
            <option  value="403707">SALCETE</option>
            <option  value="403702">CANACONA</option>
          </select>
        </div>
        <div className="search-field">
          <input
            type="text"
            placeholder="Search"
            value={field}
            onChange={(e) => setField(e.target.value)}
          />
        </div>
        <img
          src={searchIcon}
          alt="Search"
          style={{ height: '40px', width: '40px', cursor: 'pointer' }}
          onClick={handleSearch}
        />
      </div>
    </div>
  );
}

export default Searchpage;





