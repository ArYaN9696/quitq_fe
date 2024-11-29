// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchSubcategories } from '../../store/categorySlice'; 

// const SubCategoryList = ({ categoryId }) => {
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const subcategories = useSelector((state) => state.categories.subcategories[categoryId] || []);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         await dispatch(fetchSubcategories(categoryId)); 
//         setLoading(false);
//       } catch (error) {
//         setError("Failed to load subcategories");
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [categoryId, dispatch]);

//   if (loading) {
//     return <div>Loading subcategories...</div>;
//   }

//   if (error) {
//     return <div>{error}</div>;
//   }

//   return (
//     <div>
//       <h4>Subcategories for this category:</h4>
//       {subcategories.length > 0 ? (
//         <ul>
//           {subcategories.map((subcategory, index) => (
//             <li key={index}>{subcategory}</li>
//           ))}
//         </ul>
//       ) : (
//         <p>No subcategories available for this category.</p>
//       )}
//     </div>
//   );
// };

// export default SubCategoryList;
