import React from "react";
import CategoryList from "../components/category/CategoryList.jsx";
import AddCategory from "../components/category/AddCategory.jsx";
import AddSubcategory from "../components/category/AddSubcategory.jsx";
// import SubCategoryList from '../components/category/SubcategoryList.jsx';

import { useSelector } from "react-redux";
import useAuth from "../hooks/useAuth";

const CategoryPage = () => {
  const { auth } = useAuth();
  const categories = useSelector((state) => state.categories.categories);

  return (
    <div className="container my-4">
      {/* All Categories List - Render for all users */}
      <div>
        {/* <h2 className="mb-3">All Categories</h2> */}
        <CategoryList />
      </div>

      {/* Render Add Category only for admin and seller */}
      {(auth.userRole === "admin" || auth.userRole === "seller") && (
        <div className="mb-4">
          <h1 className="mb-4">Category Management</h1>
          <AddCategory />
        </div>
      )}

      {/*Subcategories Section*/}
    </div>
  );
};

export default CategoryPage;
