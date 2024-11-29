import React from 'react';
import CategoryList from './components/category/CategoryList.jsx';
import AddCategory from './components/category/AddCategory.jsx';
import AddSubcategory from './components/category/AddSubcategory.jsx';
import { useSelector } from 'react-redux';

const CategoryPage = () => {
  const categories = useSelector((state) => state.categories.categories);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Category Management</h1>
      <div style={{ marginBottom: '30px' }}>
        <AddCategory />
      </div>
      {categories.length > 0 && (
        <div>
          <h2>Subcategories</h2>
          {categories.map((category) => (
            <div key={category.categoryId} style={{ marginBottom: '20px' }}>
              <h3>{category.categoryName}</h3>
              <AddSubcategory categoryId={category.categoryId} />
            </div>
          ))}
        </div>
      )}
      <div>
        <h2>All Categories</h2>
        <CategoryList />
      </div>
    </div>
  );
};

export default CategoryPage;
