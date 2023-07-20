import React, { useState,useEffect } from 'react';
import { useHistory ,useParams,useLocation  } from 'react-router-dom';

import {
  Grid,
  Paper,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Button,
  Select,
  MenuItem,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from '@material-ui/core';

const FilterComponent = ({ onFilter }) => {
  const location = useLocation();
  const { categoryID } = useParams();
  const history = useHistory();
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedRating, setSelectedRating] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const [categoryid, setcategoryid] = useState('');

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const categoryId = searchParams.get('categoryid');
    setcategoryid(categoryId)
    console.log(categoryId);
  }, []);

  const handleRatingChange = (event) => {
  
    const { name, checked } = event.target;
    const rating = parseInt(name, 10);

    if (checked) {
      setSelectedRating([...selectedRating, rating]);
    } else {
      setSelectedRating(selectedRating.filter((r) => r !== rating));
    }
  };

  const handleApplyFilters = () => {
   
    const queryString = `?categoryid=${categoryid}&location=${selectedLocation}&rating=${selectedRating}&min=${priceRange.min}&max=${priceRange.max}`;
    // Validation logic
    if (!selectedLocation || selectedRating.length === 0 || !priceRange.min || !priceRange.max) {
      setErrorMessage('Please fill all fields before applying filters.');
      return;
    }
    setErrorMessage('');

    history.push(`/categorypage${queryString}`);
 
    // Handle logic for applying filters
    console.log('Filters applied!');
    console.log('Selected Location:', selectedLocation);
    console.log('Selected Rating:', selectedRating);
    console.log('Price Range:', priceRange);
  };

  const handleLocationChange = (event) => {
    setSelectedLocation(event.target.value);
  };

  const handlePriceChange = (event, newValue) => {
    const { name, value } = event.target;
    setPriceRange((prevRange) => ({ ...prevRange, [name]: value }));
  };

  return (
    <Paper style={{ height: '87%', padding: '16px', background: '#E9F5E8' }}>
      <Typography variant="h6" gutterBottom style={{ fontFamily: 'Montserrat', fontWeight: 'bold' }}>
        Filters
      </Typography>
      <Grid container spacing={2} style={{ marginTop: '20px' }}>
        <Grid item xs={12}>
          <Typography variant="subtitle1" style={{ fontFamily: 'Montserrat', fontWeight: 'bold' }}>
            Rating
          </Typography>
          <FormGroup>
            <FormControlLabel control={<Checkbox onChange={handleRatingChange} name="5" />} label="5 stars" />
            <FormControlLabel control={<Checkbox onChange={handleRatingChange} name="4" />} label="4 stars" />
            <FormControlLabel control={<Checkbox onChange={handleRatingChange} name="3" />} label="3 stars" />
            <FormControlLabel control={<Checkbox onChange={handleRatingChange} name="2" />} label="2 stars" />
            <FormControlLabel control={<Checkbox onChange={handleRatingChange} name="1" />} label="1 stars" />
            <FormControlLabel control={<Checkbox onChange={handleRatingChange} name="0" />} label="0 stars" />
            {/* Add more rating options */}
          </FormGroup>
          {/* Rating checkboxes */}
        </Grid>
        <Grid item xs={12} >
          <Typography variant="subtitle1" style={{ fontFamily: 'Montserrat', fontWeight: 'bold', marginBottom: '10px' }}>
            Location
          </Typography>
          <FormControl variant="outlined" fullWidth>
            <InputLabel id="location-label">Select Location</InputLabel>
            <Select
              labelId="location-label"
              id="location-select"
              value={selectedLocation} // Selected location value
              onChange={handleLocationChange}
              label="Select Location"
            >
              <MenuItem value="">None</MenuItem>
              <MenuItem value="403512">PERNEM</MenuItem>
              <MenuItem value="403101">BARDEZ</MenuItem> 
              <MenuItem value="403504">BICHOLIM</MenuItem>
              <MenuItem value="403530">SATTARI</MenuItem>
              <MenuItem value="403001">TISWADI</MenuItem>
              <MenuItem value="403401">PONDA</MenuItem>
              <MenuItem value="403706">QUEPEM</MenuItem>
              <MenuItem value="403704">SANGUEM</MenuItem>
              <MenuItem value="403707">SALCETE</MenuItem>
              <MenuItem value="403702">CANACONA</MenuItem>
              {/* Add more location options */}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} style={{ marginTop: '0px' }}>
          <Typography variant="subtitle1" style={{ fontFamily: 'Montserrat', fontWeight: 'bold' }}>
            Price Range
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                type="number"
                label="Min Price"
                variant="outlined"
                fullWidth
                name="min"
                value={priceRange.min}
                onChange={handlePriceChange}
                InputProps={{
                  inputProps: {
                    min: 0,
                    style: {
                      appearance: 'textfield',
                    },
                  },
                  inputMode: 'numeric',
                  pattern: '[0-9]*',
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                type="number"
                label="Max Price"
                variant="outlined"
                fullWidth
                name="max"
                value={priceRange.max}
                onChange={handlePriceChange}
                InputProps={{
                  inputProps: {
                    min: 0,
                    style: {
                      appearance: 'textfield',
                    },
                  },
                  inputMode: 'numeric',
                  pattern: '[0-9]*',
                }}
              />
            </Grid>
          </Grid>
        </Grid>
        {/* Add more filter options */}
        <Grid item xs={12}>
          {errorMessage && (
            <Typography variant="body2" color="error" style={{ marginBottom: '10px' }}>
              {errorMessage}
            </Typography>
          )}
          <Grid container justify="center">
            <Button
              variant="contained"
              color="#EFF7B0"
              onClick={handleApplyFilters}
              style={{ fontFamily: 'Montserrat', fontWeight: 'bold' }}
            >
              Apply Filters
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default FilterComponent;
