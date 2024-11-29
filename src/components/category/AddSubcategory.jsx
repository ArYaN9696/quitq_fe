import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createSubcategory } from '../../redux/slices/categorySlice';
import { ToastContainer, toast } from 'react-toastify';

const AddSubcategory = ({ categoryId }) => {
  const [subcategoryName, setSubcategoryName] = useState('');
  const dispatch = useDispatch();

  const handleSubcategoryChange = (e) => {
    setSubcategoryName(e.target.value);
  };

  const handleCreateSubcategory = () => {
    if (subcategoryName) {
      dispatch(createSubcategory({ categoryId, subcategoryName }));
      toast.success('Subcategory created successfully!');
    } else {
      toast.error('Please enter a subcategory name.');
    }
  };

  return (
    <div>
      <ToastContainer />
      <h3>Create a Subcategory</h3>
      <input
        type="text"
        value={subcategoryName}
        onChange={handleSubcategoryChange}
        placeholder="Subcategory Name"
      />
      <button onClick={handleCreateSubcategory}>Create Subcategory</button>
    </div>
  );
};

export default AddSubcategory;
