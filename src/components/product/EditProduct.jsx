import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById, updateProduct } from '../../services/productService';

const EditProduct = () => {
  const { productId } = useParams(); // Extract productId from the route
  const [product, setProduct] = useState(null); // Product state starts as null
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null); // Track errors

  // Fetch product details when component loads
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await getProductById(productId);
        setProduct(response.data); // Set fetched product data
        setLoading(false); // Set loading to false
      } catch (error) {
        console.error('Error fetching product for edit:', error);
        setError('Failed to fetch product data.');
        setLoading(false); // Set loading to false even on error
      }
    };
    fetchProduct();
  }, [productId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Map frontend fields to backend DTO fields
    const productData = {
      ProductName: product.name,             // Map 'name' to 'ProductName'
      Description: product.description,
      Price: parseFloat(product.price),      // Ensure Price is a decimal
      Stock: parseInt(product.stock, 10),    // Ensure Stock is an integer
      ImageUrl: product.imageUrl || '',      // Optional field
      SubcategoryId: parseInt(product.subcategoryId, 10) // Ensure SubcategoryId is an integer
    };
  
    try {
      console.log('Submitting updated product:', productData); // Debugging
      const response = await updateProduct(productId, productData);
      alert('Product updated successfully!');
    } catch (error) {
      console.error('Error updating product:', error);
      alert(error.message || 'Failed to update product. Please try again.');
    }
  };
  

  if (loading) return <div>Loading...</div>; // Display loading indicator
  if (error) return <div>{error}</div>; // Display error message

  return (
    <form onSubmit={handleSubmit} className="product-form">
      <h2>Edit Product</h2>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={product?.name || ''} // Safely access product.name
        onChange={handleChange}
        required
      />
      <textarea
        name="description"
        placeholder="Description"
        value={product?.description || ''} // Safely access product.description
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="price"
        placeholder="Price"
        value={product?.price || 0} // Safely access product.price
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="stock"
        placeholder="Stock"
        value={product?.stock || 0} // Safely access product.stock
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="subcategoryId"
        placeholder="Subcategory ID"
        value={product?.subcategoryId || ''} // Safely access product.subcategoryId
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="imageUrl"
        placeholder="Image URL"
        value={product?.imageUrl || ''} // Safely access product.imageUrl
        onChange={handleChange}
      />
      <button type="submit">Update Product</button>
    </form>
  );
};

export default EditProduct;
