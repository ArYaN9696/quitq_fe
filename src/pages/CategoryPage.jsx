import React from 'react';
import CategoryList from '../components/category/CategoryList.jsx';
import AddCategory from '../components/category/AddCategory.jsx';
import AddSubcategory from '../components/category/AddSubcategory.jsx';
import SubCategoryList from '../components/category/SubcategoryList.jsx';

import { useSelector } from 'react-redux';

const CategoryPage = () => {
  const categories = useSelector((state) => state.categories.categories);

  return (
    <div className="container my-4">
      <h1 className="mb-4">Category Management</h1>

      {/* Add Category Form */}
      <div className="mb-4">
        <AddCategory />
      </div>

      {/* Subcategories Section */}
      {categories.length > 0 && (
        <div className="mb-4">
          <h2 className="mb-3">Subcategories</h2>
          {categories.map((category) => (
            <div key={category.categoryId} className="card mb-3">
              <div className="card-body">
                <h3>{category.categoryName}</h3>
                <AddSubcategory categoryId={category.categoryId} />
                {/* <SubCategoryList categoryId={category.sub} /> */}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* All Categories List */}
      <div>
        <h2 className="mb-3">All Categories</h2>
        <CategoryList />
      </div>
    </div>
  );
};

export default CategoryPage;
