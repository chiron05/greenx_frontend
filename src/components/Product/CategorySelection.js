import React, { useState, useEffect } from 'react';

import './CategorySelection.css';

const CategorySelection = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://greenx-backend.onrender.com/graphql', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            query: `
              query {
                getAllCategory {
                  _id
                  name
                  image
                }
              }
            `,
          }),
        });

        const { data } = await response.json();
        setCategories(data.getAllCategory);
        console.log(categories)
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='Category_Selection_main'>
      <div className='left-section'>
      <p className="text" style={{ fontSize: '30px', fontWeight: 'bold' ,color:'black',fontFamily: 'Open Sans, sans-serif'}}>STEP 1</p>
        <p className="text"><b style={{fontSize:'40px' ,fontFamily: 'Open Sans, sans-serif'}}>SELECT A CATEGORY</b></p>
        <p className="text" style={{marginTop:'30px' ,fontFamily: 'Open Sans, sans-serif'}}>
Categories help streamline the shopping experience by providing a clear structure and hierarchy to the website. They allow users to browse through a range of products that fall under a particular category, making it convenient to compare options and make informed decisions. <br></br>
They allow users to browse through a range of products that fall under a particular category, making it convenient to compare options and make informed decisions. 
</p>
      </div>
      <div className='right-section'>
      <div className='grid-container'>
      {categories.map(category => (
        <div className='grid-block'>
          <div key={category._id} className="category-item">
            <img src={category.image} style={{ backgroundSize: 'cover', backgroundRepeat: 'no-repeat', width: '100%', height: '200px' }} alt={category.name} />
            <div className="image-overlay">
              <p className="image-text">{category.name}</p>
            </div>
          </div>
          </div>
        ))}
   
   
        </div>
      </div>
    </div>
  );
};

export default CategorySelection;
