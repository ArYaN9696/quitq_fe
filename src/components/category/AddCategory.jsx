import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createCategory } from '../../store/categorySlice';
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
    <div className="card p-4 shadow-sm">
      <ToastContainer />
      <h3 className="mb-4">Create a Category</h3>
      <div className="mb-3">
        <input 
          type="text" 
          value={categoryName} 
          onChange={handleCategoryChange} 
          placeholder="Category Name" 
          className="form-control" 
        />
      </div>
      <button
        onClick={handleCreateCategory}
        className="btn btn-primary w-100"
        disabled={!categoryName}
      >
        Create Category
      </button>
    </div>
  );
};

export default AddCategory;
