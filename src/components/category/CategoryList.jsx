import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../../redux/slices/categorySlice';
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
      toast.error(error);
    }
  }, [dispatch, status, error]);

  return (
    <div>
      <ToastContainer />
      <h2>Categories</h2>
      {status === 'loading' && <p>Loading...</p>}
      {status === 'succeeded' && (
        <ul>
          {categories.map((category) => (
            <li key={category.categoryId}>
              {category.categoryName}
            </li>
          ))}
        </ul>
      )}
      {status === 'failed' && <p>Error loading categories.</p>}
    </div>
  );
};

export default CategoryList;
