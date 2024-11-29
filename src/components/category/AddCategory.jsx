import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createCategory } from '../../redux/slices/categorySlice';
import { ToastContainer, toast } from 'react-toastify';

const AddCategory = () => {
  const [categoryName, setCategoryName] = useState('');
  const dispatch = useDispatch();

  const handleCategoryChange = (e) => {
    setCategoryName(e.target.value);
  };

  const handleCreateCategory = () => {
    if (categoryName) {
      dispatch(createCategory(categoryName));
      toast.success('Category created successfully!');
    } else {
      toast.error('Please enter a category name.');
    }
  };

  return (
    <div>
      <ToastContainer />
      <h3>Create a Category</h3>
      <input 
        type="text" 
        value={categoryName} 
        onChange={handleCategoryChange} 
        placeholder="Category Name" 
      />
      <button onClick={handleCreateCategory}>Create Category</button>
    </div>
  );
};

export default AddCategory;
