import React, { useState } from 'react';
import { createProduct } from '../../services/productService';

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: 0,
    stock: 0,
    categoryId: '',
    imageUrl: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Ensure correct field name for the backend (ProductName instead of name)
    const productData = {
      ProductName: product.name,  // Change 'name' to 'ProductName'
      Description: product.description,
      Price: parseFloat(product.price),    // Convert price to number
      Stock: parseInt(product.stock),      // Convert stock to number
      SubcategoryId: parseInt(product.categoryId),  // Convert categoryId to number
      ImageUrl: product.imageUrl
    };
  
    // Validate data before submitting
    if (!productData.ProductName || !productData.Description || productData.Price <= 0 || productData.Stock <= 0 || !productData.SubcategoryId) {
      alert('Please fill out all required fields with valid data.');
      return;
    }
  
    try {
      console.log('Submitting product data:', productData);  // Debugging the product data
      const response = await createProduct(productData);
      alert('Product added successfully!');
    } catch (error) {
      console.error('Error creating product:', error.message);  // Show the error message
      alert(error.message || 'There was an error adding the product.');
    }
  };
  
  
  

  return (
    <form onSubmit={handleSubmit} className="product-form">
      <h2>Add Product</h2>

      <input
        type="text"
        name="name"
        placeholder="Product Name"
        value={product.name}
        onChange={handleChange}
        required
      />
      <textarea
        name="description"
        placeholder="Product Description"
        value={product.description}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="price"
        placeholder="Price"
        value={product.price}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="stock"
        placeholder="Stock Quantity"
        value={product.stock}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="imageUrl"
        placeholder="Image URL"
        value={product.imageUrl}
        onChange={handleChange}
      />
      <input
        type="number"
        name="categoryId"
        placeholder="Category ID"
        value={product.categoryId}
        onChange={handleChange}
        required
      />
      <button type="submit">Add Product</button>
    </form>
  );
};

export default AddProduct;
