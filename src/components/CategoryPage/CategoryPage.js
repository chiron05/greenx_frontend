import React, { useState } from 'react';
import { Grid, Paper } from '@material-ui/core';
import FilterComponent from './FilterComponent';
import ProductList from './ProductList';
import NavbarDetailProduct from '../Navbar/NavbarDetailProduct';


const CategoryPage = () => {


  const [filteredProducts, setFilteredProducts] = useState([]);
  const handleFilter = (filteredProducts) => {
    setFilteredProducts(filteredProducts);
  };
  return (
    <>
      <NavbarDetailProduct />
      <div style={{ height: '100vh', overflow: 'hidden',paddingTop:"80px" }}>
        <Grid container style={{ height: '100%' }}>
          <Grid item xs={3}>
            <Paper style={{ height: '100%', padding: '16px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.4)' }}>
              <FilterComponent onFilter={handleFilter} />
            </Paper>
          </Grid>
          <Grid item xs={9} >
            <Paper style={{ height: '100%', padding: '16px', overflow: 'auto' }}>
              <div style={{ maxHeight: '100%', overflowY: 'scroll' }}>
                <ProductList products={filteredProducts} />
              </div>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default CategoryPage;
