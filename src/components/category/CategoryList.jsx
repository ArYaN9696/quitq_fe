import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../../store/categorySlice';
import { ToastContainer, toast } from 'react-toastify';

const CategoryList = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.categories);
  const status = useSelector((state) => state.categories.status);
  const error = useSelector((state) => state.categories.error);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchCategories());
    }

    if (error) {
      toast.error(error, {
        position: "top-right", 
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }

    if (status === 'succeeded' && categories.length === 0) {
      toast.info('No categories available!', {
        position: "top-right", 
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }, [dispatch, status, error, categories.length]);

  return (
    <div className="card p-4 shadow-sm">
      <ToastContainer />
      <h2 className="mb-4">Categories</h2>

      {status === 'loading' && (
        <div className="alert alert-info" role="alert">
          Loading categories...
        </div>
      )}

      {status === 'succeeded' && categories.length === 0 && (
        <p>No categories available.</p>
      )}

      {status === 'succeeded' && categories.length > 0 && (
        <ul className="list-group">
          {categories.map((category) => (
            <li key={category.categoryId} className="list-group-item">
              {category.categoryName}
            </li>
          ))}
        </ul>
      )}

      {status === 'failed' && (
        <div className="alert alert-danger" role="alert">
          Error loading categories.
        </div>
      )}
    </div>
  );
};

export default CategoryList;
